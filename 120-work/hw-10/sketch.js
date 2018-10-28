//an empty array to contain reactors
let myReactor = [] ;

//sets the density of the seed pattern
const noiseThreshold = 0.005 ;

//p5 setup
function setup() {

    //keep the canvas size relatively small since this sketch is SLOW
    //must be square (not sure why)
    createCanvas(500,500) ;

    //populate the empty array with pixels of random values
    for(let i = 0; i < width; i++) {
        //init row
        myReactor[i] = [] ;
        //populate rows with reactor elements, recording individual positions
        for (let j = 0; j < height; j++) {
            myReactor[i][j] = new DiffusionReaction(i,j) ;

        }
    }
}

function draw() {
    //find neighbors
    UpdateKernel(myReactor) ;
    //iterate over reactor rows
    for(let i = 0; i < myReactor.length; i++) {
        //iterate over reactors
        for (let j = 0; j < myReactor[i].length; j++) {
            //alternate between diffusion and reaction operations
            if (frameCount % 2 === 0) {
                //display on reaction only
                myReactor[i][j].display() ;
                //react reactors
                myReactor[i][j].reaction() ;
            } else {
                //diffuse reactors
                myReactor[i][j].diffusion() ;
            }
        }
    }
}

//finds nearby neighbors and writes their value to the reactor.kernel array
//not dynamic: only works with a 3x3 matrix
function UpdateKernel(image) {
    //get rows
    for(let i = 0; i<image.length; i++) {
        //get the length of row for easy access later
        const ilength = image.length;
        //get the range of indexes of rows
        //will round robin, which if I were to guess, is why results have a mirroring?
        const index = [abs(i-ilength+1) , i , (i+1)%ilength] ;
        //get columns
        for(let j = 0; j<image[i].length; j++) {
            //get the length of cols
            const jlength = image[i].length ;
            //get the range of indexes of cols
            const item = [abs(j-jlength+1) , j , (j+1)%jlength] ;
            //write the neighbors to rhe kernel
            image[i][j].kernel =
                [
                    [image[item[0]][index[0]].element, image[item[0]][index[1]].element, image[item[0]][index[2]].element],
                    [image[item[1]][index[0]].element, image[item[1]][index[1]].element, image[item[1]][index[2]].element],
                    [image[item[2]][index[0]].element, image[item[2]][index[1]].element, image[item[2]][index[2]].element]
                ] ;
        }
    }
}

//evaluate the kernel
function eval(kernel, operator) {
    //the new element value
    let k = 0 ;
    //iterate over the kernel
    for (let i=0; i < kernel.length; i++){
        for (let j=0; j < kernel[i].length; j++) {
            //accumulate the new value with the product of the kernel and the operator
            k += kernel[i][j] * operator[i][j] ;
        }
    }

    //return the new value
    return k ;
}

class DiffusionReaction {
    constructor(i,j) {
        //position of the reactor
        this.identity = {x : i, y : j} ;
        //initialize with noise
        if (random(0,1) < noiseThreshold) {
            this.element = 1 ;
        } else {
            this.element = 0  ;
        }
        //initialize the kernel
        this.kernel = [] ;
        //initialize the kernel operators
        this.op =
            {
                diffusion : [[1/32, 1/32*2, 1/32], [1/32*2, 1/32*4, 1/32*2], [1/32, 1/32*2, 1/32]],
                reaction : [[0, -2, 0], [-2, 8, -2], [0, -2, 0]]
            }
    }

    //call the diffusion evaluation
    diffusion() {
        this.element = eval(this.kernel,this.op.diffusion) ;
    }

    //call the diffusion reaction
    reaction() {
        this.element = eval(this.kernel,this.op.reaction) ;
    }

    //draw the reactor element as a point
    display() {
        //set the color
        stroke(this.element*255) ;
        //draw the point
        point(this.identity.x,this.identity.y)
    }
}
