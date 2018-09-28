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

let myCube ;

function setup() {

    createCanvas(800, 800);
    frameRate(24) ;

    myCube = new Cube(100);

}

function draw() {
    background('white')
    translate(400,400) ;

    myCube.display(frameCount) ;

}

function Cube(r) {
    let point = [
        createVector(-r, r, r),  //0
        createVector(r, r, r),   //1
        createVector(r, -r, r),  //2
        createVector(-r, -r, r), //3

        createVector(-r, r, -r), //4
        createVector(r, r, -r),  //5
        createVector(r, -r, -r), //6
        createVector(-r, -r, -r) //7
    ];

    let matrix = [] ;

    for (i = 0; i < point.length; i++) {
        matrix[i] = convertVector(point[i])

    }

    this.display = function (theta) {
        let trans = [] ;
        for (i = 0; i < point.length; i++) {
            trans[i] = matrix[i].mult(m.rotY(radians(theta)));
            trans[i] = trans[i].mult(m.rotX(radians(45)));
            point[i] = trans[i].convert();
        }

        //note: vertex winding is likely non-manifold
        let vertex = [
            [point[0], point[1],point[4]],
            [point[1], point[2]],
            [point[2], point[3],point[6]],
            [point[3], point[0]],

            [point[4],point[5]],
            [point[5],point[6], point[1]],
            [point[6],point[7]],
            [point[7],point[4], point[3]]
        ];

        let edge = [];
        for (let i = 0; i < vertex.length; i++) {
            for (let j = 0; j < vertex[i].length; j++) {
                if (j > 0) {
                    console.log("...") ;
                    console.log(i);
                    console.log("---");
                    console.log(j);
                    edge.push([createVector(vertex[i][0].x, vertex[i][0].y, vertex[i][0].z), createVector(vertex[i][j].x, vertex[i][j].y, vertex[i][j].z)]);
                }
            }
        }

        let lines = [];
        for (let i = 0; i < edge.length; i++) {
            lines[i] = line(edge[i][0].x, edge[i][0].y, edge[i][1].x, edge[i][1].y);
        }
    };
}


/*
function draw() {
    background('white') ;

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

    noFill() ;
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
*/