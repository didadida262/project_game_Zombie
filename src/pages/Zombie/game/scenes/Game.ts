import { Scene } from "phaser";

import { EventBus } from "../EventBus";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera | undefined;
  background: Phaser.GameObjects.Image | undefined;
  gameText: Phaser.GameObjects.Text | undefined;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5);

    this.gameText = this.add
      .text(
        512,
        384,
        "Make something fun!\nand share it with us:\nsupport@phaser.io",
        {
          fontFamily: "Arial Black",
          fontSize: 38,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        },
      )
      .setOrigin(0.5)
      .setDepth(100);

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}