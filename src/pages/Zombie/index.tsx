/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-12-24 10:59:20
 * @LastEditors: didadida262
 * @LastEditTime: 2024-12-30 15:58:03
 */
import cn from "classnames";
import { useRef, useState } from "react";

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
      <div
        className={cn(
          "w-[180px] text-green-500 h-full py-5 ",
          "flex flex-col gap-y-4 items-center",
        )}
      >
        <button className="button" onClick={changeScene}>
          Change Scene
        </button>
        <button
          disabled={canMoveSprite}
          className="button"
          // onClick={moveSprite}
        >
          Toggle Movement
        </button>
        {/* <div className="spritePosition">
          Sprite Position:
          <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div> */}
        <button
          className="button"
          // onClick={addSprite}
        >
          Add New Sprite
        </button>
      </div>
    </div>
  );
}
