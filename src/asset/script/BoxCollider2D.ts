import { Component, CssHtmlElementRenderer, ReadOnlyVector2 } from "the-world-engine";
import { RigidBody2D } from "./RigidBody2D";
import * as b2 from "../../box2d.ts/build/index";
import { Vector2, Vector3 } from "three";
import { PhysicsProcessor } from "./PhysicsProcessor";

export class BoxCollider2D extends Component {
    public override readonly requiredComponents = [RigidBody2D];

    private _fixtureDef: b2.FixtureDef = new b2.FixtureDef();
    private _offset: Vector2 = new Vector2();
    private _boxScale: Vector2 = new Vector2();
    private _mass = 1;

    public createFixtureDef(): b2.FixtureDef {
        this._fixtureDef.density = this._mass;
        this._fixtureDef.friction = 0.5;
        this._fixtureDef.restitution = 0.5;
        const shape = new b2.PolygonShape();
        shape.SetAsBox(
            this._boxScale.x / 2 * PhysicsProcessor.unitScalar,
            this._boxScale.y / 2 * PhysicsProcessor.unitScalar,
            this._offset
        );
        this._fixtureDef.shape = shape;
        return this._fixtureDef;
    }

    public awake() {
        this.gameObject.addChildFromBuilder(
            this.engine.instantiater.buildGameObject("debug_box", new Vector3(this._offset.x, this._offset.y, 200))
                .withComponent(CssHtmlElementRenderer, c => {
                    const div = document.createElement("div");
                    div.style.border = "1px solid yellow";
                    div.style.backgroundColor = "rgba(0, 0, 0, 0)";
                    c.setElement(div);
                    c.elementHeight = this._boxScale.y;
                    c.elementWidth = this._boxScale.x;
                })
        );
    }

    public set offset(value: ReadOnlyVector2) {
        this._offset.set(value.x, value.y);
    }

    public set boxScale(value: ReadOnlyVector2) {
        this._boxScale.set(value.x, value.y);
    }

    public set mass(value: number) {
        this._mass = value;
    }
}
