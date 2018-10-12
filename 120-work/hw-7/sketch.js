
let myPhysics ;
let myPaddle ;

//radius of the game area
const r = 400 ;
//speed of the ball
const speed = 2 ;
//rate of increasing speed
const difficulty = 0.1 ;

function setup() {
    createCanvas(800, 800);

    //make a new instance of the Phxyz class
    myPhysics = new Phxyz() ;
    //make an initial force
    myPhysics.F = new createVector(speed,0) ;

    //make a new instance of the paddle object
    myPaddle = new Paddle(2.5) ;

}

function draw() {
    //clear background
    background('white') ;

    //get the mouse position and write to a vector (is there a built-in variable?)
    let mousey = createVector(mouseX-width/2, mouseY-height/2) ;

    //get the heading of the mouse vector
    const theta = degrees(mousey.heading());

    //update physics
    myPhysics.update() ;

    //draw figures
    push()
        //main transform
        translate(width/2,height/2) ;
        //game court
        ellipse(0,0,r,r) ;
        //the ball
        push() ;
            //2D transform the ball along the xy projection
            myPhysics.xy(0,0) ;
            //the ball figure
            ellipse(0,0,10,10) ;
        pop() ;
        //display the paddle in position
        myPaddle.display(theta,myPhysics.P) ;
    pop() ;

    //remove forces to prevent accumulation
    myPhysics.F.mult(0) ;

    //-----------collisions----------------//

    //copy the position into a new vector
    //I had trouble with vector copy()
    const pos = createVector(myPhysics.P.x,myPhysics.P.y) ;

    //create a vector between the ball's current position and the center of the paddle
    const look = vect_sub(pos,myPaddle.c).normalize() ;

    //this is here to help visualize vectors.
    //line(pos.x,pos.y,myPaddle.c.x,myPaddle.c.y) ;

    //get the dot product between the look vector and the paddle's normal vector.
    //if less than or equal to zero, assume collision
    if (look.dot(myPaddle.N) <= 0 ) {
        //change the ball's direction using the paddle's normal as the mirror axis
        myPhysics.collision(myPaddle.N) ;
        myPhysics.v.mult(1 + difficulty) ;
        //if not hit, check for boundary and reset game
    } else if (createVector(0,0,0).dist(myPhysics.P) >= r/2) {
        //zero the position
        myPhysics.P.mult(0) ;
        //zero the velocity
        myPhysics.v.mult(0) ;
        //add a random force
        myPhysics.F = createVector(random(-1,1),random(-1,1)).normalize().mult(speed) ;
    }
}

//the paddle function
function Paddle(w_ = 15) {
    //width of the paddle in arc degrees
    this.w = w_*2;

    //display the paddle in place
    this.display = function(theta = 0, pos) {

        //calculate the points
        this.a = createVector(r/2*cos(radians(this.w+theta)),r/2*sin(radians(this.w+theta))) ;
        this.b = createVector(r/2*cos(radians(-this.w+theta)),r/2*sin(radians(-this.w+theta))) ;

        //calculate the center position
        this.c = vect_add(this.a,this.b).mult(0.5) ;

        //calculate the normal vector
        this.N = createVector(-this.c.x,-this.c.y).normalize() ;

        //distance from center (currently not used)
        this.from = (this.c.dist(pos)) ;

        //draw the paddle
        push() ;
            //stroke weight
            strokeWeight(3) ;
            //the figure
            line(this.a.x, this.a.y, this.b.x, this.b.y) ;
        pop() ;

    }
}