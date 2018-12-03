
let myPointcloud ;

/////some parameters/////

//number of particles to be born
const number = 250;

//kill slow particles
const sleep = 0.001 ;

//particle behavior
const avoidance = 0.2 ;
const attraction = 1 ;
//negative to bias toward avoidance
const bias = 0;

//mass-distance influence curve
const influence = 1 ;

//minimum radius to nearest neighbor to spawn (warning: no built-in maximum)
const breed = 0.1;

//particle mass
const pmass = 100 ;
const pmass_variance = 10 ;

//stroke
const strokeScale = 0.2 ;
const strokeOffset = 0.2 ;

//drag
const pdrag = 0.03;

function setup() {
    createCanvas(800,800) ;
    background(5,10,30) ;

    //inituialize a new point cloud
    myPointcloud = new xPointcloud() ;
    myPointcloud.behavior['physics'] = new Phxyz() ;

    //set up force values
    let force = {x:0,y:0} ;
    //spawn particles
    for(let i = 0; i<number; i++) {
        const pos = {x:random()*width, y:random()*height} ;     //random positions
        nursery(pos, force);                                    //spawn particles with required attributes
    }

    //prevent blobs on first frame
    strokeWeight(0) ;
}

function draw() {
    //iterate over the point cloud
    for (let i = 0; i < myPointcloud.attribute.ptcount; i++) {
        //get the current point
        const thisPoint = myPointcloud.points[i] ;
        //get the nearest point and the distance
        myPointcloud.nearest(thisPoint) ;
        //check for points with an active physics behavior
        if (thisPoint.attribute.active === true) {
            //get the point positions
            const P1 = thisPoint.attribute.neighbor.attribute.P ;       //the neighbor point positioon
            const P2 = thisPoint.attribute.P ;                          //this point position

            //calculate the vector betene the two points
            const look = vect_sub(P1,P2).normalize() ;

            //get the distance of the current points from it's neighbor
            const d = thisPoint.attribute.distance ;
            //get the mass of the current point
            const m = thisPoint.attribute.mass ;

            //calculate the attractive force scale
            const scale = random(-1*thisPoint.attribute.avoid,thisPoint.attribute.attract) ;

            //calculate for force vector
            const force = look.mult(((m*influence)/d)*scale) ;

            //set the force vector to the force attribute
            thisPoint.attribute.F.set(force.x,force.y) ;

            //line start point from position before update
            const a = {
                x : thisPoint.attribute.P.x,
                y : thisPoint.attribute.P.y
            } ;

            //move the point along it's velocity vector
            //set the target point to the current point
            myPointcloud.behavior.physics.obj = thisPoint ;
            //update the point
            myPointcloud.behavior.physics.update(sleep);

            //spawn a new particle within breed radius
            if(d < breed * 0.5) {
                //offspring for the current point
                offspring(thisPoint) ;
                //offspring for the neighbor point
                //this is necessary to emulate expectation since by the time the neighbor point is evaluated the ccorresponding point is already outside of the radius
                offspring(thisPoint.attribute.neighbor) ;

            }

            //line end point
            const b = {
                x : thisPoint.attribute.P.x,
                y : thisPoint.attribute.P.y
            } ;

            //apply color attribute to stroke
            stroke(thisPoint.attribute.Cd) ;
            //draw the trailing line
            line(a.x,a.y,b.x,b.y);
            //apply stroke thickness (placed here to avoids blobs on first frame)
            strokeWeight((1/(1+pow(2,(-5*(thisPoint.attribute.v.mag()-1))))) * strokeScale + strokeOffset) ;

        //kill stuck and distant points
        } else if (thisPoint.attribute.active === false || thisPoint.attribute.P.x < -width || thisPoint.attribute.P.y < -height || thisPoint.attribute.P.x > width*2 || thisPoint.attribute.P.y > height*2){
            //remove the stuck point from the pointcloud
            myPointcloud.remove(thisPoint) ;
        }
    }
}

//make new points and assign attributes
function nursery(pos,force) {
    //create new points
    const newPoint = myPointcloud.spawn(pos.x, pos.y);
    //add attributes
    if(newPoint != null) {
        newPoint.attribute['v'] = createVector(0, 0, 0);                                         //velocity
        newPoint.attribute['F'] = createVector(force.x, force.y);                               //force
        newPoint.attribute['mass'] = random(pmass, pmass * pmass_variance);                       //mass
        newPoint.attribute['drag'] = pdrag;                                                   //drag (should be an external force, but thus far external forces do not exist)
        newPoint.attribute['Cd'] = color(random(64, 128), random(128, 255), random(200, 255));      //Color
        newPoint.attribute['avoid'] = random(bias, avoidance);                                  //avoidance probability
        newPoint.attribute['attract'] = random(bias, attraction);                               //attraction probability
        newPoint.attribute['active'] = true ;
        //add physics
        //newPoint.behavior['physics'] = new Phxyz(newPoint);
        //flag physics behavior to "true"
        //newPoint.behavior.physics.active = true;
        //return the new xPoint object for easy access
    return newPoint
    }
    //console.log(newPoint) ;
}

function offspring(xp) {
    myPointcloud.behavior.physics.obj = xp ;
    const N = createVector(
        xp.attribute.v.y*-1,
        xp.attribute.v.x
    );
    //collide the particles along the velocity axis
    //uses Phxyz.collision() because it handles velocity and force automatically
    myPointcloud.behavior.physics.collision(N.normalize()) ;
    //change the color of the collided points
    xp.attribute.Cd = color(255,random(0,64),random(0,64)) ;

    //set up a new point
    let pos = {                //set the position of the new point to somehwehere near it's parent
        x : xp.attribute.P.x+random(-breed,breed),
        y : xp.attribute.P.y+random(-breed,breed)
    } ;
    let force = {             //set to the initial force to the vector perpendicular to it's parent
        x : xp.attribute.F.y,
        y : xp.attribute.F.x * -1
    } ;

    //create child point
    const newPoint = nursery(pos, force) ;

    //set the child point's color
    if(newPoint != null){
        newPoint.attribute.Cd = color(random(128,255),random(128,255),random(64,128)) ;
    }


    return newPoint
}