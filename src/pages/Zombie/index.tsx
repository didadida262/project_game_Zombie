import cn from "classnames";
import { AUTO, Game } from "phaser";
import { useEffect, useRef, useState } from "react";

import { MainMenu } from "./game/scenes/MainMenu";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";

export default function Zombie() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };
  const changeScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;

      if (scene) {
        scene.changeScene();
      }
    }
  };
  return (
    <div
      className={cn("page-layout h-full", " flex justify-between items-start")}
    >
      <div className="min-w-[calc(100%_-_150px)]">
        <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
      </div>
      <div className="w-[120px] text-green-500 h-full py-5">
        <div>
          <button className="button" onClick={changeScene}>
            Change Scene
          </button>
        </div>
        <div>
          <button
            disabled={canMoveSprite}
            className="button"
            // onClick={moveSprite}
          >
            Toggle Movement
          </button>
        </div>
        <div className="spritePosition">
          Sprite Position:
          {/* <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre> */}
        </div>
        <div>
          <button
            className="button"
            // onClick={addSprite}
          >
            Add New Sprite
          </button>
        </div>
      </div>
    </div>
  );
}
