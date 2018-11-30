let myPointcloud ;

function setup() {
    createCanvas(800,800)
    myPointcloud = new xPointcloud();
    for(let i = 0; i<1000; i++){
        myPointcloud.spawn(random()*width,random()*height) ;
    }

    console.log(myPointcloud.nearest(myPointcloud.points[500])) ;
}

function draw() {
    noFill() ;
    noLoop() ;
    myPointcloud.display() ;
    ellipse(myPointcloud.points[500].attribute.P.x,myPointcloud.points[500].attribute.P.y,10,10) ;
    ellipse(myPointcloud.nearest(myPointcloud.points[500]).attribute.P.x,myPointcloud.nearest(myPointcloud.points[500]).attribute.P.y,10,10) ;
}