let a ;
let b ;

let a_rot ;
let b_rot ;

let pos_a ;
let pos_b ;

let theta ;

let m = createTransform() ;

let red ;
let green ;
let blue ;

function setup() {

    createCanvas(800, 800);
    frameRate(24) ;

}

function draw() {
    background('white')

    a = convertVector(
            createVector(100,100,0)
    ) ;

    b = convertVector(
        createVector(-100,100,0)
    ) ;

    theta = PI*frameCount/100;

    a_rot = a.mult(m.rotZ(theta)) ;
    b_rot = b.mult(m.rotY(theta)) ;

    pos_a = a_rot.convert() ;
    pos_b = b_rot.convert() ;

    noFill()
    translate(400,400) ;
    line(pos_a.x,pos_a.y,pos_b.x,pos_b.y) ;
    console.log(pos_a.z) ;

    push() ;
        red = (map(pos_a.z,-100,100,0,256)) ;
        blue = (map(-pos_a.z,-100,100,0,256)) ;

        stroke(red,0,blue) ;
        ellipse(pos_a.x,pos_a.y,10,10) ;
    pop() ;

    push() ;
        red = (map(pos_b.z,-100,100,0,256)) ;
        blue = (map(-pos_b.z,-100,100,0,256)) ;

        stroke(red,0,blue) ;
        ellipse(pos_b.x,pos_b.y,10,10) ;
    pop() ;

}
