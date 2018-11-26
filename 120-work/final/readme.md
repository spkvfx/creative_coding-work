# Shawn Kearney Final Project

For the final I intend to write a generative script that follows the following rules:

* Each actor is attracted to one another at a rate of the mean reciprocal of the distances:<br>
<img src="https://latex.codecogs.com/gif.latex?F&space;=&space;\frac{1}{n}&space;\sum&space;_{i=1}&space;^n&space;\frac{1}{d_i}\cdot&space;(P1_i&space;-&space;P2_i)" title="Force = \frac{1}{n} \sum _{i=1} ^n \frac{1}{d_i}\cdot (P1_i - P2_i)" />
* Once a given velocity magnitude reaches a specific threshold, each actor's velocity is inverted. This has the effect of the being repelled within a defined radius:<br>
<img src="https://latex.codecogs.com/gif.latex?|{\sqrt{v_x&plus;v_y}}|$\geq$threshold&space;:&space;v&space;=&space;-v" title="|{\sqrt{v_x+v_y}}|$\geq$threshold : v = -v" />
* Additionally, an additional actor is created, each with a velocity *perpendicular* to the corresponding actor's velocity (not totally sure how to notate a vector swizzle):<br>
<img src="https://latex.codecogs.com/gif.latex?v&space;=&space;(x,y)&space;\rightarrow&space;(y,-x)" title="v = (x,y) \rightarrow (y,-x)" />

The goal is to have a network of points that attract, repel and change direction dependent on the system as a whole. It will be interesting to discover if the points will eventually settle in equilibrium, or if the system will remain chaotic, and if it is chaotic, how unpredictable will the system become.