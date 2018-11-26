# Shawn Kearney Final Project

For the final I intend to write a generative script that follows the following rules:

* Each actor is attracted to one another at a rate of the mean reciprocal of the distances (I *think* this is right):<br><br><img src="https://latex.codecogs.com/gif.latex?F&space;=&space;\frac{1}{n}&space;\sum&space;_{i=1}&space;^n&space;\frac{1}{d_i}\cdot&space;(P1_i&space;-&space;P2_i)" title="Force = \frac{1}{n} \sum _{i=1} ^n \frac{1}{d_i}\cdot (P1_i - P2_i)" />

* Once a given velocity magnitude reaches a specific threshold, each actor's velocity is inverted. This has the effect of the being repelled within a defined radius:<br><br><img src="https://latex.codecogs.com/gif.latex?|{\sqrt{v_x&plus;v_y}}|$\geq$threshold&space;:&space;v&space;=&space;-v" title="|{\sqrt{v_x+v_y}}|$\geq$threshold : v = -v" /><br>

* Additionally, an additional actor is created with an injected velocity (v) *perpendicular* to the corresponding actor's parent's velocity (v') :<br><br><img src="https://latex.codecogs.com/gif.latex?v&space;=&space;\left&space;\{&space;v'_y,-v'_x&space;\right&space;\}" title="v = \left \{ v'_y,-v'_x \right \}" />

The goal is to have a network of points that attract, repel and change direction dependent on the system as a whole. It will be interesting to discover if the points will eventually settle in equilibrium, or if the system will remain chaotic, and if it is chaotic, how unpredictable will the system become.