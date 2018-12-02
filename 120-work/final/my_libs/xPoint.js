function id_gen(size = 4) {
    return crypto.getRandomValues(new Uint32Array(size)).join('-');
}

class xPointcloud {
    //construct an empty array
    constructor(m = 5000) {
        //unique ID. not really needed anymore, but kept it around for funzies
        this.id = id_gen();
        //empty array to hold points
        this.points = [];
        //pointcloud attributes
        this.attribute = {
            //point count
            ptcount : 0,
            //maximum number of points allowed. will ignore new points
            max : m
        }
    }

    //create a new point and append to the pointcloud
    spawn(x = 0, y = 0, z = 0) {
        //create the new point
        const xp = new XPoint(x,y,z) ;
        //append to this pointcloud
        this.append(xp) ;
        //return the created point object
        return xp
    }

    //append an existing point to the pointcloud
    append(xp) {
        if (this.attribute.max > this.attribute.ptcount) {
            //append the point to the pointcloud
            append(this.points, xp);
            append(xp.attribute.pcid,this.pcid) ;
            //update the point count pointcloud attribute
            this.attribute.ptcount = this.points.length;
            //associate this pointcloud with the created point's pointcloud id attribute
        }
    }

    //delete a given point by it's index
    remove(index = 0)
    {
        //get the target point
        const xp = this.points[index] ;
        this.points.splice(index,1) ;
        xp.attribute.pcid.splice(this.pcid,1) ;
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

//point class
class XPoint {
    constructor(x = 0,y = 0, z = 0) {
        //arbitrary id just because it might be useful
        this.id = id_gen() ;
        //position attribute (minimum requirement for creation)
        this.attribute = {} ;
        this.behavior = {} ;
        this.attribute['P'] = createVector(x, y, z) ;
        this.attribute['pcid'] = [] ;
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