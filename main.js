let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let maxSpeed = 30;

let origTargetHeight = 200;
let origtTargetX = 500;
let origTargetSpeed = 2;

let targetHeight = origTargetHeight;
let targetX = origtTargetX;
let targetSpeed = origTargetSpeed;

let score = 0;
let bestScore = 0;


class knife {
  constructor(x = canvasWidth/10 , y = canvasHeight / 2, width = 10, speed = 2) {
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

    this.hitTarget = false;
  }

  display() {
    fill(0)
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
    this.hitTarget = false;
  }

}

class target {
  constructor() {

    if (Math.random() > 0.5) {
      this.direction = "up"
    } else {
      this.direction = "down"
    }

    if (this.direction == "up") {
      this.y = canvasHeight + targetHeight
    } else if (this.direction == "down") {
      this.y = 0 - targetHeight
    }

    this.x= targetX


    this.width= 30;
    this.height= targetHeight;
    this.origSpeed = targetSpeed;
    this.speed = targetSpeed;

    this.color = [0,0,0]
  }

  display() {
    fill(this.color[0], this.color[1], this.color[2])
    rect(this.x,this.y,this.width,this.height)
  }

  move() {

    if (this.direction == "down"){
      this.y += this.speed;


      if ((this.y + this.height) > canvasHeight) {
        this.direction = "up"
      }
    } else if (this.direction == "up") {

        this.y -= this.speed;

        if (this.y < 0) {
          this.direction = "down"
        }

      }

  }

}

function detectCollision() {

  if ((kn1.x + kn1.width) > target1.x && (kn1.x - kn1.width) < (target1.x + target1.width) && (kn1.y - kn1.width) > target1.y && (kn1.y + kn1.width) < target1.y + target1.height) {
    kn1.hitTarget = true;
    target1.color = [0,255,0]
    return 'win'
  }



}

function nextLevel() {

  if ((kn1.x - kn1.width) > canvasWidth || (kn1.y - kn1.width) > canvasHeight || (kn1.y + kn1.width) < 0 ) {

    if (kn1.hitTarget == true) {
      targetHeight-= 5;
      targetSpeed+= 0.4;
      targetX += 10;
      kn1.reset();
      target1 = new target();

      score++;

      if (score > bestScore) {
        bestScore = score;
      }
    }

    else {
      targetHeight = origTargetHeight;
      targetX = origtTargetX;
      targetSpeed = origTargetSpeed;
      kn1.reset();
      target1 = new target();
      score=0

    }


  }



}

function nextEnemy() {
  target1 = new target()
}

function drawTrajectory() {

  if (kn1.move == false) {
    // Speed indicator
    fill(255,0,0)
    ellipse(mouseX,mouseY,kn1.speed,kn1.speed)

    // Max speed indicator
    stroke(0)
    strokeWeight(1)
    noFill()
    ellipse(mouseX,mouseY,maxSpeed,maxSpeed)

    // Line between mouse and knife
    strokeWeight(0.1)
    line(kn1.x, kn1.y, mouseX,mouseY)


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

function displayScore() {
  fill(0)
  text(score,50,50)
  text(bestScore, 50,100)
}


function setup() {

  angleMode(DEGREES);
  createCanvas(canvasWidth,canvasHeight);
  background(255);
  //noFill();
  //stroke(255);


  kn1 = new knife();
  target1 = new target();


}

function draw() {

  background(255)

  kn1.display()

  target1.display()

  target1.move()

  kn1.throw()

  loadSpeed()

  drawTrajectory()

  detectCollision()

  nextLevel()

  displayScore()





}
