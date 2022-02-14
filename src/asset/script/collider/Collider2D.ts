import { Component, ReadOnlyVector2 } from "the-world-engine";
import { RigidBody2D } from "../RigidBody2D";
import { Vector2 } from "three";
import { PhysicsMaterial2D } from "../PhysicsMaterial2D";
import * as b2 from "../../../box2d.ts/build/index";

export class Collider2D extends Component {
    public override readonly requiredComponents = [RigidBody2D];

    private _rigidBody: RigidBody2D|null = null;
    private _fixture: b2.Fixture|null = null;
    private _density = 1;
    private _material: PhysicsMaterial2D|null = null;
    private _isTrigger = false;
    private _offset: Vector2 = new Vector2();

    public awake() {
        this._rigidBody = this.gameObject.getComponent(RigidBody2D);
    }

    public onEnable() {
        this.createFixture();
    }

    public onDisable() {
        this.destroyFixture();
    }

    public onDestroy() {   
        this._material?.removeOnChangedEventListener(this.updateFixtureMaterialInfo);
    }

    private createFixture(): void {
        const physicsMaterial = this.getPhysicsMaterial();
        const fixtureDef = new b2.FixtureDef();
        fixtureDef.density = this._density;
        fixtureDef.friction = physicsMaterial.friction;
        fixtureDef.restitution = physicsMaterial.bounciness;
        fixtureDef.isSensor = this._isTrigger;
        fixtureDef.shape = this.createShape();
        this._fixture = this._rigidBody!.addFixture(fixtureDef);
    }

    private destroyFixture(): void {
        if (this._fixture) {
            this._rigidBody!.removeFixture(this._fixture);
            this._fixture = null;
        }
    }

    /** @internal */
    public updateFixture(): void {
        if (this._fixture) {
            this.destroyFixture();
            this.createFixture();
        }
    }

    /** @internal */
    public readonly updateFixtureMaterialInfo = () => {
        if (this._fixture) {
            const material = this.getPhysicsMaterial();
            this._fixture.SetFriction(material.friction);
            this._fixture.SetRestitution(material.bounciness);
        }
    };

    protected createShape(): b2.Shape {
        throw new Error("You should not use Collider2D directly but one of its subclasses. e.g. BoxCollider2D");
    }

    private getPhysicsMaterial(): PhysicsMaterial2D {
        if (this._material) return this._material;

        const rigidBodyMaterial = this._rigidBody!.material;
        if (rigidBodyMaterial) return rigidBodyMaterial;

        return new PhysicsMaterial2D();
    }

    public set density(value: number) {
        this._density = value;
        if (this._fixture) {
            this._fixture.SetDensity(value);
        }
    }

    public get density(): number {
        return this._density;
    }

    public set material(value: PhysicsMaterial2D|null) {
        this._material?.removeOnChangedEventListener(this.updateFixtureMaterialInfo);
        this._material = value;
        this.updateFixtureMaterialInfo();
        this._material?.addOnChangedEventListener(this.updateFixtureMaterialInfo);
    }

    public get material(): PhysicsMaterial2D|null {
        return this._material;
    }

    public set isTrigger(value: boolean) {
        this._isTrigger = value;
        if (this._fixture) {
            this._fixture.SetSensor(value);
        }
    }

    public set offset(value: ReadOnlyVector2) {
        this._offset.set(value.x, value.y);
        this.updateFixture();
    }

    public get offset(): ReadOnlyVector2 {
        return this._offset;
    }
}
