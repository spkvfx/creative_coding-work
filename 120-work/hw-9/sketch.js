let CameraPosition ;

let rays = [] ;

function setup(){
    noLoop() ;
    createCanvas(800,800) ;

    myRaycaster = new Raycaster() ;

    CameraPosition = createVector(0,0,-50) ;
}

function draw() {
    console.log(myRaycaster.CastCameraRays(CameraPosition,'camera')) ;
}

class Raycaster {

     constructor() {

     }

     CastCameraRays(origin,type) {
         for (let x = 0; x <= width; x++) {
             for (let y = 0; y <= height; y++){
                 const pixel = createVector(x-width/2,y-height/2,0) ;
                 const ray = {
                     ORIGIN: origin,
                     VECTOR: origin.copy().sub(pixel).normalize(),
                     HIT : false
                     };
                 append(rays,ray) ;
             }
         }
         return rays = {
             TYPE : type,
             RAYS : rays
         } ;
    }
}

class Scene {

    constructor(P) {
        this.P = P ;
    }

    points() {
        this.points = [] ;
    }

    vertex() {
        this.verts = [] ;
    }

    primative() {
        this.prims = [] ;
    }
}
