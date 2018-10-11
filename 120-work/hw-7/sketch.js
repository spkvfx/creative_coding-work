

let myPhysics ;
const drag = 0 ;

let F;

function setup() {
    createCanvas(windowWidth, 400);
    background(255);

    myPhysics = new Phxyz() ;

    F = createVector(1,0) ;

    myPhysics.mass = 1.0 ;
    myPhysics.drag = 0.01 ;

}

function draw() {
    background('white') ;

    if (frameCount % 120 === 60) {
        myPhysics.F = createVector(1,random()) ;
    }   else {
        myPhysics.F.mult(0) ;
    }


    push() ;
        myPhysics.xy(0,height/2) ;
        ellipse(0,0,10,10) ;
    pop() ;

    myPhysics.update() ;

    console.log(myPhysics.F) ;
}

class Phxyz {
    constructor() {
        this.v = createVector(0,0) ; //velocity vector
        this.P = createVector(0,0) ; //position vector
        this.F = createVector(0,0) ; //force vector

        this.mass = 1 ; //mass
        this.drag = 0 ;

        return this ;
    }

    update() {
        this.v = this.v.add(this.F.div(this.mass)).mult(1-this.drag) ;
        this.P.add(this.v) ;
    }

    xy(tx_ = 0, ty_ = 0) {
        return translate(this.P.x+tx_,this.P.y+ty_) ;
    }
}

function mouseClicked() {
    myPhysics.v.mult(-1) ;
}
