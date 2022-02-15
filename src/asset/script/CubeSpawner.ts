import { Component, CssHtmlElementRenderer } from "the-world-engine";
import { Vector2, Vector3 } from "three";
import { BoxCollider2D } from "./collider/BoxCollider2D";
import { PhysicsProcessor } from "./PhysicsProcessor";
import { RigidbodyType2D, RigidBody2D } from "./RigidBody2D";

export class CubeSpawner extends Component {
    private _physicsProcessor: PhysicsProcessor|null = null;

    public onEnable(): void {
        this.engine.input.addOnKeyDownEventListener(this._onKeyDown);
    }

    public onDisable(): void {
        this.engine.input.removeOnKeyDownEventListener(this._onKeyDown);
    }

    private _onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            this.engine.scene.addChildFromBuilder(
                this.engine.instantiater.buildGameObject(
                    "cube",
                    new Vector3(this.transform.position.x, this.transform.position.y, 0)
                )
                    .withComponent(CssHtmlElementRenderer, c => {
                        const div = document.createElement("div");
                        div.style.backgroundColor = "red";
                        div.innerText = "css is awesome";
                        div.style.fontSize = "5px";
                        c.setElement(div);
                        c.elementWidth = 10;
                        c.elementHeight = 10;
                    })
                    .withComponent(RigidBody2D, c => {
                        c.physicsProcessor = this._physicsProcessor!;
                        c.bodyType = RigidbodyType2D.Dynamic;
                        c.mass = 1;
                    })
                    .withComponent(BoxCollider2D, c => {
                        c.size = new Vector2(10, 10);
                    })
            );
        }
    };

    public set physicsProcessor(value: PhysicsProcessor) {
        this._physicsProcessor = value;
    }
}