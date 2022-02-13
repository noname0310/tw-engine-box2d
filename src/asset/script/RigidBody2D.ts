import { Component } from "the-world-engine";
import { PhysicsProcessor } from "./PhysicsProcessor";
import * as b2 from "../../box2d.ts/build/index";
import { BoxCollider2D } from "./BoxCollider2D";

export class RigidBody2D extends Component {
    public override readonly disallowMultipleComponent = true;

    private _physicsProcessor: PhysicsProcessor|null = null;
    private _bodyType: b2.BodyType = b2.BodyType.b2_dynamicBody;
    private _body: b2.Body|null = null;
    //private _transformChangedByPhysics: boolean = false;

    public awake() {
        const bodyDef = new b2.BodyDef();
        bodyDef.allowSleep = true;
        bodyDef.userData = this;
        bodyDef.type = this._bodyType;
        bodyDef.position.Set(
            this.transform.position.x * PhysicsProcessor.unitScalar,
            this.transform.position.y * PhysicsProcessor.unitScalar
        );
        bodyDef.angle = this.transform.eulerAngles.z;
        this._body = this._physicsProcessor!.addRigidBody(bodyDef);

        const fixtureDefList = this.gameObject.getComponents(BoxCollider2D)
            .map(c => c.createFixtureDef());
        for (const fixtureDef of fixtureDefList) {
            this._body!.CreateFixture(fixtureDef);
        }
    }

    // public onWorldMatrixUpdated() {
    //     if (this._transformChangedByPhysics) return;
    //     this._body!.GetTransform().SetPositionAngle(
    //         this.transform.position,
    //         this.transform.eulerAngles.z
    //     );
    // }

    public update() {
        this.updateTransformFromPhysics();
    }

    public updateTransformFromPhysics() {
        //this._transformChangedByPhysics = true;
        this.transform.position.x = this._body!.GetPosition().x / PhysicsProcessor.unitScalar;
        this.transform.position.y = this._body!.GetPosition().y / PhysicsProcessor.unitScalar;
        this.transform.eulerAngles.z = this._body!.GetAngle();
        //this._transformChangedByPhysics = false;
    }

    public set physicsProcessor(value: PhysicsProcessor) {
        this._physicsProcessor = value;
    }

    public set bodyType(value: b2.BodyType) {
        this._bodyType = value;
    }
}
