class Game extends Phaser.Scene {

  constructor() {
    super('GameScene');
  }


  create() {
    score = 0;

    this.background = this.add.image(0, 200, "background");
    this.planet = this.add.image(width / 2, height / 2, "planet");
    this.planet.scale = 2;

    this.planetRadius = 120;
    this.planetRadius2 = 120;
    this.planetRadius3 = 100;

    this.player = this.physics.add.image(300, 0, "player");
    this.player.scale = 0.03;
    this.playerAngle = 270;
    this.player.angle = this.playerAngle + 90;
    this.player.setSize(800, 800);//hitbox diperkecil

    this.obstacle = this.physics.add.image(0, 0, "obstacle");
    this.obstacle.scale = 0.1;
    this.obsAngle = 90;
    this.obstacle.setSize(300, 300);//hitbox diperkecil

    this.angularVelocityPlayer = 100;//angular velocity dipisah
    this.angularVelocityObs = 100;



    this.empty = this.add.image(0, 0, "empty");

    this.particles = this.add.particles('smoke');

    this.particles.createEmitter({
      follow: this.empty,
      lifespan: 800,
      speed: 0,
      scale: 0.09,
      frequency: 40,
    });

    this.start = false;
    this.pass = false;
    this.onAir = false;
    this.worldTime = 1;
    this.gameover = false;//supaya game tidak gerak saat gameover dan bump.mp3 hanya sekali main

    this.scoreText = this.add.text((width / 2) - 10, 0, score, { fill: "#fbfffa", font: '900 35px Courier' })
    this.guide = this.add.text((width / 2) - 60, (height / 2) - 10, "Tap to jump!", { fill: "#fbfffa", font: '900 18px Arial' })

    this.physics.add.collider(this.player, this.obstacle, () => {
      if (this.gameover == false) {
        this.sound.play("bump", { volume: 0.3 });
        this.gameover = true;
      }
      this.tweens.addCounter({
        duration: 1000,
        onComplete: () => {
          px = this.player.x;
          py = this.player.y;
          ox = this.obstacle.x;
          oy = this.obstacle.y;
          sp = this.player.angle;
          so = this.obstacle.angle;
          this.scene.start('ResultScene');
        }
      });

    }, null, this);
  }


  playerMovement(delta) {
    this.playerAngle += (this.angularVelocityPlayer * this.worldTime * (delta / 1000));
    this.player.x = 170 + this.planetRadius * (Math.cos(this.playerAngle / 180 * Math.PI));
    this.player.y = 350 + this.planetRadius * (Math.sin(this.playerAngle / 180 * Math.PI));
    this.player.angle = this.playerAngle + 90;

    this.empty.x = 170 + this.planetRadius3 * (Math.cos(this.playerAngle / 180 * Math.PI));
    this.empty.y = 350 + this.planetRadius3 * (Math.sin(this.playerAngle / 180 * Math.PI));


  }

  obstacleMovement1(delta) {
    this.obsAngle += (this.angularVelocityObs * (delta / 1000));
    //console.log(this.obsAngle);
    this.obstacle.x = 170 + this.planetRadius2 * (Math.cos(this.obsAngle / 180 * Math.PI));
    this.obstacle.y = 350 + this.planetRadius2 * (Math.sin(this.obsAngle / 180 * Math.PI));
    this.obstacle.angle = (this.obsAngle) + 90;
  }

  obstacleMovement2(delta) {
    this.obsAngle -= (this.angularVelocityObs * this.worldTime * (delta / 1000));
    //console.log(this.obsAngle);
    this.obstacle.x = 170 + this.planetRadius2 * (Math.cos(this.obsAngle / 180 * Math.PI));
    this.obstacle.y = 350 + this.planetRadius2 * (Math.sin(this.obsAngle / 180 * Math.PI));
    this.obstacle.angle = this.obsAngle + 90
  }

  startFunction() {
    this.start = true;
    this.angularVelocityObs = 80;
    this.guide.setAlpha(0);
    this.obstacle.flipX = true;
  }

  jump() {
    if (this.gameover == false) {
      this.sound.play("jump", { volume: 0.3 });
    }

    //onAir jadi true supaya tidak double jump
    this.onAir = true;
    this.tweens.addCounter({
      from: 120,
      to: 200,
      duration: 300 / this.worldTime,
      repeat: 0,
      yoyo: true,
      onUpdate: (value) => {
        this.planetRadius = value.targets[0].value;
      }

    })

    this.tweens.addCounter({
      from: 100,
      to: 150,
      duration: 300 / this.worldTime,
      repeat: 0,
      yoyo: true,
      onUpdate: (value) => {
        this.planetRadius3 = value.targets[0].value;
      }

    })

    //waktu 600ms sudah selesai, onAir false, karena karakter sudah menyentuh tanah
    this.tweens.addCounter({
      duration: 600 / this.worldTime,
      repeat: 0,
      onComplete: () => {
        this.onAir = false;
      }
    })
  }

  update(time, delta) {

    if (this.gameover == false) {

      if (this.start == false) {
        this.input.on('pointerdown', () => {
          this.startFunction();
        })
      }

      this.input.on('pointerdown', () => {
        if (this.onAir == false) {
          this.jump();
        }
      })

      this.playerMovement(delta);

      if (this.start == false) {
        this.obstacleMovement1(delta);
      }
      else {
        this.worldTime += 0.01 * (delta / 1000);
        this.obstacleMovement2(delta);
      }

      if (this.start == true) {
        if (this.player.angle > this.obstacle.angle) {
          if (this.pass == true) {
            score++;
            this.scoreText.setText(score);
            this.pass = false;
          }
        }
        else {
          this.pass = true;
        }
      }

    }
  }

}





      //score pake sudut karakter lewatin (>) sudut karakter plus point, trus di refresh saat sudut <180
      //double jump
      //world time buat var speedWorld--> referin ke time scale, speed dunia itu gini, misal loncat time 500ms--> 500 bagi speedWorld
      //speedDunia += 0.1*(delta/1000)
      //speedSudut*speedDunia
      //duration: 500/speedDunia
//Buat gambar lingkaran / planet jika diperlukan: https://opengameart.org/content/colorful-planets
//Character = Bisa pake dino chrome
//Obstacle = Bisa pake cactus / kotak
//Tanah = Bisa pake tanah google chrome / kotak
//https://own-games.com/customLibrary/listgames.php?pg=1