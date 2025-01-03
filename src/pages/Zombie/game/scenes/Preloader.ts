import { Scene } from "phaser";

export class Preloader extends Scene {
  platforms!: Phaser.Physics.Arcade.StaticGroup;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  stars!: Phaser.Physics.Arcade.Group;
  scoreText!: Phaser.GameObjects.Text;
  score!: number;
  bombs!: Phaser.Physics.Arcade.Group;
  gameOver!: Boolean;
  constructor() {
    super("Preloader");
    this.score = 0;
    this.gameOver = false;
  }
  collectStar(
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    star: any,
  ) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child: any) =>
        child.enableBody(Phaser.Math.FloatBetween(0.4, 0.8)),
      );

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }
  hitBomb(
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    bomb: Phaser.Physics.Arcade.Group,
  ) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    this.gameOver = true;
  }
  initPlayer() {
    this.player = this.physics.add.sprite(100, 450, "dude");
    // 碰撞黏度
    this.player.setBounce(0.2);
    // 边界检测
    this.player.setCollideWorldBounds(true);
    // 游戏物理碰撞检测
    this.physics.add.collider(this.player, this.platforms);
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }
  init() {
    // //  We loaded this image in our Boot Scene, so we can display it here
  }

  preload() {
    // //  Load the assets for the game - Replace with your own assets
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    //   this.scene.start("MainMenu");
    this.add.image(400, 300, "sky");
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    this.initPlayer();
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    this.stars.children.iterate((child: any) =>
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)),
    );
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    );
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      color: "#000",
    });

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this
        .hitBomb as unknown as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    );
  }
  // 每帧执行
  update() {
    if (this.gameOver) return;
    if (!this.cursors || !this.player) return;
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    console.log("this.cursors.up.isDown>>>", this.cursors.up.isDown);
    console.log(
      "this.player.body.touching.down>>>",
      this.player.body.touching.down,
    );
    // if (this.cursors.up.isDown && this.player.body.touching.down) {
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-330);
    }
  }
}
