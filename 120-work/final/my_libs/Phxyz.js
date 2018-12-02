

class Phxyz {
    constructor(obj) {
        this.id = id_gen() ;
        
        this.obj  = obj;
        //set up attributes
        this.P = obj.attribute.P ; //position vector
        this.v = obj.attribute.v ;
        this.F = obj.attribute.F ; //force vector

        this.mass = obj.attribute.mass ; //mass
        this.drag = obj.attribute.drag ;

        this.active = false ;

    }

    update(thresh = 0) {
        //update velocity as a function of force
        this.active = true ;
        this.obj.attribute.v = this.v.add(this.F.div(this.mass)).mult(1 - this.drag);
        if(this.obj.attribute.v.mag() > thresh) {
            this.obj.attribute.P.add(this.obj.attribute.v);
        } else {
            this.sleep() ;
        }
    }

    sleep() {
        this.active = true ;
        this.obj.attribute.v.mult(0)  ;
        this.obj.attribute.F.mult(0) ;
        this.active = false ;
    }

    collision(normal) {
        this.active = true ;
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