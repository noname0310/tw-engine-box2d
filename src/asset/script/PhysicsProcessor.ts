import { Component } from "the-world-engine";
import * as b2 from "../../box2d.ts/build/index";

export class PhysicsProcessor extends Component {
    public static readonly unitScalar = 0.1;
    private static readonly _velocityIterations = 8;
    private static readonly _positionIterations = 3;

    private _world: b2.World|null = null;

    public awake() {
        this._world = new b2.World(new b2.Vec2(0, -9.81));
    }

    public update() {
        this._world!.Step(
            this.engine.time.deltaTime,
            PhysicsProcessor._velocityIterations,
            PhysicsProcessor._positionIterations
        );
    }

    public addRigidBody(bodyDef: b2.BodyDef): b2.Body {
        return this._world!.CreateBody(bodyDef);
    }
}
