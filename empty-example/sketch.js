
var song;
var deltaX = 0;

function preload() {
    song = loadSound("Nuori prinssi 2.mp3");
}
function setup() {
    createCanvas(windowWidth, 500);
    song.play();
}

function draw() {
    background('lightblue');

    translate(deltaX, 0);
    deltaX++;

// cloud
    noStroke();
    fill( 255 );
    ellipse(100,100,150,50);
    ellipse(75,125,150,50);
    ellipse(200,125,150,50);
    ellipse(150,135,150,50);

    if (deltaX + 85 > width){
        deltaX = -145;

    }

}