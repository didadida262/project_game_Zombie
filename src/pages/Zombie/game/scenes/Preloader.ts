import { Scene } from "phaser";

export class Preloader extends Scene {
  platforms: Phaser.Physics.Arcade.StaticGroup | undefined;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  stars: Phaser.Physics.Arcade.Group | undefined;
  scoreText: Phaser.GameObjects.Text | undefined;
  score!: number;
  bombs: Phaser.Physics.Arcade.Group | undefined;
  gameOver: Boolean;
  constructor() {
    super("Preloader");
    this.score = 0;
    this.gameOver = false;
  }
  init() {
    // //  We loaded this image in our Boot Scene, so we can display it here
    // this.add.image(512, 384, "background");
    // //  A simple progress bar. This is the outline of the bar.
    // this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    // //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    // const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
    // //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    // this.load.on("progress", (progress: number) => {
    //   //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
    //   bar.width = 4 + 460 * progress;
    // });
  }

  preload() {
    // //  Load the assets for the game - Replace with your own assets

    // this.load.image("logo", "logo.png");
    // this.load.image("star", "star.png");
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  collectStar(
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    star: any,
  ) {
    if (!star.disableBody || !this.scoreText || !this.stars || !this.bombs)
      return;
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
    if (this.stars.countActive(true) === 0) {
      //   this.stars.children.iterate((child: any) => {
      //     if (child.enableBody) {
      //       child.enableBody(true, child.x, 0, true, true);
      //     }
      //   });
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
    if (!this.player) return;
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play("turn");
    this.gameOver = true;
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

    this.player = this.physics.add.sprite(100, 450, "dude");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

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

    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    // this.stars.children.iterate(function (
    //   child: Phaser.Structs.Set<Phaser.GameObjects.GameObject>,
    // ) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });
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
  update() {
    console.log("update>>>>");
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
