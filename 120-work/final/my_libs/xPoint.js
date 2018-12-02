
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
        //append to this pointcloud and return the created point object if appended
        //NOTE: the point is created, but without anywhere to go it remains unstructured garbage
        if(this.append(xp)){
            return xp
        //otherwise return null
        } else {
            return null
        }
    }

    //append an existing point to the pointcloud
    append(xp) {
        //add points only if the point count is less than the maximum
        if (this.attribute.max >= this.attribute.ptcount) {
            //append the point to the pointcloud
            append(this.points, xp);
            //append the reference ID to the point's pointcloud id list.
            append(xp.attribute.pcid,this.id) ;
            //update the point count pointcloud attribute
            this.attribute.ptcount = this.points.length;

            //return true if the point as added
            return true
        } else {
            //otherwise return false
            return false
        }
    }

    //delete a given point by it's index
    remove(xp)
    {
        const index = this.points.indexOf(xp) ;
        //get the target point
        const thisPoint = this.points[index] ;
        //remove the point from th pointcloud
        this.points.splice(index,1) ;
        //disassociate the point from th pointcloud
        thisPoint.attribute.pcid.splice(thisPoint.attribute.pcid.indexOf(this.id),1) ;
        this.attribute.ptcount --
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
    constructor(x = 0, y = 0, z = 0) {
        //arbitrary reference id
        this.id = id_gen();
        //point attributes object
        this.attribute = {};
        //point behaviors object
        this.behavior = {};

        //point position attribute
        this.attribute['P'] = createVector(x, y, z);
        //list of pointclouds
        //I had it set up to directly reference the corresponding Pointcloud object, but the infinite nesting freaked me out a little. Though it did seem to work ok.
        this.attribute['pcid'] = [];
    }

    //visualize the xy projection of the xpoint as a p5 point() object
    display() {
        point(this.attribute.P.x, this.attribute.P.y);
    }

    //display the point with a specified color and optional circle. implemented for testing purposes
    emphasis(color = 'red', circled = true) {
        //if the particle is not circled, change it's color to the specified color
        if (circled === false) {
            push();
                //change the point color
                stroke(color);
                //display the point
                this.display();
            pop();
            //other, draw the circle around the point but leave the color
        } else {
            //display the point
            this.display();

            push();
                //ensure that there is no fill
                noFill();
                //change th stroke weight
                strokeWeight(0.5);
                //set the circle's color to the specified color
                stroke(color);
                //draw the circle
                ellipse(this.attribute.P.x, this.attribute.P.y, 10, 10);
            pop();

        }
    }
}