//version 0.2 to comply with xPoint.js
//required attributes:
//mass
//drag
//P
//F
//v

class Phxyz {
    constructor(obj = null) {
        //arbitrary id
        this.id = id_gen() ;

        //the object to apply physics to
        this.obj  = obj;
        //activation flag
    }

    //update attributes
    update(thresh = 0) {
        //activate
        this.obj.attribute.active = true ;
        //update velocity from force
        this.obj.attribute.v = this.obj.attribute.v.add(this.obj.attribute.F.div(this.obj.attribute.mass)).mult(1 - this.obj.attribute.drag);
        //update position if velocity is greater than sleep threshold
        if(this.obj.attribute.v.mag() > thresh) {
            this.obj.attribute.P.add(this.obj.attribute.v);
        } else {
            this.sleep() ;
        }
    }

    //deactivate particles
    sleep() {
        //clear attributes
        this.obj.attribute.v.mult(0) ;      //velocity
        this.obj.attribute.F.mult(0) ;      //force
        this.obj.attribute.active = false ;
    }

    //collision handling
    collision(normal) {
        //activate
        this.obj.attribute.active = true ;
        //get parameters
        const n = normal.copy() ;                    // unit vector
        const d = this.obj.attribute.v ;             // vector

        //solve terms
        const dot = d.dot(n) * 2;      // scalar
        const n2 = n.mult(dot) ;       // vector

        //update velocity
        this.obj.attribute.v = vect_sub(d,n2) ;      // vector
    }

    //make 2D translations: probably should be deprecated
    //along xy axis
    xy(tx_ = 0, ty_ = 0) {
        return translate(this.obj.attribute.P.x+tx_,this.obj.attribute.P.y+ty_) ;
    }

    //along xz axis
    xz(tx_ = 0, ty_ = 0) {
        return translate(this.obj.attribute.P.x+tx_,this.obj.attribute.P.z+ty_) ;
    }

    //along xz axis
    zy(tx_ = 0, ty_ = 0) {
        return translate(this.obj.attribute.P.z+tx_,this.obj.attribute.P.y+ty_) ;
    }
}

//additional vector operations
function vect_mult(a,b) {
    return createVector(
        a.x * b.x,
        a.y * b.y,
        a.z * b.z)
}

function vect_sub(a, b) {
    return createVector(
        a.x - b.x,
        a.y - b.y,
        a.z - b.z)
}

function vect_add(a, b) {
    return createVector(
        a.x + b.x,
        a.y + b.y,
        a.z + b.z)
}