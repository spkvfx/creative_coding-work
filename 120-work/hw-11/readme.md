# Shawn Kearney

## Assignment 10 Summary

This week I lacked a lot of inspiration and I just wasn't sure what I wanted to do. I imagined up something that I will probably modify this for next week that served as inspiration for this week's assignment.

Here I created two classes, one a pointcloud and another for individual points. The points have method for finding the nearest point to itself.

The pointcloud has three functions, one to clear all points (unused) and another for adding points and removing the most recently added point.

I've set this up to visualize the nearest neighbors with circles and lines, with the circle's radius defined by the distance between the point and it's neighbor

## Steps Taken
1. Sat in front of a blank screen for several hours
2. Got the initial idea
3. Sketched out the class structure
4. Went to sleep
5. Decided I needed a seperate Pointcloud class
6. Set up a test iterator in setup()
7. Migrated the iterator into draw()
8. Added a line connecting the point and it's associated neighbor
9. Added the Dist attribute to the Point class
10. Added the circles

## Issues

I was not sure where to put the neighbor search method. Conceptually I kind of feel like it belongs in the pointcloud class, and that way it could be fed an arbitrary position. This is similar to how houdini's pcfind() function works. But here I opted instead to make it a method of the point class

I also had a lot of trouble trying to think of something to do. The idea I came up with was a little more involved but uses the same basic framework, so I'll probably just pick up from here for next week since my point objects are already aware of their neighbor. 