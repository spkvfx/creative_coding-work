
//Pointcloud to contain points
let myPointcloud ;

//Point Number ID
let id = 0 ;

const seeds = 5 ;
const iters = 12 ;
const minDist = 5 ;

const showSeeds = true ;
const showLines = true ;
const showNodes = true ;

const scatterX = 1 ;
const scatterY = 0.5 ;

function setup() {

    createCanvas(800, 800);
    frameRate(10) ;
    background('black') ;

    //pointcloud instance
    myPointcloud = new xPointcloud();

    //insert three points to start
    for(let i = 0; i<seeds; i++){
        const x = random((-scatterX * width/2) + width / 2, (scatterX * width/2) + width / 2) ;
        const y = random((-scatterY * height/2) + height / 2, (scatterY * height/2) + height / 2) ;
        myPointcloud.append(new xPoint(id,x, y));
        id++;
        if (showSeeds) {
            stroke('red');
            fill('red') ;
            strokeWeight(0.5);
            ellipse(x, y, 10, 10);
        }
    }
}

function draw() {

    //clear the background
    //background('black');
    //draw with a white stroke and no fill
    stroke('white');
    noFill();
    strokeWeight(0.5) ;


    //get the closest point and connect them
    //iterate over points in myPointcloud

    //const r = myPointcloud.points[0].Dist ;


    //myPointcloud.append(new xPoint(id, random(-r, r), random(-r, r)));
    let newPoints = [] ;
    for (let i = 0; i < myPointcloud.points.length; i++) {
        myPointcloud.points[i].getClosest(myPointcloud) ;
        const thisPoint = myPointcloud.points[i].P ;
        const thatPoint = myPointcloud.points[i].Neighbor.P ;
        const r = myPointcloud.points[i].Dist;
        if ((frameCount <= iters)) {
            if (r > minDist) {
                append(newPoints, new xPoint(id, random(-r + thisPoint.x, r + thisPoint.x), random(-r + thisPoint.y, r + thisPoint.y)));
                id++;
            }
        } else {
            myPointcloud.clear();
            id=0 ;
            //alert("Done Cooking");
            noLoop() ;
        }
        //stroke(1/myPointcloud.points[i].dist) ;
        if (showNodes) {
            ellipse(thatPoint.x,thatPoint.y,r/2,r/2) ;
        }
        if (showLines) {
            line(thisPoint.x, thisPoint.y, thatPoint.x, thatPoint.y);
        }
    }
    console.log(myPointcloud.points.length) ;
    myPointcloud.points = concat(myPointcloud.points,newPoints) ;
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