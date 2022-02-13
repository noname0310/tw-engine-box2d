import { 
    Bootstrapper,
    Camera,
    CssHtmlElementRenderer,
    CssSpriteRenderer,
    EditorGridRenderer,
    GameObject,
    PlayerGridMovementController,
    PrefabRef,
    SceneBuilder,
    TrackCameraController
} from "the-world-engine";
import { Vector2, Vector3 } from "three";
import { b2BodyType } from "../box2d.ts/build/box2d";
import { BoxCollider2D } from "./script/BoxCollider2D";
import { CubeSpawner } from "./script/CubeSpawner";
import { PhysicsProcessor } from "./script/PhysicsProcessor";
import { RigidBody2D } from "./script/RigidBody2D";

export class Box2dGameBootstrapper extends Bootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.engine.instantiater;

        const cursor = new PrefabRef<GameObject>();
        const physics_processor = new PrefabRef<PhysicsProcessor>();
        
        return this.sceneBuilder

            .withChild(instantiater.buildGameObject("physics_manager")
                .withComponent(PhysicsProcessor)
                .getComponent(PhysicsProcessor, physics_processor))

            .withChild(instantiater.buildGameObject("floor", new Vector3(0, -40, 0))
                .withComponent(CssHtmlElementRenderer, c => {
                    const div = document.createElement("div");
                    div.style.backgroundColor = "black";
                    c.setElement(div);
                    c.elementWidth = 150;
                    c.elementHeight = 5;
                })
                .withComponent(RigidBody2D, c => {
                    c.physicsProcessor = physics_processor.ref!;
                    c.bodyType = b2BodyType.b2_staticBody;
                })
                .withComponent(BoxCollider2D, c => {
                    c.boxScale = new Vector2(150, 5);
                }))

            .withChild(instantiater.buildGameObject("cube", new Vector3(0, 10, 0))
                .withComponent(CssHtmlElementRenderer, c => {
                    const div = document.createElement("div");
                    div.style.backgroundColor = "red";
                    c.setElement(div);
                    c.elementWidth = 10;
                    c.elementHeight = 10;
                })
                .withComponent(RigidBody2D, c => {
                    c.physicsProcessor = physics_processor.ref!;
                    c.bodyType = b2BodyType.b2_dynamicBody;
                })
                .withComponent(BoxCollider2D, c => {
                    c.boxScale = new Vector2(10, 10);
                }))

            .withChild(instantiater.buildGameObject("cursor")
                .withComponent(CssSpriteRenderer)
                .withComponent(PlayerGridMovementController)
                .withComponent(CubeSpawner, c => {
                    c.physicsProcessor = physics_processor.ref!;
                })
                .getGameObject(cursor))
            
            .withChild(instantiater.buildGameObject("camera", new Vector3(0, 0, 100))
                .withComponent(Camera, c => {
                    c.viewSize = 100;
                })
                .withComponent(TrackCameraController, c => {
                    c.setTrackTarget(cursor.ref!);
                })
                .withComponent(EditorGridRenderer))
        ;
    }
}
