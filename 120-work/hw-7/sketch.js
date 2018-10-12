
let m = createTransform() ;
let myPhysics ;
let myPaddle ;

const drag = 0 ;

let bounds ;

let mouse1 = 0 ;
let mouse2 = 0;

function setup() {
    createCanvas(400, 400);
    //background(255);

    myPhysics = new Phxyz() ;
    myPhysics.F = new createVector(1,0) ;

    myPaddle = new Paddle() ;

}

function draw() {
    background('white') ;
    mouse1 = mouseX ;

    translate(width/2,height/2) ;
    myPaddle.display(mouse1-mouse2) ;
    push() ;
        myPhysics.xy(0,0) ;
        ellipse(0,0,10,10) ;
    pop() ;
    noFill() ;
    ellipse(0,0,200,200) ;

    myPhysics.update() ;
    myPhysics.F.mult(0) ;


    const pos = createVector(myPhysics.P.x,myPhysics.P.y) ;
    const look = vect_sub(pos,myPaddle.c).normalize() ;

    if (look.dot(myPaddle.N) <= 0 ) {
        myPhysics.collision(myPaddle.N) ;
    } else if (createVector(0,0,0).dist(myPhysics.P) >= 100) {
        myPhysics.P.mult(0) ;
        myPhysics.v.mult(0) ;
        myPhysics.F = createVector(random(),random()).normalize() ;
    }

    mouse2 = mouseX ;


}

function mouseClicked() {
    myPhysics.collision(createVector(1,0)) ;
}

class Paddle {
    constructor() {
        this.a = createVector(100*cos(radians(-25)),100*sin(radians(25))) ;
        this.b = createVector(100*cos(radians(-25)),100*sin(radians(-25))) ;
        this.N = createVector(-1,0) ;
    }


    display(theta = 0) {

        let a_matrix = convertVector(this.a) ;
        let b_matrix = convertVector(this.b) ;

        let N_matrix = convertVector(this.N) ;

        //let c_matrix = convertVector(this.c) ;

        a_matrix = a_matrix.mult(m.rotZ(radians(theta))) ;
        b_matrix = b_matrix.mult(m.rotZ(radians(theta))) ;
        N_matrix = N_matrix.mult(m.rotZ(radians(theta))) ;

        //c_matrix = c_matrix.mult(m.rotZ(radians(theta))) ;

        this.a = a_matrix.convert() ;
        this.b = b_matrix.convert() ;

        //this.c = c_matrix.convert() ;

        this.N = N_matrix.convert() ;

        //console.log(a) ;

        this.c = vect_add(this.a,this.b).mult(0.5) ;

        push() ;
            strokeWeight(3) ;
            line(this.a.x, this.a.y, this.b.x, this.b.y) ;
        pop() ;

    }
}