let canvasWidth = 1000;
let canvasHeight = 500;

class knife {
  constructor(x = canvasWidth/10 , y = canvasHeight / 2, width = canvasWidth / 80) {
    this.origX = x;
    this.origY = y;
    this.x = x;
    this.y = y;
    this.width = width;
    this.threw = false;
    this.move = false;
    this.trajectory= []
  }

  display() {
    fill(255)
    ellipse(this.x,this.y,this.width,this.width)
  }

  throw() {
    if (this.move == true) {

      this.x += 10;
      this.y += (this.trajectory[1] / this.trajectory[0])*10

    }}

  setTrajectory(x,y) {
    this.trajectory = [x,y];
  }

}

class target {
  constructor(x = canvasWidth / 1.5, height = 50, speed = 1) {
    this.x= canvasWidth - canvasWidth / 10;
    this.y= 0;
    this.width= 10;
    this.height= 50;
    this.speed = speed;
  }

  display() {
    rect(this.x,this.y,this.width,this.height)
  }

  moveDown() {
    this.y += this.speed
  }
}



function setup() {

  angleMode(DEGREES);
  createCanvas(1000,500);
  background(0);
  noFill();
  stroke(255);


  kn1 = new knife();
  target1 = new target(null,null,2);


}

function draw() {
  background(0)
  kn1.display()

  target1.display()
  target1.moveDown()


  kn1.throw()

  fill(255,0,0)
  ellipse(mouseX,mouseY,5,5)



}



function mousePressed() {
  if (kn1.move == false) {
    kn1.setTrajectory(mouseX - kn1.origX,mouseY - kn1.origY );
    kn1.move = true
  }
}
