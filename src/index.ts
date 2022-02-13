import { Game, GlobalConfig } from "the-world-engine";
import { TestGameBootstrapper } from "./TestGameBootstrapper";
import DefaultSprite from "./asset/default_sprite.png";

GlobalConfig.defaultSpriteSrc = DefaultSprite;

function startTestGame(container: HTMLElement) {
    const game = new Game(container);
    game.run(TestGameBootstrapper);
    game.inputHandler.startHandleEvents();
}

startTestGame(document.getElementById("game_view")!);
