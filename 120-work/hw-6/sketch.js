let y = 0;
let P;
let v;
let up;

let a ;
let b ;

function setup() {
    frameRate(30) ;
    createCanvas(800,800) ;
    P = createVector(0,0,0) ;
    v = createVector(10,0,0) ;
    up = createVector(0,0,4) ;

}

function draw() {

    if (frameCount % 90 === 0) {
        up.x = random(0,1) ;
        up.y = random(0,1) ;
        up.z = random(0,1) ;
    }

    v = v.add(up.normalize().cross(P)).normalize().mult(5) ;
    noStroke() ;
    cd = map(P.z,-800,800,0,255) ;
    fill(cd,cd,cd) ;

    a = P ;
    P = P.add(v);
    b = P ;

    translate(400,400) ;
    ellipse(P.x,P.y,1,1) ;

    line(a.x,a.y,b.x,b.y) ;

    console.log(a.dist(b)) ;
}