let bg;
let myEye = [];


function setup() {
    bg = color(210, 210, 215);
    createCanvas(800, 800);

    i = 0;
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            myEye[i] = new Eyeball(random(10, 50), random(1, 2), random(1, 4), x*50, y*50);
            i++;
        }
    }
}


function draw() {

    background(bg);


    text(myEye.length, 400,400);

    for (let i = int(0); i < myEye.length; i++) {
        myEye[i].display();
    }





}

function Eyeball(d,dr,pr,x=0,y=0) {

    this.d = d;                                     //eye diameter
    this.dr = dr;                                   //aspect ratio
    this.pr = max(1,pr);                            //pupil ratio (inverse)

    this.x = x;                                     //init x pos
    this.y = y;                                     //init y pos

    this.display = function(tx=0, ty=0) {

        this.tx = tx;                               //transform x (primarily for animation)
        this.ty = ty;                               //transform y

        let w = this.d;                             //height
        let h = this.d/this.dr;                     //width

        let p = this.d / (this.dr * this.pr);       //pupil size

        let pos_x = this.x + this.tx ;              //composite position x
        let pos_y = this.y + this.ty ;              //composite position y

        push() ;                                    //main eye style
        fill(bg) ;                                  //eyelid color
        arc(pos_x,pos_y,w,h,0,PI) ;                       //eyelid (scaled)

        push();                                     //pupil sandbox
        fill("black");                              //pupil color
        ellipse(pos_x,pos_y,p,p);                         //pupil
        pop();                                      //push back to main style

        arc(pos_x,pos_y,w,h,PI,PI,CHORD) ;          //lower socket
        pop() ;                                     //restore style
    }
}