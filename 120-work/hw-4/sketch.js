let bg;
let myEye;
let myBody;

let y = 0 ;

function setup() {
    bg = color(210,210,215);
    createCanvas(800, 800);
    myEye = new Eyeball(50,2,1.5);

    myBody = new BodyScribble(0,300,150)

}

function draw() {

    background(bg);


    noFill();

    translate(50,50)
    myBody.display() ;


}

function Eyeball(d,dr,pr) {

    this.d = d;                                     //eye diameter
    this.dr = dr;                                   //aspect ratio
    this.pr = max(1,pr);                            //pupil ratio (inverse)


    this.display = function(x,y) {

        let w = this.d;                             //height
        let h = this.d/this.dr;                     //width

        let p = this.d / (this.dr * this.pr);       //pupil size

        push() ;                                    //main eye sandbox
        fill(bg) ;                                  //eyelid color
        arc(x,y,w,h,0,PI) ;                         //eyelid (scaled)

        push();                                     //pupil sandbox
        fill("black");                              //pupil color
        ellipse(x,y,p,p);                           //pupil
        pop();                                      // push back to main sandbox

        arc(x,y,w,h,PI,PI,CHORD) ;                  //lower socket
        pop() ;                                     //restore
    }
}

function BodyScribble(i,bx,by) {

    this.i  = i;
    this.bx = bx;
    this.by = by;

    this.cx = bx/2;
    this.cy = by/2;



    this.display = function() {

        i = 0;
        rx1 = 0;
        ry1 = 0;

        while (i < 5) {

            this.rx2 = i * 50;
            this.ry2 = random(0, this.by);

            line(rx1, ry1, this.rx2, this.ry2);
            myEye.display(rx1, ry1);

            rx1 = this.rx2;
            ry1 = this.ry2;
            i = i + 1;
        }

        myEye.display(rx1, ry1);


    }
}