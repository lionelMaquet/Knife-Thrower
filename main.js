let canvasWidth = 1500;
let canvasHeight = 1000;
let backgroundColor = 125

let arrayOfObstacles = [];


class knife {

  constructor() {

    this.pos = [200, canvasHeight/2]
    this.width = 20;

  }

  display() {
    stroke(255)
    fill(255)
    ellipse(this.pos[0], this.pos[1], this.width)
  }

}



let enemy = new knife();


function setup() {
  angleMode(DEGREES);
  createCanvas(canvasWidth,canvasHeight);
  background(backgroundColor);
  noFill();
  stroke(255);

}

function draw() {
  if (arrayOfObstacles.length == 0) {
    arrayOfObstacles[0] = new knife()
  }

  arrayOfObstacles[0].display();

  //background(backgroundColor)

}
