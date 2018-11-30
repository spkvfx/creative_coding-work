let myPointcloud ;

let thisPoint ;
let nearPoint ;

function setup() {
    createCanvas(800,800) ;
    //new empty point cloud
    myPointcloud = new xPointcloud();
    //create a bunch of random points
    const n = 1000 ;
    for(let i = 0; i<n; i++){
        myPointcloud.spawn(random()*width,random()*height) ;
    }

    thisPoint = myPointcloud.points[n*0.5] ;
    nearPoint = myPointcloud.nearest(myPointcloud.points[n*0.5]) ;
}

function draw() {
    noFill() ;
    noLoop() ;
    myPointcloud.display() ;
    push() ;
        strokeWeight(0.75) ;
        push() ;
            stroke('red') ;
            ellipse(thisPoint.attribute.P.x,thisPoint.attribute.P.y,10,10) ;
        pop() ;
        push() ;
            stroke('blue') ;
            ellipse(nearPoint.attribute.P.x,nearPoint.attribute.P.y,10,10) ;
        pop() ;
    pop() ;
}