let bg;
let myEye = [] ;
let myMono = [] ;

let test ;

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
    let i_EYEBALL = 0;                                                              //eyeball index
    let i_MONO = 0;                                                                 //monocle index

    for (let x = 0; x <= h/spacing; x++) {                                          //eyeball columns
        for (let y = 0; y <= v/spacing; y++) {                                      //eyeball rows

            const dia_EYE       = random(35, spacing*0.90) ;                        //eyeball diameter
            const ratio_EYE     = random(1, 2) ;                                    //eyeball size variations
            const ratio_PUPIL   = random(1, 4) ;                                    //pupil size variation
            const pos           = createVector(x*spacing,y*spacing) ;               //position of the eyeball

            myEye[i_EYEBALL] = new Eyeball(dia_EYE,ratio_EYE,ratio_PUPIL,pos) ; //eyeball array

            const k = round(random(0,1.75)) ;                                       //random constant for monocles
            if (k < 0.5) {                                                          //monocle threshold
                let f ;                                                             //ring position
                if (pos.x < h/2) {                                                  //position at left
                    f = 5 ;
                }
                else {                                                              //position at right
                    f = 7 ;
                }
                const theta = f/8 ;                                                 //position of the ring along the lens in 1/8 increments
                myMono[i_MONO] = new Mono(dia_EYE/ratio_EYE*2,spacing*0.1,theta,pos) ;    //monocle array
                i_MONO++ ;                                                          //accumulate the monocle index
            }
            i_EYEBALL++ ;                                                           //accumulate the eyeball index
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
            fill(bg);
            rect(-50,-50,h+100,v+300);
            fill(bg) ;
        pop();

        //beard
        push();
            myBeard.display(0,525) ;
        pop() ;

        //mouth
        push();
            myMouth.display(0,v+50);
        pop();

        //eyes
        push() ;
            for (let i = int(0); i < myEye.length; i++) {
                myEye[i].display();                             //eye
            }

            for (let i = int(0); i < myMono.length; i++) {
                myMono[i].display();                            //monocle
            }
        pop();
    pop();


}

function Beard(w,h) {

    this.display = function(tx=0,ty=0) {
        push() ;
            translate(tx,ty) ;                                  //local translate
            push() ;
                fill(bg) ;
                rect(0,0,w,h) ;                                 //beard shape
                for(let i = 0; i<w/5;i++) {
                    line(i * 5, 0, i * 5, 50);                  //lines
                }
            pop();
        pop();

    }
}

function Mouth(w,h) {

    this.display = function(tx=0, ty=0) {
        push();
            translate(tx,ty);
            push();
                strokeWeight(10);                                  //lips stroke
                fill('red') ;                                      //lips color
                rect(0,0,w,h,10) ;                                 //outline
                line(0,h/2,w,h/2);                                 //lips divider
            pop();
        pop();
    }
}

function Eyeball(dia_EYE,ratio_EYE,ratio_PUPIL,pos) {

    ratio_PUPIL = max(1,ratio_PUPIL);                                //pupil ratio (inverse)

    this.display = function(tx=0, ty=0) {

        let w = dia_EYE;                                             //height
        let h = dia_EYE / ratio_EYE ;                                //width
        let size_PUPIL = dia_EYE / (ratio_EYE * ratio_PUPIL) ;       //pupil size


        push() ;                                                    //main eye style
            translate(tx,ty);                                       //main translate

            push() ;
                fill(bg) ;                                          //eyelid color
                arc(pos.x,pos.y,w,h,0,PI) ;                         //eyelid (scaled)

                push();                                             //pupil sandbox
                    fill("black");                                  //pupil color
                    ellipse(pos.x,pos.y,size_PUPIL,size_PUPIL);     //pupil
                pop();                                              //push back to main style

                arc(pos.x,pos.y,w,h,PI,PI,CHORD) ;                  //lower socket
            pop() ;                                                 //restore style

        pop() ;
    }
}

function Mono(dia_LENS=1,dia_RING=0.1,theta=1.25,pos) {

    this.display = function(tx=0, ty=0) {
        push() ;
            translate(tx,ty) ;

            //ring and cord
            push() ;
                let px = dia_LENS/2*cos(2*PI*theta)+pos.x ;    //calculate x position along the lens
                let py = dia_LENS/2*sin(2*PI*theta)+pos.y ;    //calculate y position along the lens
                fill('black') ;                                //ring fill
                ellipse(px,py,dia_RING,dia_RING) ;             //ring shape
                line(px,py,px,height);                         //line
            pop() ;

            //lens
            push() ;
                push() ;
                    noFill() ;                                 //make see-through
                    strokeWeight(2.5);                         //lens stroke
                    ellipse(pos.x,pos.y,dia_LENS,dia_LENS) ;   //lens shape
                pop() ;
            pop() ;
        pop() ;

    }


}