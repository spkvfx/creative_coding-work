var circle;

function setup() {
    createCanvas( 600, 600 );

    circle = new Bubble();
}

function draw() {
    background('black');
    circle.display();
    circle.ascend();
}

function Bubble() {
    this.x = random(width);   //bubble appears in new spot upon refresh
    this.y = random(height);

    this.display = function(){
        stroke('white');
        strokeWeight(2);
        fill('lightBlue');
        ellipse(this.x, this.y, 40, 40);
    }
}