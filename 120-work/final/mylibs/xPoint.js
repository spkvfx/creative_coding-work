function id_gen(size = 4) {
    return crypto.getRandomValues(new Uint32Array(size)).join('-');
}

//point class
class xPoint {
    constructor(x = 0,y = 0, z = 0) {
        //arbitrary id just because it might be useful
        this.id = id_gen();
        //attribute object (allows for dynamic attribution at any point)
        this.attribute = {
            //position attribute (minimum requirement for creation)
            P: createVector(x, y, z)
        }
    }

    //visualize the xy projection of the xpoint as a p5 point() object
    display() {
        point(this.attribute.P.x,this.attribute.P.y)
    }
}

//pointcloud class
class xPointcloud {
    //construct an empty array
    constructor() {
        this.id = id_gen();
        this.points = [];      //array of points
        //attributes object
        this.attribute = {
            //point count (minimum requirement with default of zero)
            ptcount : 0
        }
    }

    //create a new point and append to the pointcloud
    spawn(x = 0, y = 0, z = 0) {
        this.append(new xPoint(x,y,z)) ;
    }

    //append an existing point to the pointcloud
    append(xp) {
        //append the point to the pointcloud
        append(this.points, xp) ;
        //get the updated point count
        const ptcount = this.points.length ;
        //update the point count pointcloud attribute
        this.attribute.ptcount = ptcount ;

        //note: the following point attributes prevent points from existing in more than one pointcloud
        //add the pointcloud reference id attribute
        if (typeof(xp.attribute.pcid) === "undefined") {
            xp.attribute['pcid'] = this.id;
            //add the corresponding point number attribute
            xp.attribute['ptnum'] = ptcount - 1;
        } else {
            console.log('Point with '+xp.id+' appears to belong to pointcloud with id '+xp.attribute.pcid) ;
            return ;
        }
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
            this.points[i].display() ;
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
                    neighbor = target ;
                    candidate = distance;
                }
            }
        }
        return neighbor ;
    }
}