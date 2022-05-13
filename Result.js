class Result extends Phaser.Scene {

  constructor() {
    super('ResultScene');
  }



  create() {
    this.background = this.add.image(0, 200, "background");

    this.planet = this.add.image(width / 2, height / 2, "planet");
    this.planet.scale = 2;
    this.player = this.add.image(300, 0, "player");
    this.player.scale = 0.03;
    this.player.angle = sp;
    this.player.x = px;
    this.player.y = py;
    this.obstacle = this.add.image(0, 0, "obstacle");
    this.obstacle.scale = 0.1;
    this.obstacle.x = ox;
    this.obstacle.y = oy;
    this.obstacle.angle = so;
    this.obstacle.flipX = true;


    this.blackScreen = this.add.image(0, 250, "blackBg");
    this.blackScreen.scale = 3;
    this.blackScreen.setAlpha(0.7);

    this.score = this.add.image(width / 2, (height / 2) - 500, "score");
    this.scoreText = this.add.text(width / 2 - 10, (height / 2) - 500, score, { fill: "#535353", font: '900 35px Courier', resolution: 5 }),
      this.restartButton = this.add.image((width / 2) - 55, ((height / 2) + 70) - 500, "playAgain").setInteractive(),
      this.homeButton = this.add.image((width / 2) + 55, ((height / 2) + 70) - 500, "home").setInteractive(),
      this.homeButton.scale = 0.3;

    this.restartButton.on('pointerdown', () => {
      this.restartButton.scale = 0.9;
    })
    this.restartButton.on('pointerup', () => {
      this.restartButton.scale = 1;
      this.outro1();
    })

    this.homeButton.on('pointerdown', () => {
      this.homeButton.scale = 0.25;
    })
    this.homeButton.on('pointerup', () => {
      this.homeButton.scale = 0.3;
      this.outro2();
    })


    this.intro();




  }
  intro() {
    this.tweens.add({
      targets: this.score,
      y: height / 2,
      duration: 500
    });
    this.tweens.add({
      targets: this.scoreText,
      y: height / 2,
      duration: 500,
    });
    this.tweens.add({
      targets: this.homeButton,
      y: (height / 2) + 70,
      duration: 500
    });
    this.tweens.add({
      targets: this.restartButton,
      y: (height / 2) + 70,
      duration: 500,
    });
  }

  outro1() {
    this.tweens.add({
      targets: this.score,
      y: -300,
      duration: 600
    });
    this.tweens.add({
      targets: this.scoreText,
      y: -300,
      duration: 600,
    });
    this.tweens.add({
      targets: this.homeButton,
      y: -300,
      duration: 600
    });
    this.tweens.add({
      targets: this.restartButton,
      y: -300,
      duration: 600,
      onComplete: () => {
        this.scene.start("GameScene");
      }
    });
  }

  outro2() {
    this.tweens.add({
      targets: this.score,
      y: -300,
      duration: 600
    });
    this.tweens.add({
      targets: this.scoreText,
      y: -300,
      duration: 600,
    });
    this.tweens.add({
      targets: this.homeButton,
      y: -300,
      duration: 600
    });
    this.tweens.add({
      targets: this.restartButton,
      y: -300,
      duration: 600,
      onComplete: () => {
        this.scene.start("HomeScene");
      }
    });
  }
}