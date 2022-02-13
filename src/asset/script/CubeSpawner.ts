import { Component, CssHtmlElementRenderer } from "the-world-engine";
import { Vector2, Vector3 } from "three";
import { b2BodyType } from "../../box2d.ts/build/box2d";
import { BoxCollider2D } from "./BoxCollider2D";
import { PhysicsProcessor } from "./PhysicsProcessor";
import { RigidBody2D } from "./RigidBody2D";

export class CubeSpawner extends Component {
    private _physicsProcessor: PhysicsProcessor|null = null;

    public onEnable() {
        this.engine.input.addOnKeyDownEventListener(this.onKeyDown);
    }

    public onDisable() {
        this.engine.input.removeOnKeyDownEventListener(this.onKeyDown);
    }

    private onKeyDown = (event: KeyboardEvent) => {
        if (event.key === " ") {
            this.engine.scene.addChildFromBuilder(
                this.engine.instantiater.buildGameObject(
                    "cube",
                    new Vector3(this.transform.position.x, this.transform.position.y, 0)
                )
                    .withComponent(CssHtmlElementRenderer, c => {
                        const div = document.createElement("div");
                        div.style.backgroundColor = "red";
                        c.setElement(div);
                        c.elementWidth = 10;
                        c.elementHeight = 10;
                    })
                    .withComponent(RigidBody2D, c => {
                        c.physicsProcessor = this._physicsProcessor!;
                        c.bodyType = b2BodyType.b2_dynamicBody;
                    })
                    .withComponent(BoxCollider2D, c => {
                        c.boxScale = new Vector2(10, 10);
                    })
            );
        }
    };

    public set physicsProcessor(value: PhysicsProcessor) {
        this._physicsProcessor = value;
    }
}