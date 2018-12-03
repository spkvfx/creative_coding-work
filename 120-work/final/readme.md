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

Both points and pointclouds have attribute{} and behavior{} objects. Attributes store information about the point or pointcloud at a given time while behaviors are to store instances of classes that affect the values of attributes.

Naturally, these could be saved as their own properties, but I felt that packaging them up into corresponding objects made organizations sense, rather than just having them floating around.

**Phxyz.js**<br>
This is an updated version of the library created for PongSolo in week 7. It now expects the xPoint attribute object to read and manipulate attributes.

The goal for this class is to create a low-level physics library for javascript. It's intended use is to give access to fundamental simulation tools, rather than to say "here is an object, bounce off this when collided."

It's definitely a work in progress, and there needs to be many additional tools provided. So far I have a basic positional solver to update velocity and position according to force, taking into account mass and drag. I also have basic vector mirroring for point collision.

**sketch.js**<br>
The main sketch works pretty much as described in the proposal. 

As discussed, a point cloud is populated with random points. The point's nearest neighbor is solved, and their attraction tendancy is determined on each frame: with a higher attraction to avoidance ratio the point's force vector is increased in the direction of the neighbor.

Once the particle's distance drops below a given value, several things happen:

* The particle and it's neighbor changes direction using the phyxyz.collide with the normal set to the unit vector of velocity.

* A child particle is born and is given a force equal to the perpendicular of the parent's velocity, and has a yellow color. 

* The color of the parent particle changes from blue to red.

Because particles are moving very quickly as they approach one another, this has the effect of flinging children and parents away from the collision.

####Differences from the Proposal
The proposal called for a few features that were not implemented. Mass modification was removed, just because it proved either inconsequential or completely unstable. I also thought I needed an averarge of all distances, but once I got a few particles moving up I did not think this was necessary.

For simplicity sake, I also used Phxyz.collide with the normal being th unit vector of velocity since it handles attributes automatically. In this case though it would have the same effect as simply negating velocity.

####Code Reuse
As mentioned one goal was to improve code reuse of my xPoint and Phxyz objects. I wanted to get this code as modular as possible so that it could be used like a proper library. Indeed, the project itself was not very difficult, but getting a system in place that was modular and portable took quite some time.

So I went about looking into the very complex and annoying world of javascript modules. However, while I was able to get my modules up and running I was having a lot of trouble getting it all to work with p5. 

The main issue here was difficulty understanding how to import p5 as a module. I am not even sure if it is possible. When I got things to work "ok" I ended up having an instance of p5 for each and every particle object. This did not set well with me.

Eventually I did get it to work, but once I had it working in a single p5 instance, I introduced reuse issues that defeated the purpose. I ended up just returning to the scheme I've been using and forgetting about E6 modules entirely.

####Behavior Scopes
Behaviors can be applied to either individual particles, or the entire pointcloud, so when I started deciding how to approach how to manipulate attributes via behaviors the obvious solution was to simply have each point object inheret physics functionality from Phxyz.js.

Bt because I wanted all of this to be modular and independent, with each module useable without requiring any other component, this didn't work well. So instead I simply added a physics behavior to every single particle, using itself as the target object.

While writing this I realized that it would make more sense to place the physics behavior in the pointcloud behavior{} object. So I ended up with hundreds of instances of the entire Phxyz class.

While writing this it occurred to me that I could instead have just one instance of the Phxyz library and associate it with the Pointcloud instead, simply changing the Phxyz.obj property to the targetted point.

While I do not know if there is any performance advantage here (id imagine there would be), the scheme is more in line conceptually with how I see this system working.

####Zero Distance Bug
One issue that I had some trouble understanding was that I initially placed the child particles directly at the same position as the parent, which caused an infinite loop scenario. To resolve this I instead had child points spawn at a random point near the parent. It is theoretically plausible that a subsequent child could be born here (and it does happen), but it will no longer result in a loop condition.

####Distant Parent Bug
When I envisioned the algorithm in the proposal, I imagined two child particles being spawned upon collision, one for the each point. However, what I found was that once the neighbor is evaluated, it is no longer close enough to spawn a child.

As a kludge, I simply forced both the target and it's neighbor to spawn a child and change colors, rather than to depend on the neighbor being close enough to trigger this action.

####Maximum Particle Count
It became very apparent to me that I needed some way to control the total number of points in a pointcloud to prevent crashing since some configurations would lead to tightly clustered points that rapidly spawn children.

I initially prototyped this within the nursery() function, but eventually moved this feature into the Pointcloud class itself. By default, Pointclouds have a maximum count of 5000 points, at which point no new points are added.

####Line Width
I knew pretty early on I wanted the speed of points to influence the stroke width, with faster moving points having a smaller stroke. I tried a few methods using map(), but ultimately used an approximate sigmoid function of speed with scale and offset.

####Conclusion
Overall this project was deceptively difficult. I knew that I had a lot of work to get everything up and running, but I definitely under-estimated the logistics involved with getting all of my classes to talk to one another without breaking them or making them intrinsically tied to one another. Overall I probably did spend about three times as much effort on this project that I did on the typical weekly assignment. However, most of this was involved with goals that are not neccesarily visible in this example.

Nonetheless, I am happy with the project and the product, and I feel my overall understanding of topics such as code reuse and modularity have improved.