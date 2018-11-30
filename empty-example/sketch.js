let myPurpleSphere ;
let myGreenSphere ;

function setup() {
    createCanvas(800, 800);
    myPurpleSphere = new purpleSphere(100,100,100) ;
    myGreenSphere = new greenSphere(50,50,100) ;

}

function draw() {
    noLoop() ;
    myPurpleSphere.display();
    myGreenSphere.display();
}

class Sphere {
    constructor(x,y,radius,color) {
        this.x = x ;
        this.y = y ;
        this.radius = radius;
        this.color = color ;
        this.stroke = 2.0 ;
    }

    display() {
        push() ;
            fill(this.color) ;
            strokeWeight(this.stroke)
            ellipse(this.x,this.y, this.radius,this.radius) ;
        pop() ;
    }

}

class purpleSphere extends Sphere {
    constructor(x,y,size) {
        const radius = size/2
        super(x,y,radius,"purple") ;
    }
}

class greenSphere extends Sphere {
    constructor(x,y,size) {
        const radius = (size/2) ;
        super(x,y,radius,"green") ;
        this.stroke = 1.0 ;
    }
}