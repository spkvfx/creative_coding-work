function id_gen(size = 4) {
    return crypto.getRandomValues(new Uint32Array(size)).join('-');
}

//point class
class xPoint {
    //constructor with attributes ptnum(parameter), x position(parameter), y position(parameter) and neighbor (another point object)
    constructor(x,y) {
        this.id = id_gen();
        this.attribute = {
            P: createVector(x, y)
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

    //create a new xPoint object and append to the pointcloud
    spawn(x = 0, y = 0, z = 0) {
        const xp = new xPoint(x,y)
        this.append(xp) ;
    }

    //append an existing poing to the pointcloud
    append(xp) {
        append(this.points, xp);
        const ptcount = this.points.length;
        xp.attribute['ptnum'] = ptcount - 1 ;
        xp.attribute['pcid'] = this.id ;
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
                    neighbor = target ;
                    candidate = distance;
                }
            }
        }
        return neighbor ;
    }
}