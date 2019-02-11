let canvasWidth = 1000;
let canvasHeight = 500;

class knife {
  constructor(x = canvasWidth/10 , y = canvasHeight / 2, width = canvasWidth / 80) {
    this.x = x;
    this.y = y;
    this.width = width;
  }

  display() {
    fill(255)
    ellipse(this.x,this.y,this.width,this.width)
  }

  moveRight() {
    this.x++
  }
}

function setup() {

  angleMode(DEGREES);
  createCanvas(1000,500);
  background(0);
  noFill();
  stroke(255);

  kn1 = new knife();




}

function draw() {
  background(0)
  kn1.moveRight()
  kn1.display()


}
