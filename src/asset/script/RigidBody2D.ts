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
    private _useAutoMass = false; // https://stackoverflow.com/questions/14004179/box2d-set-mass-on-a-figure
    private _mass = 1; // Mass
    private _linearDrag = 0; // Linear Drag
    private _angularDrag = 0.05; // Angular Drag
    private _gravityScale = 1; // Gravity Scale
    private _collisionDetection: CollisionDetectionMode2D = CollisionDetectionMode2D.Discrete; // Collision Detection
    private _sleepMode: RigidbodySleepMode2D = RigidbodySleepMode2D.StartAwake; // Sleeping Mode
    private _freezeRotation = false; // Freeze Rotation

    private readonly _centerOfMass = new Vector2(NaN, NaN);
    private readonly _worldCenterOfMass = new Vector2(NaN, NaN);
    private _inertia = NaN;
    private readonly _velocity = new Vector2();

    private readonly _attachedColliders: Collider2D[] = [];

    public awake(): void {
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
        const colliderList = this.gameObject.getComponents(Collider2D);
        for (let i = 0; i < colliderList.length; i++) {
            colliderList[i].createFixture(this);
        }

        if (isNaN(this._centerOfMass.x)) {
            const centerOfMass = this._body.GetLocalCenter();
            this._centerOfMass.set(centerOfMass.x, centerOfMass.y);
        }
        if (isNaN(this._inertia)) {
            this._inertia = this._body.GetInertia();
        }
        
        this.updateMassData();
    }

    public onDestroy(): void {
        this._physicsProcessor!.removeRigidBody(this._body!);
        this._body = null;
        this._material?.removeOnChangedEventListener(this._updateMaterialInfo);
    }

    public update(): void {
        this.transform.position.x = this._body!.GetPosition().x / PhysicsProcessor.unitScalar;
        this.transform.position.y = this._body!.GetPosition().y / PhysicsProcessor.unitScalar;
        this.transform.eulerAngles.z = this._body!.GetAngle();
    }
    
    /** @internal */
    public addFixture(fixtureDef: b2.FixtureDef, collider: Collider2D): b2.Fixture {
        const fixture = this._body!.CreateFixture(fixtureDef);
        this._attachedColliders.push(collider);

        //update center of mass
        const centerOfMass = this._body!.GetLocalCenter();
        this._centerOfMass.set(centerOfMass.x, centerOfMass.y);


        return fixture;
    }

    /** @internal */
    public removeFixture(fixture: b2.Fixture, collider: Collider2D): void {
        const index = this._attachedColliders.findIndex(c => c.instanceId === collider.instanceId);
        if (index >= 0) {
            this._attachedColliders.splice(index, 1);
        }
        this._body!.DestroyFixture(fixture);
    }

    private readonly _updateMaterialInfo = () => {
        const colliderList = this._attachedColliders;
        for (let i = 0; i < colliderList.length; i++) {
            colliderList[i].updateFixtureMaterialInfo();
        }
    };

    public set physicsProcessor(value: PhysicsProcessor) {
        this._physicsProcessor = value;
    }

    public get bodyType(): RigidbodyType2D {
        switch (this._bodyType) {
        case b2.BodyType.b2_staticBody:
            return RigidbodyType2D.Static;
        case b2.BodyType.b2_kinematicBody:
            return RigidbodyType2D.Kinematic;
        case b2.BodyType.b2_dynamicBody:
            return RigidbodyType2D.Dynamic;
        }
        throw new Error("Unknown body type");
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

    public get material(): PhysicsMaterial2D|null {
        return this._material;
    }

    public set material(value: PhysicsMaterial2D|null) {
        this._material?.removeOnChangedEventListener(this._updateMaterialInfo);
        this._material = value;
        this._updateMaterialInfo();
        this._material?.addOnChangedEventListener(this._updateMaterialInfo);
    }

    public get simulated(): boolean {
        return this._simulated;
    }

    public set simulated(value: boolean) {
        this._simulated = value;
        this._body?.SetEnabled(value);
    }

    private readonly _massData: b2.MassData = new b2.MassData();

    private updateMassData(): void {
        if (!this._body) return;
        const massData = this._massData;
        this._body.GetMassData(massData);
        if (!this._useAutoMass) massData.mass = this._mass;
        massData.center.Copy(this._centerOfMass).SelfMul(PhysicsProcessor.unitScalar);
        massData.I = this._inertia;
        this._body.SetMassData(massData);
    }

    public get useAutoMass(): boolean {
        return this._useAutoMass;
    }

    public set useAutoMass(value: boolean) {
        this._useAutoMass = value;
        if (this._body) {
            if (this._useAutoMass) this._mass = this._body.GetMass();
        }
        this.updateMassData();
    }

    public get mass(): number {
        if (this._useAutoMass) {
            if (this._body) return this._body.GetMass();
            throw new Error("Cannot get mass when body is not created");
        }
        return this._mass;
    }

    public set mass(value: number) {
        if (this._useAutoMass) throw new Error("Cannot set mass when useAutoMass is true");
        this._mass = value;
        this.updateMassData();
    }

    public get drag(): number {
        return this._linearDrag;
    }

    public set drag(value: number) {
        this._linearDrag = value;
        this._body?.SetLinearDamping(value);
    }

    public get angularDrag(): number {
        return this._angularDrag;
    }

    public set angularDrag(value: number) {
        this._angularDrag = value;
        this._body?.SetAngularDamping(value);
    }

    public get gravityScale(): number {
        return this._gravityScale;
    }

    public set gravityScale(value: number) {
        this._gravityScale = value;
        this._body?.SetGravityScale(value);
    }

    public get collisionDetection(): CollisionDetectionMode2D {
        return this._collisionDetection;
    }

    public set collisionDetection(value: CollisionDetectionMode2D) {
        this._collisionDetection = value;
        this._body?.SetBullet(value === CollisionDetectionMode2D.Continuous);
    }

    public get sleepMode(): RigidbodySleepMode2D {
        return this._sleepMode;
    }

    public set sleepMode(value: RigidbodySleepMode2D) {
        this._sleepMode = value;
        this._body?.SetSleepingAllowed(value !== RigidbodySleepMode2D.NeverSleep);
        this._body?.SetAwake(value === RigidbodySleepMode2D.StartAwake ||
            value === RigidbodySleepMode2D.NeverSleep);
    }

    public get freezeRotation(): boolean {
        return this._freezeRotation;
    }

    public set freezeRotation(value: boolean) {
        this._freezeRotation = value;
        this._body?.SetFixedRotation(value);
    }

    public get centerOfMass(): ReadOnlyVector2 {
        if (isNaN(this._centerOfMass.x)) {
            throw new Error("Cannot get center of mass when body is not created");
        }
        return this._centerOfMass;
    }

    public set centerOfMass(value: ReadOnlyVector2) {
        (this._centerOfMass as WritableVector2).copy(value);
        this.updateMassData();
    }

    public get worldCenterOfMass(): ReadOnlyVector2 {
        if (this._body) {
            const center = this._body.GetWorldCenter();
            this._worldCenterOfMass.set(center.x, center.y);
        }
        if (isNaN(this._worldCenterOfMass.x)) {
            throw new Error("Cannot get world center of mass when body is not created");
        }
        return this._worldCenterOfMass;
    }

    public get inertia(): number {
        return this._inertia;
    }

    public set inertia(value: number) {
        this._inertia = value;
        this.updateMassData();
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

    public get attachedColliderCount(): number {
        return this._attachedColliders.length;
    }
}
