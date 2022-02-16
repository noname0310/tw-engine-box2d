import { Component } from "the-world-engine";
import { Vector2 } from "three";
import { ForceMode2D, RigidBody2D } from "../RigidBody2D";

export class AddForceOnce extends Component {
    public override requiredComponents = [RigidBody2D];

    public forceMode = ForceMode2D.Force;
    public readonly force = new Vector2(0, 100);

    public awake(): void {
        const rigidbody = this.gameObject.getComponent(RigidBody2D);
        rigidbody!.addForce(this.force, this.forceMode);
        this.destroy();
    }
}