import { Component } from "the-world-engine";
import * as b2 from "../../box2d.ts/build/index";
import { RigidBody2D } from "./RigidBody2D";

export class PhysicsProcessor extends Component {
    public static readonly unitScalar = 0.1;
    private static readonly _velocityIterations = 8;
    private static readonly _positionIterations = 3;

    private _world: b2.World = new b2.World(new b2.Vec2(0, -9.81));

    public awake(): void {
        this._world.SetContactListener(
            new class extends b2.ContactListener {
                public override BeginContact(contact: b2.Contact<b2.Shape, b2.Shape>): void {
                    console.log(
                        "BeginContact",
                        (contact.GetFixtureA().GetBody().GetUserData() as RigidBody2D).gameObject.name,
                        (contact.GetFixtureB().GetBody().GetUserData() as RigidBody2D).gameObject.name);
                }

                public override EndContact(contact: b2.Contact<b2.Shape, b2.Shape>): void {
                    console.log(
                        "EndContact",
                        (contact.GetFixtureA().GetBody().GetUserData() as RigidBody2D).gameObject.name,
                        (contact.GetFixtureB().GetBody().GetUserData() as RigidBody2D).gameObject.name);
                }
            }
        );
    }

    public update(): void {
        this._world!.Step(
            this.engine.time.deltaTime,
            PhysicsProcessor._velocityIterations,
            PhysicsProcessor._positionIterations
        );
    }

    /** @internal */
    public addRigidBody(bodyDef: b2.BodyDef): b2.Body {
        return this._world.CreateBody(bodyDef);
    }

    /** @internal */
    public removeRigidBody(body: b2.Body) {
        this._world.DestroyBody(body);
    }
}
