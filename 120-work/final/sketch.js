
let myPointcloud ;
let activePoints = [];

let targetPoint ;
let nearestPoint ;

const sleep = 0.01 ;


const number = 300;

let avoidance = 0 ;
let attraction = 1.0 ;
let bias = 2;

let influence = 1 ;

const breed = 0.1;
;

function setup() {
    myPointcloud = new xPointcloud() ;
    createCanvas(800,800) ;
    background(5,10,30) ;

    let force = {x:0,y:0} ;
    for(let i = 0; i<number; i++) {
        const pos = {x:random()*width, y:random()*height} ;
        nursery(pos, force);
    }

    //targetPoint = myPointcloud.points[int(number/2)] ;
    //nearestPoint = myPointcloud.nearest(targetPoint) ;

    console.log(myPointcloud);

    activePoints = myPointcloud.points.slice(0) ;
}

let a ;
let b ;


function draw() {
    for (i = 0; i < myPointcloud.attribute.ptcount; i++) {
        const thisPoint = myPointcloud.points[i] ;

        //thisPoint.emphasis() ;
        if (thisPoint.behavior.physics.active === true) {
            myPointcloud.nearest(thisPoint) ;
            //thisPoint.attribute.mass *= 1.01 ;

            const P1 = thisPoint.attribute.neighbor.attribute.P ;
            const P2 = thisPoint.attribute.P ;
            const look = vect_sub(P1,P2).normalize() ;

            const d = thisPoint.attribute.distance ;
            const m = thisPoint.attribute.mass ;
            const scale = random(-1*thisPoint.attribute.avoid,thisPoint.attribute.attract) ;

            const force = look.mult(((m*influence)/d)*scale) ;
            thisPoint.attribute.F.set(force.x,force.y) ;

            const a = {
                x : thisPoint.attribute.P.x,
                y : thisPoint.attribute.P.y
            } ;
            thisPoint.behavior.physics.update(sleep);
            if(d < breed*0.5) {
                thisPoint.behavior.physics.collision(thisPoint.attribute.v.normalize())
                //thisPoint.attribute.mass *= 0.90 ;
                //thisPoint.attribute.v.mult(-2);
                thisPoint.attribute.Cd = color(255,random(0,64),random(0,64)) ;

                const pos = {
                    x:thisPoint.attribute.P.x+random(-breed,breed),
                    y:thisPoint.attribute.P.y+random(-breed,breed)} ;
                const force = {
                    x : thisPoint.attribute.v.y,
                    y : thisPoint.attribute.v.x * -1
                } ;
                const newPoint = nursery(pos, force) ;
                newPoint.attribute.Cd = color(random(128,255),random(128,255),random(64,128))
            }
            const b = {
                x : thisPoint.attribute.P.x,
                y : thisPoint.attribute.P.y
            } ;
            strokeWeight(map(0.1/thisPoint.attribute.v.mag(),0,100,0.1,3)) ;
            stroke(thisPoint.attribute.Cd) ;
            line(a.x,a.y,b.x,b.y);
        } else if (thisPoint.behavior.physics.active === false || thisPoint.attribute.P.x < -width || thisPoint.attribute.P.y < -height || thisPoint.attribute.P.x > width*2 || thisPoint.attribute.P.y > height*2){
            myPointcloud.remove(myPointcloud.points.indexOf(thisPoint)) ;
            //console.log(thisPoint) ;
        }
    }
}

function nursery(pos,force) {
    const newPoint = myPointcloud.spawn(pos.x, pos.y);
    newPoint.attribute['v'] = createVector() ;
    newPoint.attribute['F'] = createVector(force.x,force.y) ;
    newPoint.attribute['mass'] = 500 ;
    newPoint.attribute['drag'] = 0.01 ;
    newPoint.attribute['Cd'] = color(random(64,128),random(128,255),random(200,255)) ;
    newPoint.attribute['avoid'] = random(bias,avoidance) ;
    newPoint.attribute['attract'] = random(bias,attraction) ;
    newPoint.behavior['physics'] = new Phxyz(newPoint);
    newPoint.behavior.physics.active = true ;
    return newPoint
    //console.log(newPoint) ;
}

function id_gen(size = 4) {
    return crypto.getRandomValues(new Uint32Array(size)).join('-');
}

//point class
class xPoint {
    constructor(x = 0,y = 0, z = 0) {
        //arbitrary id just because it might be useful
        this.id = id_gen() ;
        //position attribute (minimum requirement for creation)
        this.attribute = {} ;
        this.behavior = {} ;
        this.attribute['P'] = createVector(x, y, z) ;
        this.attribute['pcid'] = null ;
    }

    //visualize the xy projection of the xpoint as a p5 point() object
    display() {
        point(this.attribute.P.x,this.attribute.P.y) ;
    }

    emphasis(color = 'red', circled = true) {
        push();
            stroke('black') ;
            if(circled === false) {
                stroke(color) ;
            }
            this.display() ;
        pop() ;
        if(circled === true) {
            push();
                noFill();
                strokeWeight(0.5);
            stroke(color);
                ellipse(this.attribute.P.x, this.attribute.P.y, 10, 10);
            pop();
        }
    }
}

class xPointcloud {
    //construct an empty array
    constructor() {
        this.id = id_gen();
        this.points = [];      //array of points
        this.attribute = {
            //point count (minimum requirement with default of zero)
            ptcount : 0
        }
    }

    //create a new point and append to the pointcloud
    spawn(x = 0, y = 0, z = 0) {
        const xp = new xPoint(x,y,z)
        this.append(xp) ;
        return xp
    }

    //append an existing point to the pointcloud
    append(xp) {
        //append the point to the pointcloud
        append(this.points, xp) ;
        //update the point count pointcloud attribute
        this.attribute.ptcount = this.points.length ;

        //add the pointcloud reference attribute. this provides a symbolic structure to the pointcloud, however...
        //doing it this way seems like a truly terrible idea. But it seems to work out ok, maybe??? it does permit access to any point directly from any other point which could be hugely useful.
        xp.attribute.pcid = this;
    }

    //delete a given point
    remove(index = 0)
    {
        const xp = this.points[index] ;
        xp.attribute.pcid = null ;
        this.points.splice(index,1) ;
        this.attribute.ptcount = this.points.length ;
    }

    //clear all points
    clear()
    {
        const ptcount = this.attribute.ptcount ;
        for(let i = 0; i<ptcount; i++) {
            this.remove();
        }
    }

    display() {
        if (this.attribute.ptcount !== 0) {
            for (let i = 0; i < this.attribute.ptcount; i++) {
                this.points[i].display();
            }
        }
    }

    //get the closest point and set to the Neighbor attribute
    nearest(xp) {
        //the best candidate
        let candidate = null ;
        let neighbor = null ;
        //iterate over the pointcloud
        for (let i = 0; i < this.attribute.ptcount; i++) {
            //set the target point to the current pointcloud point
            const target = this.points[i] ;
            //exclude self from evaluation
            if (target !== xp) {
                //measure distance between the target and self
                const distance = xp.attribute.P.dist(target.attribute.P) ;
                //if the distance from target and self is less than or is less than or equal to the
                if (distance <= candidate || candidate == null) {
                    xp.attribute['distance'] = distance ;
                    xp.attribute['neighbor'] = target ;
                    neighbor = target ;
                    candidate = distance;
                }
            }
        }
        return neighbor ;
    }
}

class Phxyz {
    constructor(obj) {

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
        this.obj.attribute.v.mult(0)  ;
        this.obj.attribute.F.mult(0) ;
        this.active = false ;
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