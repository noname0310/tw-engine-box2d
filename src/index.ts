import { Game, GlobalConfig } from "the-world-engine";
import { Box2dGameBootstrapper } from "./asset/Box2dGameBootstrapper";
import DefaultSprite from "./asset/source/default_sprite.png";

GlobalConfig.defaultSpriteSrc = DefaultSprite;

function startTestGame(container: HTMLElement) {
    const game = new Game(container);
    game.run(Box2dGameBootstrapper);
    game.inputHandler.startHandleEvents();
}

startTestGame(document.getElementById("game_view")!);
