let a ;
let b ;

let ab ;

let pos ;

let theta ;

function setup() {

    createCanvas(800, 800);
    frameRate(24) ;
}

function draw() {


    a = convertVector(

            createVector(100,100,0)

    ) ;

    theta = PI*frameCount/100;

    const rot_z = createMatrix(
        [
            [cos(theta),-sin(theta),0],
            [sin(theta),cos(theta),0],
            [0,0,1],
        ]
    ) ;

    ab = a.mult(rot_z) ;

    pos = ab.convert() ;

    translate(400,400) ;
    ellipse(pos.x,pos.y,15,15) ;


}
