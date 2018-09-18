let myElement ;

function setup() {

    myElement = new element() ;
}

function draw() {
    myElement.display()

}

function element(default_WIDTH=100, min_WIDTH=10) {

    createCanvas(800, 800);

    this.display = function(tx=0, ty=0, w=0) {
        this.w = 0;

        ellipse(100, 100, default_WIDTH, default_WIDTH) ;

    }
}