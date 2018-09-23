//PolarPlayground! by Shawn Kearney - CC0 2018

let myGrid ;

function setup() {

    createCanvas(800, 800);
    frameRate(24) ;

}

function draw() {
    background('white') ;

    //where the spiral should start and end on the grid
    const start = (mouseX/width) * (2 * PI) ;
    const end = (mouseY/height) * (2 * PI) ;

    //a grid of points to draw shapes onto
    myGrid = new Grid(start, end) ;

    //draw the shapes
    for (let i = 0; i < myGrid.pointCount ; i++) {

        //the end knobs
        push() ;
            fill('black') ;
            //check if the current point is first or last
            if (i === myGrid.pointCount - 1 || i === 0) { //Threw a 'type coercion' warning, recommended using '===' instead of '=='. Not sure why.
                ellipse(myGrid.points[i].x, myGrid.points[i].y, 15, 15);
            }
        pop() ;

        //check if last segment, if not draw lines
        if (i < myGrid.pointCount - 1) {
            //draw a line between the current point and the next point
            line(myGrid.points[i].x, myGrid.points[i].y, myGrid.points[i + 1].x, myGrid.points[i + 1].y) ;

        }
    }
}

//the grid
function Grid(start = 0, end = 2*PI, min_RADIUS = 300, max_RADIUS = 500, pos = createVector(height/2,width/2)) {

    //initialize an array to store the points
    let points = [] ;


    //generate the point coordinates
    for (let i = 0; i <= max_RADIUS; i++) {
        //establish the radial axis
        const d = lerp(min_RADIUS, max_RADIUS, i/max_RADIUS) ;
        //interpolate the point's position along the radial axis
        const theta = lerp(start, end, i/max_RADIUS) ;
        //find the cartesian coordinate for the point
        const px = d / 2 * cos(2 * PI * theta) + pos.x ;
        const py = d / 2 * sin(2 * PI * theta) + pos.y ;

        //write the point into a vector and store the result in the array
        points[i] = createVector(px,py);

    }

    //export the points array as a property
    this.points = points ;
    this.pointCount = points.length ;

}