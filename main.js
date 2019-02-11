let canvasWidth = 1000;
let canvasHeight = 500;

let maxSpeed = 30;

class knife {
  constructor(x = canvasWidth/10 , y = canvasHeight / 2, width = canvasWidth / 80, speed = 2) {
    this.origX = x;
    this.origY = y;
    this.origSpeed = speed;

    this.x = x;
    this.y = y;
    this.width = width;
    this.speed = speed;
    this.trajectory= [];

    this.move = false;
    this.loadingSpeed = false;
    this.trajectorySet = false;
  }

  display() {
    fill(255)
    ellipse(this.x,this.y,this.width,this.width)
  }

  throw() {
    if (this.move == true) {

      this.x += this.speed;
      this.y += (this.trajectory[1] / this.trajectory[0])*this.speed

    }}

  setTrajectory(x,y) {
    this.trajectory = [x,y];
  }

  reset() {
    this.x = this.origX;
    this.y = this.origY;
    this.speed = this.origSpeed;
    this.trajectory = [];
    this.move = false;
    this.loadingSpeed = false;
    this.trajectorySet = false;
  }

}

class target {
  constructor(x = canvasWidth / 1.5, height = 50, speed = 1, direction = "down") {

    if (direction == "up") {
      this.y = canvasHeight + height
    } else if (direction == "down") {
      this.y = 0
    }


    this.x= canvasWidth - canvasWidth / 10;
    this.direction = direction;
    this.width= 10;
    this.height= 50;
    this.origSpeed = speed;
    this.speed = speed;
  }

  display() {
    rect(this.x,this.y,this.width,this.height)
  }

  move() {
    if (this.direction == "down"){
    this.y += this.speed}
    else if (this.direction == "up") {
    this.y -= this.speed }
  }
}

function detectCollision() {

  if ((kn1.x + kn1.width) > target1.x && (kn1.x - kn1.x) < (target1.x + target1.width) && (kn1.y + kn1.width) > target1.y && (kn1.y + kn1.width) < target1.y + target1.height) {
    return 'win'
  }

  else if ((kn1.x - kn1.width) > canvasWidth || (kn1.y - kn1.width) > canvasHeight || (kn1.y + kn1.width) < 0 ) {
    return "lose"
  }

}

function drawTrajectory() {

  if (kn1.move == false) {
    fill(255,0,0)
    ellipse(mouseX,mouseY,kn1.speed,kn1.speed)
    strokeWeight(0.2)
    line(kn1.x, kn1.y, mouseX,mouseY)
    stroke(255)
    noFill()
    ellipse(mouseX,mouseY,maxSpeed,maxSpeed)
  }
}

function loadSpeed() {
  if (mouseIsPressed && kn1.move == false) {
    kn1.loadingSpeed = true;
    kn1.speed+= 0.8001
    kn1.speed =  kn1.speed % maxSpeed


  } else if (kn1.speed != kn1.origSpeed) {

    if (kn1.trajectorySet == false) {
      kn1.setTrajectory(mouseX - kn1.origX,mouseY - kn1.origY );
      kn1.move = true
      kn1.trajectorySet = true;
    }

  }
}







function setup() {

  angleMode(DEGREES);
  createCanvas(1000,500);
  background(0);
  noFill();
  stroke(255);


  kn1 = new knife();
  target1 = new target(null,null,2, "up");


}

function draw() {

  background(0)

  kn1.display()

  target1.display()

  target1.move()

  kn1.throw()

  loadSpeed()

  drawTrajectory()

  if (detectCollision() == 'win') {
    kn1.reset()
  }


}
