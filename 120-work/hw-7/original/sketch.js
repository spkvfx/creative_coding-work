

let ball = {};      //initialize an object for the ball figure

//the width of the ball
ball.width = 40;    //set the width property to 40

//the position
ball.x = 10;        //set the x property to 10
ball.y = 10;        //set they property to 10

//the positional increment
ball.delta_x = 1;   //set the delta_x property to 1
ball.delta_y = 1;   //set the delta_y property to 1

//the scale of speed and direction
ball.scale_x = 1;   //set the scale_x property to 1
ball.scale_y = 1;   //set the scale_y property to 1

//p5 setup function
function setup() {
    //define the canvas width to the width of the window and the height to 400px
    createCanvas(windowWidth, 400);
    //define the background as white
    background(255);
}



function draw() {
    //increment the ball with a scale factor, changing it's direction and speed via musePressed()
    ball.x += ball.delta_x * ball.scale_x;  //x-axis
    ball.y += ball.delta_y * ball.scale_y;  //y-axis

    //collisions
    //if the ball's x position is greater than or equal to the width OR less than or equal to zero, invert the x_delta value
    if (ball.x >= width || ball.x <= 0) {
        ball.delta_x = -1 * ball.delta_x;   //invert via multiplication of negative one
    }
    //if the ball's y position is greater than or equal to the height OR less than or equal to zero, invert the y_delta value
    if (ball.y >= height || ball.y <= 0) {
        ball.delta_y = -1 * ball.delta_y;
    }

    //draw the ball
    fill(255);      //fill the ball with white
    ellipse(ball.x, ball.y, ball.width, ball.width);    //use the ball object to define the ellipse function
}

function mousePressed() {
    //when the mouse is pressed get it's poistion and set to scale
    ball.scale_x = map(mouseX, 0, width, 0.5, 10);      //set ball.scale_x to the mouse's current x position, and map the value from 0.5 to 10 relative to the canvas width
    ball.scale_y = map(mouseY, 0, height, 0.5, 10);     //set ball.scale_y to the mouse's current y position, and map the value from 0.5 to 10 relative to the canvas height
}
