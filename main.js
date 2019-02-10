var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);


function preload () {

}

function create () {

  let circleFill = this.add.graphics({ fillStyle: { color: 0xff0000 } });

  class knife {

    constructor() {
      this.x = 100;
      this.y = 300;
      this.width = 25;
    }

    display() {

      let circle = new Phaser.Geom.Circle(this.x, this.y, this.width);
      circleFill.fillCircleShape(circle);

    }
  }



  let kn = new knife();
  kn.display()



}

function update () {


}
