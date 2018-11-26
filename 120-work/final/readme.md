# Shawn Kearney Final Project

For the final I intend to write a generative script that follows the following rules:

* Each actor is attracted to one another at a rate of the mean of the neighbors' mass (m) over distances (d) multiplied by the unit vector between corresponding points (P1, P2), such that close points are far more attractive than distant points, and that more massive actors are more attractive than less massive actors: <br><br><img src="https://latex.codecogs.com/gif.latex?F&space;=&space;\frac{1}{n}&space;\sum&space;_{i=1}&space;^n&space;(\widehat{P1_i&space;-&space;P2_i})&space;\cdot&space;\frac{m}{d_i}" title="F = \frac{1}{n} \sum _{i=1} ^n (\widehat{P1_i - P2_i}) \cdot \frac{m}{d_i}" /><br>* a curve function of *F* may be required to normalize force to a manageable range.

* Once a given velocity (v) magnitude reaches a specific threshold, each actor's velocity is inverted: <br><br><img src="https://latex.codecogs.com/gif.latex?|{\sqrt{v_x^2&plus;v_y^2}}|$\geq$threshold&space;:&space;v&space;=&space;-v" title="|{\sqrt{v_x^2+v_y^2}}|$\geq$threshold : v = -v" />

* Additionally, a new actor is created with an initial velocity (v) *perpendicular* to the corresponding actor's parent's velocity (v') :<br><br><img src="https://latex.codecogs.com/gif.latex?\left&space;\{&space;v_x,v_y&space;\right&space;\}&space;=&space;\left&space;\{&space;v'_y,-v'_x&space;\right&space;\}" title="\left \{ v_x,v_y \right \} = \left \{ v'_y,-v'_x \right \}" />

* Furthermore, each actor gains mass over time and with each 'split' some of the parent's mass is transferred to the child. 
* Upon reaching a minimum threshold, each actor dies and is removed from the network.

The goal is to have a network of points that attract, repel and change direction dependent on the system as a whole. It will be interesting to discover if the points will eventually settle in equilibrium, or if the system will remain chaotic, and if it is chaotic, how unpredictable will the system become.

It will also be interesting to experiment with which initial states will produce a sustainable network and which states will be prone to decay and eventual extinction.

I would also like to point out that this is not intended to be a *physical* representation of gravity, nor any type of n-body simulation as the mass of the actor is not taken into consideration to determine attractive force.