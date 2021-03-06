# Shawn Kearney

## Assignment 5 Summary

I started off making something else, and just as I was giving up and heading off to bed I imagined a line that intersects equally spaced radians along nested circles. Obviously, this would result in a spiral. I then imagined what would happen if you changed different properties, like changing where the spiral started and ended on the innermost and outtermost ring. I thought of a few other manipulations, but here I've correlated the mouse position to positions on the inner and outer rings to make this little toy that I call **[Polar Playground!](https://spkvfx.github.io/creative_coding-work/120-work/hw-5/)**


I was able to offer some feedback to ["looking for ideas on where to start.."](https://github.com/Montana-Media-Arts/120_CreativeCoding/issues/145) asked by HagenNathaniel on the issues board. I am not 100% sure if I got the math correct, I hope I was able to help. I also offered some advice on the process I use when addressing programming problems, by analyzing what are the "knowns and known-unknowns" relating to the problem.

## Steps Taken
1. I visualized the problem and tried to work out a solution in my head
2. Wrote the core "Grid" function with theta = 0
3. Reviewed the result using circles and verified that it produced a straight line
4. Wrote the theta expression to vary the position and verified the results
5. Connected the points with lines
6. Correlated `mouseX` with the inside position and `mouseY` with the outside position
7. Deleted the circles
8. Added the end "handles" for visual decoration

## Issues

This project went pretty smoothly. I had a little bit of issues at first figuring out how I was going to organize the code. At first I thought I couldn't get an array out of the Grid() function as a property, but it turned out to be a typo. My IDE also threw a warning for `if (x == 0)` and recommended `x === 0` instead. I am not sure wht this caused a warning, it works just fine either way.

