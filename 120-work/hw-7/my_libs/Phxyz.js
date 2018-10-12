//This is a *very incomplete* physics framework I am working on.

class Phxyz {
    constructor() {
        //set up attributes
        this.v = createVector() ; //velocity vector
        this.P = createVector() ; //position vector
        this.F = createVector() ; //force vector

        this.mass = 1 ; //mass
        this.drag = 0 ;

        return this ;
    }

    update() {
        //update velocity as a function of force
        this.v = this.v.add(this.F.div(this.mass)).mult(1-this.drag) ;
        //update position as a function of velocity
        this.P.add(this.v) ;
    }

    collision(normal) {
        //get parameters
        const n = normal.copy() ;      // unit vector
        const d = this.v ;             // vector

        //solve terms
        const dot = d.dot(n) * 2;      // scalar
        const n2 = n.mult(dot) ;       // vector

        //update velocity
        this.v = vect_sub(d,n2) ;      // vector
    }

    //make 2D translations
    //along xy axis
    xy(tx_ = 0, ty_ = 0) {
        return translate(this.P.x+tx_,this.P.y+ty_) ;
    }

    //along xz axis
    xz(tx_ = 0, ty_ = 0) {
        return translate(this.P.x+tx_,this.P.z+ty_) ;
    }

    //along xz axis
    zy(tx_ = 0, ty_ = 0) {
        return translate(this.P.z+tx_,this.P.y+ty_) ;
    }
}

//additional vector operations
function vect_mult(a,b) {
    return createVector(a.x * b.x, a.y * b.y, a.z * b.z)
}

function vect_sub(a, b) {
    return createVector(a.x - b.x, a.y - b.y, a.z - b.z)
}

function vect_add(a, b) {
    return createVector(a.x + b.x, a.y + b.y, a.z + b.z)
}

