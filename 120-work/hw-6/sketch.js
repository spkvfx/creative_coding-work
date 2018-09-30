let y = 0;
let P;
let v;
let up ;

let k = 1 ;

let red;
let blue;
let green;

const frame_rate = 500 ;
const period = 4 ;

let myColor ;


function setup() {
    //p5 stuff
    frameRate(frame_rate) ;
    createCanvas(800,600) ;

    //initialize the position
    P = createVector(0,0,0) ;
    //initialize the velocity
    v = createVector(1,0,0) ;

    //initialize the up vector
    up = createVector() ;


}

//draw the artwork
function draw() {

    //flipflop the up vector based on period
    //tried setting up.z while initing up to {0,0,0}, but it didn't work. Not sure why...
    if (frameCount % frame_rate < random(frame_rate/period,frame_rate)) {
        up = createVector(0,0,-1) ;
    } else {
        up = createVector(0,0,1) ;
    }

    //I hope that this satisfies the math functions requirements.
    //I've used cross and normalize in place of the scalar functions that were listed.
    //velocity = NORMALIZE(up+(velocity+(up X position)))   (i think)
    v = up.add(v.add(up.cross(P)).normalize());

    //get rid of the stroke
    noStroke() ;

    //draw lines using an ellipse

    //draw the x-y plane
    push() ;
        //map the color to the position
        //always had trouble with color() so a good place to use an object!
        myColor = {
            r : map(P.y % width, -width, width, 0,   255),
            g : 0,
            b : map(P.z % width, -width, width, 255, 0)
        } ;

        fill(myColor.r,myColor.g, myColor.b) ;

        //position drawing
        translate(width/2,height/4) ;

        //use an ellipse to draw the figure
        ellipse(P.x,P.y,1,1) ;
    pop() ;

    //draw the z-y plane
    push();
        myColor = {
            r : 0,
            g : map(P.z % width, -width, width, 255, 0) ,
            b : map(P.x % width, -width, width, 0,   255)
        } ;


        fill(myColor.r,myColor.g, myColor.b) ;
        translate(width,height/2) ;
        ellipse(P.z % width,P.y,1,1) ;
    pop();

    //draw the z-x plane
    push();
        myColor = {
            r : 0,
            g : map(P.y % width, -width, width, 0,   255) ,
            b : map(P.x % width, -width, width, 255, 0)
        } ;

        fill(myColor.r,myColor.g, myColor.b) ;
        translate(0,height/2) ;
        ellipse(-P.z % width,-P.x,1,1) ;
    pop();

    //reset the position when the y or z position reaches a given value
    //randomize to the reset threshold value
    const k = random(-height/10,height/10) ;

    if ((P.y >= height/4 + k || P.x >= height/4 + k) || (P.y <= -height/4 + k || P.x <= -height/4 + 5)) {
        //reset the position to 0, keep the velocity and up direction
        P = createVector(0,0,0) ;
    }

    //update position
    P = P.add(v);

}