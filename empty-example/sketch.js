var Newton;
var Apples = [];
var Seed = [];

function setup() {
    createCanvas(1000, 800);
    Newton = new Newton();
//Seed = new Seed(width/2, height/2);
    for (var i = 0; i < 11; i++) {
        Apples[i] = new Apple(i*80+80, 20);
    }
}

function draw() {
    background("pink");
    Newton.show();

    for (var i = 0; i < Seed.length; i++) {
        Seed[i].show();
        Seed[i].move();
    }

    for (var i = 0; i < Apples.length; i++) {
//Apples[i].show();
    }
}

function keyPressed() {
    if (keyCode === 83) {
        var Seed = new Seed(width/2, height/2);
        Seed.push(Seed);
    }
    if (keyCode === RIGHT_ARROW) {
        Newton.move(1);
    }
    else if (keyCode === LEFT_ARROW) {
        Newton.move(-1);
    }
}