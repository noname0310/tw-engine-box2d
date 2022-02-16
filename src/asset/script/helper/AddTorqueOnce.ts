import { Component } from "the-world-engine";
import { ForceMode2D, RigidBody2D } from "../RigidBody2D";

export class AddTorqueOnce extends Component {
    public override requiredComponents = [RigidBody2D];

    public forceMode = ForceMode2D.Force;
    public torque = 1000;

    public awake(): void {
        const rigidbody = this.gameObject.getComponent(RigidBody2D);
        rigidbody!.addTorque(this.torque, this.forceMode);
        this.destroy();
    }
}