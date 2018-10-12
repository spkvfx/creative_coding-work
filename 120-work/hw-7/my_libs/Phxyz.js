//This is a *very incomplete* physics framework I am working on.

class Phxyz {
    constructor() {
        this.v = createVector() ; //velocity vector
        this.P = createVector() ; //position vector
        this.F = createVector() ; //force vector

        this.mass = 1 ; //mass
        this.drag = 0 ;

        return this ;
    }

    update() {
        this.v = this.v.add(this.F.div(this.mass)).mult(1-this.drag) ;
        this.P.add(this.v) ;
    }

    collision(normal) {
        const n = normal.copy() ;      // unit vector
        const d = this.v ;             // vector
        const dot = d.dot(n) * 2;      // scalar

        const n2 = n.mult(dot) ;       // vector

        this.v = vect_sub(d,n2) ;      // vector
    }

    xy(tx_ = 0, ty_ = 0) {
        return translate(this.P.x+tx_,this.P.y+ty_) ;
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

