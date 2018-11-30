function id_gen(size = 4) {
    return crypto.getRandomValues(new Uint32Array(size)).join('-');
}

//point class
class xPoint {
    //constructor with attributes ptnum(parameter), x position(parameter), y position(parameter) and neighbor (another point object)
    constructor(x,y) {
        this.id = id_gen();
        this.attribute = {
            P: createVector(x, y),
            ptnum : null,
            pcid : null
        }
    }
}

//pointcloud class
class xPointcloud {
    //construct an empty array
    constructor() {
        this.id = id_gen();
        this.points = [];      //array of points
        this.attribute = {
            ptcount : 0
        }
    }


    //add new point to the pointcloud array
    spawn(x = 0, y = 0, xp = new xPoint(x,y)) {
        append(this.points, xp);
        const ptcount = this.points.length;
        xp.attribute.ptnum = ptcount - 1 ;
        xp.attribute.pcid = this.attribute.id ;
        this.attribute.ptcount = ptcount ;
    }

    //delete the last point
    delete()
    {
        this.points.pop()

    }

    //clear all points
    clear()
    {
        this.points = [];
    }

    display()
    {
        for (let i = 0; i < this.attribute.ptcount; i++) {
            point(this.points[i].attribute.P.x, this.points[i].attribute.P.y)
        }
    }

    //get the closest point and set to the Neighbor attribute
    nearest(xp) {
        //the best candidate
        let candidate = null ;
        let target = null ;
        //iterate over the pointcloud
        for (let i = 0; i < this.attribute.ptcount; i++) {
            //set the target point to the current pointcloud point
            target = this.points[i] ;
            //exclude self from evaluation
            if (target.attribute.id !== xp.attribute.id) {
                //measure distance between the target and self
                const distance = xp.attribute.P.dist(target.attribute.P) ;
                //if the distance from target and self is less than or is less than or equal to the
                if (distance <= candidate || candidate == null) {
                    candidate = distance;
                }
            }
        }
        return target ;
    }
}