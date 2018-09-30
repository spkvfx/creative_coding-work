//Flying Bird

var headAngle;
var headRotationRate;
var headWidth;
var headHeight;
var yPosition;
var xPosition;

function setup() {
    createCanvas(windowWidth, windowHeight);

    xPosition = 0.25;

    headAngle = 0;
    headRotationRate = 60;
    headWidth = 80;
    headHeight = 80;
}


function draw() {
    yPosition = mouseY;
//erase every frame
    background('rgb( 135, 206, 250)');
//turn the cursor off
    noCursor();

//update values
// base head angle on rotation headRotationRate
    headAngle = headAngle + headRotationRate;

//bird sandbox

    push();

        //make the bird move right and on mouseY
        translate(xPosition++ % width, yPosition);
        //body
        fill('rgb(169, 169, 169)');
        noStroke();
        //end body

        push();
            //head
            fill('rgb(169, 169, 169)');
            noStroke();
            //rotate head based on headAngle
            rotate(radians(headAngle));
            //draw head
            ellipse(0, 0, headWidth, headHeight);
            noStroke();
        pop();

        //eyes
        strokeWeight(2);
        push();
            //draw eyes based on head size
            translate(headWidth * -0.2, headHeight * -0.2);
            ellipse(0, 0, headWidth * 0.33, headHeight * 0.33);
            noStroke();
            fill('rgb(255, 255, 255)');
            ellipse(0, 0, 5);
            ellipse(0, 0, 10);
        pop();

        push();
            translate(headWidth * 0.2, headHeight * -0.2);
            ellipse(0, 0, 20);
            noStroke();
            fill('rgb(0)');
            ellipse(0, 0, 10);
            ellipse(0, 0, 5);
        pop();

        //beak
        push();
            fill('rgb( 200, 80, 0)');
            triangle(40, 20, 80, 0, 40, -20);
        pop();
        //end head

        // wing
        push();
            fill('rgb(110, 110, 110)');
            stroke(2);
        pop();

    pop();

}