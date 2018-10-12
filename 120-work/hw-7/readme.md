# Shawn Kearney

## Assignment 6 Summary

When I started this assignment I wanted to make the ball simply bounce with gravity. I essentially got that to work, but my phyiscs were not set up right and it kept continuing through the floor. I eventually gave up and decided instead to work on a pong-type game that is arranged in a circle that I have called "Pong Solo".

## Steps Taken
I went through a number of steps to get this to work, but teh process as a whole was pretty organic. I knew I wanted to lay out the foundations for a physics framework, so I created a library called Phxyz.js (pronounced "physics") and just made a velocity respond to force using classical physics, F=ma. Once I got that done I just made the ball move periodically to a random force with some dampening.

I then started to work on the collision function, which is vector reflection, d = d-2(d . N)*N, which I found online somewhere.

I then worked on the paddle and worked out a way to determine if the ball's position relative to the paddle's normal.

After that I cleaned up the code and commented, added a few constants for things like the game area radius and added an expression to cause the ball to become progressively faster on each hit.

## Issues

There were a LOT of issues. I couldn't quite figure out how to get vector mirror to work correctly, and I still don't think it's set up "right" but it does work OK. Ultimately I'd like Phxyz.js to be a bit more robust with collider, actor and it's own primative objects. I also was not able to implement the change in direction relative to where the bounce hits the paddle, as is teh case in the original pong game.

I don't think that will be too difficult to implement, but I did not have time or energy to do it.

## Part Two
*Description*  
The ball's position changes over time at the rate of `delta * scale` when the mouse is pressed, scale changes depending on the mouse's position using a `map` function. If the position is at or beyond the bounds of the canvas, it will change direction by inverting delta_x by `delta*-1`.

*Change Ball Direction*  
add an arbitrary value to `delta`.
     
*Code Breakdown*  

```
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
```
