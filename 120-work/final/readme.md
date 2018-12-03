# [Jackson Pollock's Particle Accelerator](https://spkvfx.github.io/creative_coding-work/120-work/final/)

### Proposal

For the final I intend to write a generative script that follows the following rules:

* Each actor is attracted to one another at a rate of the mean of the neighbors' mass (m) over distances (d) multiplied by the unit vector (hat) between corresponding points (P1, P2), such that close points are far more attractive than distant points, and that more massive actors are more attractive than less massive actors: <br><br><img src="https://latex.codecogs.com/gif.latex?F&space;=&space;\frac{1}{n}&space;\sum&space;_{i=1}&space;^n&space;(\widehat{P1_i&space;-&space;P2_i})&space;\cdot&space;\frac{m_i}{d_i}" title="F = \frac{1}{n} \sum _{i=1} ^n (\widehat{P1_i - P2_i}) \cdot \frac{m}{d_i}" /><br>* a curve function of *F* may be required to normalize force to a manageable range.

* Once a given velocity (v) magnitude reaches a specific threshold, each actor's velocity is inverted: <br><br><img src="https://latex.codecogs.com/gif.latex?|{\sqrt{v_x^2&plus;v_y^2}}|$\geq$threshold&space;:&space;v&space;=&space;-v" title="|{\sqrt{v_x^2+v_y^2}}|$\geq$threshold : v = -v" />

* Additionally, a new actor is created with an initial velocity (v) *perpendicular* to the corresponding actor's parent's velocity (v') :<br><br><img src="https://latex.codecogs.com/gif.latex?\left&space;\{&space;v_x,v_y&space;\right&space;\}&space;=&space;\left&space;\{&space;v'_y,-v'_x&space;\right&space;\}" title="\left \{ v_x,v_y \right \} = \left \{ v'_y,-v'_x \right \}" />

* Furthermore, each actor gains mass over time and with each 'split' some of the parent's mass is transferred to the child. 
* Upon reaching a minimum threshold, each actor dies and is removed from the network.

The goal is to have a network of points that attract, repel and change direction dependent on the system as a whole. It will be interesting to discover if the points will eventually settle in equilibrium, or if the system will remain chaotic, and if it is chaotic, how unpredictable will the system become.

It will also be interesting to experiment with which initial states will produce a sustainable network and which states will be prone to decay and eventual extinction.

I would also like to point out that this is not intended to be a *physical* representation of gravity, nor any type of n-body simulation as the mass of the actor is not taken into consideration to determine attractive force.

#### Issues

I will need to cleanup up some code in my custom libraries I've developed through this course. But I am not otherwise expecting any significant issues.

#### Work Plan

I am dedicating approximately 14-20 hours to this project, six hours of which are to be spent on cleaning up existing code, six to eight hours on development and the remainder on visualization and experimenting with different parameters to find interesting results. If I have time, I'd like to also include some kind of user input. The algorithm is already planned, so it should be pretty straightforward to code.

---

###Discussion

This project was a bit more involved than I initially anticipated, though, aside from a few details is pretty much how I anticipated it.

Aside from the objective goals listed in my proposal, I also wanted to clean up past code and improve code reuse. All together, it took much longer to complete than I anticipated, even when not taking into account some wrong turns that were not included.

####Application Theory
The code relies on two custom libraries, xPoint.js and Phxyz.js that were initially developed for earlier assignments. Phxyz.js was updated to accept the attribute{} object from xPoint.js and facilitate further development using this framework.

Using the attribute{} object specific attributes can be passed between individual points and the Phxyz.js library that influences their behavior.

**xPoint.js**<br>
This javascript library is responsible for handling points and pointclouds. Points may be *structured* or *unstructured*. Structured points are associated with a pointcloud class object, while unstructured points are not. 

Pointcloud objects are a collection of points. This permits allowing points to be manipulated as a group together, such as finding neighbors.

####Code Reuse
As mentioned one goal was to improve code reuse of my xPoint and Phxyz objects. I wanted to get this code as modular as possible so that it could be used like a proper library. So I went about looking into the very complex and annoying world of javascript libraries. However, while I was able to get my modules up and running I was having a lot of trouble getting it all to work with p5. 

The main issue here was I was having difficulty understanding how to import p5 as a module, and I am not even sure if it was possible. When I got things to work "ok" I ended up having an instance.