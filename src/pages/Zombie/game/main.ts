import { AUTO, Game } from "phaser";

// import { Boot } from "./scenes/Boot";
// import { Game as MainGame } from "./scenes/Game";
// import { GameOver } from "./scenes/GameOver";
// import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  backgroundColor: "#028af8",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
  // scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
  scene: [Preloader],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
