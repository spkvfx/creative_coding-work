# Shawn Kearney

## Assignment 6 Summary

I've been really interested in 2.5D and 2D projections in p5. I had something else, but I think it will be better suited for a future assignment.

Here, I have this outward spiraly that changes direction depending on `frameCount`. I used modulo to flip flop between clock-side and counter clockwise directions. 

I then projected the x-y, z-y and z-x planes onto the canvas and arranged them into a visually interesting way.

## Steps Taken
1. I created a position vector and used it's x/y position as the position of an `ellipse`.
2. Created a velocity vector and updated the position with `vector.add()` and confirmed the results
3. Applied the cross product between the current position and an up axis vector to the velocity vector and confirmed the resulting spiral shape.
4. Played around with the velocity expression and added the flip-flopping direct.
5. I added some animation in the z-axis and applied color to circle
6. Derived the projections and found an interesting way to compose them.

## Issues

I had some issues with connecting the current points with the previous so that I could scale velocity directly. I tried putting the position into two different variables before and after updating the position, but that did not want to work. A better solution would be substepping with a `for` or `while` function.

