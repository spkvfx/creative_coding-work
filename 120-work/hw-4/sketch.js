let bg;
let myEye = [];

let myMouth ;
let myBeard;


let spacing;
let h;
let v;


function setup() {
    bg = color(210, 210, 215);
    createCanvas(800, 800);


    spacing = 100;

    h = 300;
    v = 300;

    //the array of eyeballs
    let i = 0;
    for (let x = 0; x <= h/spacing; x++) {
        for (let y = 0; y <= v/spacing; y++) {
            const m = round(random(0,0.75)) ;
            myEye[i] = new Eyeball(random(35, spacing*0.90), random(1, 2), random(1, 4), x*spacing, y*spacing, m, spacing) ;
            i++;
        }
    }

    //the mouth
    myMouth = new Mouth(v,100);
    //the beard
    myBeard = new Beard(v,50);
}


function draw() {

    background(bg);

    push();
        //main translate
        translate(width/2-h/2,height/2-v/2*1.75);

        //face
        push();
            noFill();
            rect(-50,-50,h+100,v+300);
            fill(bg) ;

            for (let i = int(0); i < myEye.length; i++) {
                myEye[i].display();
            }


        pop();

        push();
            myBeard.display(0,525) ;
        pop() ;


        push();
            myMouth.display(0,v+50);
        pop();

    pop();

}

function Beard(w,h) {
    this.w = w;
    this.h = h;

    this.display = function(tx=0,ty=0) {
        push() ;
            translate(tx,ty) ;
            push() ;
                fill(bg) ;
                rect(0,0,this.w,this.h) ;
                for(let i = 0; i<this.w/5;i++) {
                    line(i * 5, 0, i * 5, 50);
                }
            pop();
        pop();

    }
}

function Mouth(w,h) {

    this.w = w;
    this.h = h;

    this.display = function(tx=0, ty=0) {
        push();
            translate(tx,ty);
            push();
                strokeWeight(10);
                rect(0,0,this.w,this.h,10) ;               //outline
                line(0,this.h/2,this.w,this.h/2);          //lips divider
            pop();
        pop();
    }
}

function Eyeball(d,dr,pr,x=0,y=0,m=1,mr=65) {

    this.d = d;                                     //eye diameter
    this.dr = dr;                                   //aspect ratio
    this.pr = max(1,pr);                            //pupil ratio (inverse)
    this.pr = min(1,mr);

    this.x = x;                                     //init x pos
    this.y = y;                                     //init y pos

    this.display = function(tx=0, ty=0) {

        let w = this.d;                             //height
        let h = this.d/this.dr;                     //width

        let p = this.d / (this.dr * this.pr);       //pupil size

        let pos_x = this.x;                         //composite position x
        let pos_y = this.y;                         //composite position y


        push() ;                                        //main eye style
            translate(tx,ty);                           //main translate
            push() ;
                fill(bg) ;                              //eyelid color
                arc(pos_x,pos_y,w,h,0,PI) ;             //eyelid (scaled)

                push();                                 //pupil sandbox
                    fill("black");                      //pupil color
                    ellipse(pos_x,pos_y,p,p);               //pupil
                pop();                                      //push back to main style

                arc(this.x,this.y,w,h,PI,PI,CHORD) ;        //lower socket
            pop() ;                                         //restore style

            if (m !== 0) {
                push() ;
                    noFill() ;
                    strokeWeight(2.5);
                    ellipse(this.x,this.y,mr,mr) ;
                pop() ;
            }

        pop() ;
    }
}