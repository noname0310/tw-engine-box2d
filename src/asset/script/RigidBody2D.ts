import { Component, ReadOnlyVector2, WritableVector2 } from "the-world-engine";
import { PhysicsProcessor } from "./PhysicsProcessor";
import * as b2 from "../../box2d.ts/build/index";
import { PhysicsMaterial2D } from "./PhysicsMaterial2D";
import { Collider2D } from "./collider/Collider2D";
import { Vector2 } from "three";

export enum RigidbodyType2D {
    Dynamic,
    Kinematic,
    Static
}

export enum CollisionDetectionMode2D {
    Discrete,
    Continuous
}

export enum RigidbodySleepMode2D {
    NeverSleep,
    StartAwake,
    StartAsleep
}

export class RigidBody2D extends Component {
    public override readonly disallowMultipleComponent = true;

    private _physicsProcessor: PhysicsProcessor|null = null;
    private _body: b2.Body|null = null;

    private _bodyType: b2.BodyType = b2.BodyType.b2_dynamicBody; // Body Type
    private _material: PhysicsMaterial2D|null = null; // Material
    private _simulated = true; // Simulated
    // Use Auto Mass <-- idon know how implement this :/ https://stackoverflow.com/questions/14004179/box2d-set-mass-on-a-figure
    private _linearDrag = 0; // Linear Drag
    private _angularDrag = 0.05; // Angular Drag
    private _gravityScale = 1; // Gravity Scale
    private _collisionDetection: CollisionDetectionMode2D = CollisionDetectionMode2D.Discrete; // Collision Detection
    private _sleepMode: RigidbodySleepMode2D = RigidbodySleepMode2D.StartAwake; // Sleeping Mode
    private _freezeRotation = false; // Freeze Rotation

    private _velocity = new Vector2();

    public awake() {
        const bodyDef = new b2.BodyDef();
        bodyDef.userData = this;
        bodyDef.type = this._bodyType;
        bodyDef.enabled = this._simulated;
        bodyDef.linearDamping = this._linearDrag;
        bodyDef.angularDamping = this._angularDrag;
        bodyDef.gravityScale = this._gravityScale;
        bodyDef.bullet = this._collisionDetection === CollisionDetectionMode2D.Continuous;
        bodyDef.allowSleep = this._sleepMode !== RigidbodySleepMode2D.NeverSleep;
        bodyDef.awake = this._sleepMode === RigidbodySleepMode2D.StartAwake || 
            this._sleepMode === RigidbodySleepMode2D.NeverSleep;
        bodyDef.fixedRotation = this._freezeRotation;
        bodyDef.position.Set(
            this.transform.position.x * PhysicsProcessor.unitScalar,
            this.transform.position.y * PhysicsProcessor.unitScalar
        );
        bodyDef.angle = this.transform.eulerAngles.z;
        this._body = this._physicsProcessor!.addRigidBody(bodyDef);
    }

    public onDestroy() {
        this._physicsProcessor!.removeRigidBody(this._body!);
        this._body = null;
        this._material?.removeOnChangedEventListener(this._updateMaterialInfo);
    }

    public update() {
        this.transform.position.x = this._body!.GetPosition().x / PhysicsProcessor.unitScalar;
        this.transform.position.y = this._body!.GetPosition().y / PhysicsProcessor.unitScalar;
        this.transform.eulerAngles.z = this._body!.GetAngle();
    }
    
    /** @internal */
    public addFixture(fixture: b2.FixtureDef): b2.Fixture {
        return this._body!.CreateFixture(fixture);
    }

    /** @internal */
    public removeFixture(fixture: b2.Fixture) {
        this._body!.DestroyFixture(fixture);
    }

    private readonly _updateMaterialInfo = () => {
        const colliderList = this.gameObject.getComponents(Collider2D);
        for (let i = 0; i < colliderList.length; i++) {
            colliderList[i].updateFixtureMaterialInfo();
        }
    };

    public set physicsProcessor(value: PhysicsProcessor) {
        this._physicsProcessor = value;
    }

    public set bodyType(value: RigidbodyType2D) {
        switch (value) {
        case RigidbodyType2D.Dynamic:
            this._bodyType = b2.BodyType.b2_dynamicBody;
            break;
        case RigidbodyType2D.Kinematic:
            this._bodyType = b2.BodyType.b2_kinematicBody;
            break;
        case RigidbodyType2D.Static:
            this._bodyType = b2.BodyType.b2_staticBody;
            break;
        }
    }

    public set material(value: PhysicsMaterial2D|null) {
        this._material?.removeOnChangedEventListener(this._updateMaterialInfo);
        this._material = value;
        this._updateMaterialInfo();
        this._material?.addOnChangedEventListener(this._updateMaterialInfo);
    }

    public get material(): PhysicsMaterial2D|null {
        return this._material;
    }

    public set simulated(value: boolean) {
        this._simulated = value;
        this._body?.SetEnabled(value);
    }

    public set linearDrag(value: number) {
        this._linearDrag = value;
        this._body?.SetLinearDamping(value);
    }

    public set angularDrag(value: number) {
        this._angularDrag = value;
        this._body?.SetAngularDamping(value);
    }

    public set gravityScale(value: number) {
        this._gravityScale = value;
        this._body?.SetGravityScale(value);
    }

    public set collisionDetection(value: CollisionDetectionMode2D) {
        this._collisionDetection = value;
        this._body?.SetBullet(value === CollisionDetectionMode2D.Continuous);
    }

    public set sleepMode(value: RigidbodySleepMode2D) {
        this._sleepMode = value;
        this._body?.SetSleepingAllowed(value !== RigidbodySleepMode2D.NeverSleep);
        this._body?.SetAwake(value === RigidbodySleepMode2D.StartAwake ||
            value === RigidbodySleepMode2D.NeverSleep);
    }

    public set freezeRotation(value: boolean) {
        this._freezeRotation = value;
        this._body?.SetFixedRotation(value);
    }

    public get velocity(): ReadOnlyVector2 {
        if (this._body) {
            const velocity = this._body.GetLinearVelocity();
            this._velocity.set(velocity.x, velocity.y);
        }
        return this._velocity;
    }

    public set velocity(value: ReadOnlyVector2) {
        (this._velocity as WritableVector2).copy(value);
        if (this._body) {
            this._body.SetLinearVelocity(value);
        }
    }

    public get angularVelocity(): number {
        return this._body?.GetAngularVelocity() ?? 0;
    }

    public set angularVelocity(value: number) {
        if (this._body) {
            this._body.SetAngularVelocity(value);
        }
    }

    public get mass(): number {
        return this._body?.GetMass() ?? 0;
    }
}
