
let shapes = [];

function setup() {
    createCanvas(windowWidth, 800);
    let b = new ShapeCrazy(width/2, height/2, 10);
    shapes.push(b);
}



function mouseDragged() {
    let r = random(30,80);
    let b = new ShapeCrazy(mouseX, mouseY, r);
    shapes.push(b);
}

function draw() {
    background('rgb(39, 151, 201)');
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].move();
        shapes[i].display();
    }

    class ShapeCrazy {
        //  setting variables for the shapes that are drawn later.
        constructor() {
            this.x = x;
            this.y = y;
            this.c = random(15, 70);
            this.e = this.c * 3;
            this.stroke_col = color(random(255), random(255), random(255));

        }

        move() {
            // adding movement so the shapes move and start in different places.
            this.x = this.x + random(-10, 5);
            this.y = this.y + random(-5, 5);
        }

        display() {
            // setting a random stroke color for the rectangle
            // setting the rate of change of the color for stroke and fill
            frameRate(4);
            stroke(this.stroke_col);
            strokeWeight(4);
            //  no fill for the rectangle that is drawn in the next line
            noFill();
            rect(this.x, this.y, this.c * 2, this.e * 2);

            // new shape added to the code
            frameRate(10);
            fill(this.stroke_col);
            // drawing a ellipse
            ellipse(this.x * 2, this.y, this.c);

            // final shape added to the code
            frameRate(2)
            stroke(this.stroke_col);
            strokeWeight(8);
            //  added fill at random to the shape so you have to random colors competing with each other
            triangle(this.x, this.y, this.x * 2, this.c, this.c * 5, this.e)


        }
    }
}