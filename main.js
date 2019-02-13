let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;


let maxSpeed = 30;

let origTargetHeight = 200;
let origtTargetX = canvasWidth/1.5;
let origTargetSpeed = 2;

let targetHeight = origTargetHeight;
let targetX = origtTargetX;
let targetSpeed = origTargetSpeed;

let score = 0;
let bestScore = 0;

let bgColor = [255,169,0]
let scoreColor = [0,0,0];
let knifeColor = [0,0,0];
let targetColor = [255,255,255];
let hitTargetColor = [0,255,44]
let loadColor = [255,0,0];
let savePlatformColor = [49,131,232];


let congratulations = {
  list : ["Nice!", "Well done!", "Good job!", "Wow!", "What a boss!", "Amazing!", "Lovely!", "Incredible!","Prodigious!","Stunning!","Unbelievable!","Wonderful!","Awesome!","Marvelous!","Impressive!","Remarkable!","Mind-blowing!","Breathtaking!","Majestic!"],
  done: false,
  randomCong :  function() { return congratulations.list[Math.floor(Math.random()*congratulations.list.length)]},
}

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
    fill(knifeColor[0],knifeColor[1],knifeColor[2])
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


    this.width= 10 //30;
    this.height= targetHeight;
    this.origSpeed = targetSpeed;
    this.speed = targetSpeed;

    this.color = targetColor;
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

let savePlatform = {
  height: 100,
  width : 10,
  x: canvasWidth - 10,
  y: 0,
  speed: 8,
  direction: "down",
  color: savePlatformColor,
  saved : false,
  display : function() {
    fill(this.color[0], this.color[1], this.color[2])
    rect(this.x,this.y,this.width,this.height)
  },

  move : function() {

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


  },

  savedBall : function() {

    if ((kn1.x + kn1.width) > this.x && (kn1.y - kn1.width) > this.y && (kn1.y + kn1.width) < this.y + this.height) {
      this.saved = true;
      console.log("saved")
    }


  }

}

function detectCollision() {

  if ((kn1.x + kn1.width) > target1.x && (kn1.x - kn1.width) < (target1.x + target1.width) && (kn1.y - kn1.width) > target1.y && (kn1.y + kn1.width) < target1.y + target1.height) {
    kn1.hitTarget = true;
    target1.color = hitTargetColor;
    return 'win'
  }

}

function displayNice() {
  if (kn1.hitTarget == true) {
    if (congratulations.done == false) {
      randCong = congratulations.randomCong()
      congratulations.done = true;
      hitSound.play();
    }
    fill(255)
    textAlign(CENTER,CENTER)
    textSize(50)
    text(randCong, canvasWidth / 2,canvasHeight/2)

  }
}

function nextLevel() {

  if ((kn1.x - kn1.width) > canvasWidth || (kn1.y - kn1.width) > canvasHeight || (kn1.y + kn1.width) < 0 ) {


    if (kn1.hitTarget == true) {


      targetHeight-= 5;
      targetSpeed+= 0.4;
      //targetX += 10;
      kn1.reset();
      target1 = new target();
      congratulations.done = false;

      score++;

      if (score > bestScore) {
        bestScore = score;
      }

      savePlatform.saved = false;
    }

    else if (savePlatform.saved == true) {

      saveSound.play()
      kn1.reset();
      target1 = new target();
      savePlatform.saved = false;

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


function drawTrajectory() {

  if (kn1.move == false) {
    // Speed indicator
    fill(loadColor[0],loadColor[1],loadColor[2])
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
      if (kn1.speed < kn1.origSpeed) {
        kn1.speed = kn1.origSpeed // prevents speed to be under min speed

      }
      kn1.setTrajectory(mouseX - kn1.origX,mouseY - kn1.origY );
      kn1.move = true
      kn1.trajectorySet = true;
    }

  }
}

function displayScore() {
  textAlign(CENTER,CENTER)
  fill(scoreColor[0],scoreColor[1],scoreColor[2])
  textSize(20)
  text(score,50,50)
  text(bestScore, 50,100)
}








function preload() {

  hitSound = new Howl({
  src: ['./sounds/hit-target.flac']
});

  saveSound = new Howl({
    src:['./sounds/saved-ball.wav']
  })

}

function setup() {

  angleMode(DEGREES);
  createCanvas(canvasWidth,canvasHeight);
  background(bgColor[0],bgColor[1],bgColor[2]);
  //noFill();
  //stroke(255);


  kn1 = new knife();
  target1 = new target();


}

function draw() {

  background(bgColor[0],bgColor[1],bgColor[2])

  kn1.display()

  target1.display()

  target1.move()

  kn1.throw()

  loadSpeed()

  drawTrajectory()

  detectCollision()

  nextLevel()

  displayScore()

  displayNice()

  savePlatform.display()
  savePlatform.move()
  savePlatform.savedBall()


}
