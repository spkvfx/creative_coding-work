# Shawn Kearney

## Summary

Meet Prof. Manyeyes McMouthy, Esq!! His eyes change on reload!

Making him was a lot of fun, but took a bit more time than I had anticipated. I had a lot of remembering how Processing works, and I made an effort to use (and perhaps over use) Push() and Pop().

I chose to organize him into a bunch of basic functions, mostly as an organizational effort, but also to write all his many eyeballs into an array.

The monocles were an afterthought, because I thought it'd be hillarious to have multiple monocles.

## Steps Taken

1. I started by making just one eye out of using ellipse() using the CHORD parameter

2. Once I had one eye, I worked on making one dimensional array of eyes. I had some problems with the iterator - I've been spoiled with python's for/in structure, and VEX foreach() (though, typing this I'm getting a code completion, so I think p5 might have ForEach also), but I eventually got it figured out.

3. Once I had an array of eyes,  I worked out which parameters should be randomized and by how much. It was then just a a matter of filling the columns with another iterator.

4. Mouth was just a rectangle with a line, the beard thingie is just a rectangle with a bunch of lines inside it (again, using for and bound to the width of the box)

5. The monocles were an afterthought. I started with a circle and then solved the for a point on the circle's parimeter where the monocle's cord would attach

## Issues

I considered using an applyMatrix() or negative scale() to mirror the right-side monocles, but I couldn't find a good place for it. Instead I've set this up explicitally. I'd prefer to just say where I want the cord, and then it automatically figured out where the mirror-compliment would be.

I initially had a lot of problems with the for() loop, since it's been a while since I've used one with an iterator like this. I was able to figure it out.

I'm also noticing that my IDE wants me to use "let" rather than "var" and in general these variable scope declariation are odd to me. I'm starting to appreciate where to use "const", and experimented with it as well.

I'm also a little bit confused by push() and pop(), specifically why processing uses terminology that I would normally associate with arrays.