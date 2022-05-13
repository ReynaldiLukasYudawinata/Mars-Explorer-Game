class Home extends Phaser.Scene {

  constructor() {
    super('HomeScene');
  }

  preload() {
    this.load.image('player', 'Assets/amogus.png');
    this.load.image('obstacle', 'Assets/greenGuy.png');
    this.load.image('planet', 'Assets/planet.png');
    this.load.image('background', 'Assets/background.jpg');
    this.load.image('title', 'Assets/judul.png');
    this.load.image('play', 'Assets/play.png');
    this.load.image('smoke', 'Assets/smoke.png');
    this.load.image('empty', 'Assets/empty.png');
    this.load.image('playAgain', 'Assets/playAgain.png');
    this.load.image('score', 'Assets/score.png');
    this.load.image('home', 'Assets/Home.png');
    this.load.image('blackBg', 'Assets/black.jpg');
    this.load.audio('jump', 'Assets/jump.mp3');
    this.load.audio('music', 'Assets/music.mp3');
    this.load.audio('bump', 'Assets/bump.mp3');
  }

  create() {

    if (isPlayed == false) {
      this.sound.play('music', { loop: true });
      isPlayed = true;
    }

    this.background = this.add.image(0, 200, "background");


    this.planet = this.add.image(width / 2, height / 2, "planet");
    this.planet.scale = 2;

    this.player = this.add.image(0, 0, "player");
    this.player.scale = 0.03;
    this.playerAngle = 270;//agar spawn di atas


    this.obstacle = this.add.image(0, 0, "obstacle");
    this.obstacle.scale = 0.1;
    this.obsAngle = 90;//agar spawn di bawah

    this.angularVelocity = 100;

    this.empty = this.add.image(0, 0, "empty");
    this.particles = this.add.particles('smoke');

    this.emitter = this.particles.createEmitter({
      follow: this.empty,
      lifespan: 800,
      speed: 0,
      scale: 0.09,
      frequency: 40
    });

    this.textJudul = this.add.image(width / 2, -100, "title");
    this.textJudul.scale = 1 / 2;


    this.playButton = this.add.image(width / 2, height + 100, "play").setInteractive();
    this.playButton.on('pointerdown', () => {
      this.playButton.scale = 0.9;
    })
    this.playButton.on('pointerup', () => {
      this.scene.start("GameScene");
      this.playButton.scale = 1;
    })



    this.intro();

    this.planetRadius = 120;
    this.planetRadius2 = 120;
    this.planetRadius3 = 100;



  }

  intro() {
    this.tweens.add({
      targets: this.textJudul,
      y: 150,
      ease: 'Power1',
      duration: 1000,
      delay: 500,
    });
    this.tweens.add({
      targets: this.playButton,
      y: 600,
      ease: 'Power1',
      duration: 1000,
      delay: 1000,

    });

  }


  playerMovement(delta) {
    this.playerAngle += (this.angularVelocity * (delta / 1000));
    this.player.x = 170 + this.planetRadius * (Math.cos(this.playerAngle * Math.PI / 180));//cos sin dll harus pakai radian, sehingga sudut dikali sama  radian (1 degree =pi/180 rad)
    this.player.y = 350 + this.planetRadius * (Math.sin(this.playerAngle * Math.PI / 180));
    this.player.angle = this.playerAngle + 90;

    this.empty.x = 170 + this.planetRadius3 * (Math.cos(this.playerAngle * Math.PI / 180));
    this.empty.y = 350 + this.planetRadius3 * (Math.sin(this.playerAngle * Math.PI / 180));
  }
  obstacleMovement(delta) {
    this.obsAngle += (this.angularVelocity * (delta / 1000));
    this.obstacle.x = 170 + this.planetRadius2 * (Math.cos(this.obsAngle * Math.PI / 180));
    this.obstacle.y = 350 + this.planetRadius2 * (Math.sin(this.obsAngle * Math.PI / 180));
    this.obstacle.angle = (this.obsAngle) + 90;
  }

  update(time, delta) {
    this.playerMovement(delta);
    this.obstacleMovement(delta);
  }
}
