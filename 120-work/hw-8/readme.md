# Shawn Kearney

## Assignment 8 Summary

For this assignment I had a few goals beyond the requirements. It was originally written for HW6, but I could not really figure out an easy way to get it to be generative and evolving.

The purpose of this is not so much to make a 3D cube, It's more just a question of *if* it can be done, and not *should* it be done this way.

This is a totally ridiculous, ineffecient and overly complicated way to draw a cube. But the real goal here is the matrix object and the associated math functions that I have prototyped.

## Steps Taken
1. I created an external library to convert arrays into matrix objects
2. Wrote a function to add two matrix together
3. Tested what would happen if I fed it a parity mismatch
4. Worked out a way to detect and throw errors
5. Worked on matrix multiplication
6. Kept working on matrix multiplication
7. Went to sleep
8. Kept working on matrix multiplication
9. Stole matrix multiplication from another source
10. Wrote a function to return some transformation matrives
11. Defined a cube
12. Applied the rotation matrices to the cube
13. Added color and stuff
14. added the vector display mode using `mousePressed`

## Issues

I had a lot of trouble working out how to get matrix multiplication to work. I also wanted to slow the cube in vector display mode without interrupting it's position. I thinK I could with `lerp()` but meh.
