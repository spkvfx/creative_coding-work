
//Pointcloud to contain points
let myPointcloud ;

//Point Number ID
let id = 0 ;

const cycle = 2500 ;

function setup() {
    createCanvas(800, 800);

    //pointcloud instance
    myPointcloud = new xPointcloud();

    //insert three points to start
    for(let i = 0; i<3; i++){
        myPointcloud.append(new xPoint(id,random(0, width), random(0, height)));
        id++ ;
    }
}

function draw() {

    //clear the background
    background('black') ;
    //draw with a white stroke and no fill
    stroke('white') ;
    noFill() ;

    //get the closest point and connect them
    //iterate over points in myPointcloud
    for (let i = 0; i < myPointcloud.points.length; i++) {
        //establish the closest point to the current point
        myPointcloud.points[i].getClosest(myPointcloud) ;

        //connect the points together with a line and draw a circle
        //get the point position
        const thisPoint = myPointcloud.points[i].P ;
        //get the point's neighbor position
        const thatPoint = myPointcloud.points[i].Neighbor.P ;
        //get the distance between the points
        const r = myPointcloud.points[i].Dist;
        //draw the line between the points
        line(thisPoint.x,thisPoint.y,thatPoint.x,thatPoint.y) ;
        //draw a circle at every point with a radius of the distance
        ellipse(thisPoint.x,thisPoint.y,r,r) ;
    }


    //cycle between adding and removing points
    if(frameCount % cycle < cycle/2) {
        //add a new point
        myPointcloud.append(new xPoint(id, random(0, width), random(0, height)));
        //increment the point id
        id++ ;
    } else {
        //remove the last point
        myPointcloud.delete() ;
        //decrement the id
        id-- ;
    }

}

//point class
class xPoint {
    //constructor with attributes ptnum(parameter), x position(parameter), y position(parameter) and neighbor (another point object)
    constructor(ptnum,x,y) {
        this.ptnum = ptnum ;            //point number
        this.P = createVector(x, y);    //positional vector
        this.Neighbor = null ;          //nearest neighbor
        this.Dist = 0 ;                 //distance to neighbor
    }

    //get the closest point and set to the Neighbor attribute
    getClosest(pc) {
        //the best candidate
        let candidate = null ;
        //iterate over the pointcloud
        for (let i = 0; i < pc.points.length; i++) {
            //set the target point to the current pointcloud point
            const target = pc.points[i] ;
            //exclude self from evaluation
            if (target.ptnum !== this.ptnum) {
                //measure distance between the target and self
                const distance = this.P.dist(target.P) ;
                //if the distance from target and self is less than or is less than or equal to the
                if (distance <= candidate || candidate == null) {
                    //save the neighbor object candidate
                    this.Neighbor = target ;
                    //save the distance candidate
                    this.Dist = distance ;
                    //update the candidate distance test
                    candidate = distance;
                }
            }
        }
    }
}

//pointcloud class
class xPointcloud {
    //construct an empty array
    constructor() {
        this.points = [] ;      //array of points
    }

    //add new point to the pointcloud array
    append(xPointObj) {
        append(this.points,xPointObj) ;
    }

    //delete the last point
    delete() {
        this.points.pop()
    }

    //clear all points
    clear() {
        this.points = [] ;
    }
}