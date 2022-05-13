const config = {
  type: Phaser.AUTO,
  width: 350,
  height: 700,
  pixelArt: true,

  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [Home, Game, Result]
};

var score;//menyimpan score
var width = config.width;
var height = config.height;
new Phaser.Game(config);
var isPlayed = false;//game sudah pernah dibuka belum (untuk musik tidak dimainkan berkali kali)
//untuk menyimpan state player untuk di pass ke result
var px = 0;
var py = 0;
var ox = 0;
var oy = 0;
var sp = 0;
var so = 0;


 //https://arifz.medium.com/phaser-3-tricks-make-circle-image-2b8e0de609de