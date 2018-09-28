
//get the transform matrices
let m = createTransform() ;

//initialize the cube
let myCube ;

//I had this set up a bit differently and needed a
//let f = 0 ;

//initialize color components, can't figure out how to set color()
let r;
let g;
let b;

function setup() {
    //p5 stuff
    createCanvas(800, 800);
    frameRate(30) ;

    //init colors
    r = random(0,255) ;
    g = random(0,255) ;
    b = random(0,255) ;

    //init cube function
    myCube = new Cube(100) ;

}

function draw() {
    //background to compliment of stroke minus 55
    background(abs(r-200),abs(g-200),abs(b-200)) ;

    //angle of rotation in degrees
    //unnecessary map function. sin(f)*360 would have been fine, but assignment.
    const theta = map(sin(frameCount*(PI/200)),-1,1,-180,360) ;

    push() ;
        //translate the cube
        translate(400,400) ;
        //stroke color
        stroke(r,g,b) ;
        //display the cube at theta degrees
        myCube.display(theta) ;
    pop() ;

    //change color in phase
    if (theta % 180 === 0) {
        r = random(0,255) ;
        g = random(0,255) ;
        b = random(0,255) ;
    }

}

//this is a mess
function Cube(r) {
    //make a point cloud
    let point = [
        createVector(-r, r, r),  //front upper left
        createVector(r, r, r),   //front upper right
        createVector(r, -r, r),  //front lower left
        createVector(-r, -r, r), //front lower right

        createVector(-r, r, -r), //rear upper left
        createVector(r, r, -r),  //rear upper right
        createVector(r, -r, -r), //rear lower left
        createVector(-r, -r, -r) //rear lower right
    ];

    //convert the points to 1x3 matrix
    //TODO: this is not needed. Write the pointcloud into matrix instead
    let matrix = [] ;
    for (i = 0; i < point.length; i++) {
        matrix[i] = convertVector(point[i])
    }

    //transform points, structure and display the points as a cube
    this.display = function (theta) {

        //translate the point cloud
        let trans = [];
        for (i = 0; i < point.length; i++) {
            //rotate along the Y axis
            trans[i] = matrix[i].mult(m.rotY(radians(theta)));
            //rotate 45 degrees along the X axis
            trans[i] = trans[i].mult(m.rotX(radians(45)));
            //convert the points to vectors (
            point[i] = trans[i].convert();
        }

        //create topology; vertex order same as point order
        //note: vertex winding is likely non-manifold, may not be suitable for polygons
        //TODO: Make points update dynamically so that topology only needs to be established once.
        let vertex = [
            [point[0], point[1], point[4]],
            [point[1], point[2]],
            [point[2], point[3], point[6]],
            [point[3], point[0]],

            [point[4], point[5]],
            [point[5], point[6], point[1]],
            [point[6], point[7]],
            [point[7], point[4], point[3]]
        ];

        //connect vertices with edges
        //init edges
        let edge = [];
        //iterate over vertices
        for (let i = 0; i < vertex.length; i++) {
            //iterate over points
            for (let j = 0; j < vertex[i].length; j++) {
                //associate points, first point represents vector position
                if (j > 0) {
                    edge.push([createVector(vertex[i][0].x, vertex[i][0].y, vertex[i][0].z), createVector(vertex[i][j].x, vertex[i][j].y, vertex[i][j].z)]);
                }
            }
        }

        //draw edges as 2D lines
        let lines = [];
        //
        for (let i = 0; i < edge.length; i++) {
            lines[i] = line(edge[i][0].x, edge[i][0].y, edge[i][1].x, edge[i][1].y);
        }

        //display the point coordinates when the mouse is pressed
        if (mouseIsPressed) {
            //iterate over verts
            for (let i = 0; i < vertex.length; i++) {
                //get the coordinates from the vertex first element
                const label = [round(vertex[i][0].x), round(vertex[i][0].y), round(vertex[i][0].z)];
                push();
                    //get rid of the stroke
                    noStroke() ;
                    //draw the text
                    text(label, vertex[i][0].x + 5, vertex[i][0].y - 5);
                pop();
            }

        }

    }
}