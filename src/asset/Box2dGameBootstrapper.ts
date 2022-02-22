import { 
    Bootstrapper,
    Camera,
    CssHtmlElementRenderer,
    CssSpriteRenderer,
    EditorCameraController,
    EditorGridRenderer,
    GameObject,
    PlayerGridMovementController,
    PrefabRef,
    SceneBuilder,
    TrackCameraController
} from "the-world-engine";
import { Quaternion, Vector2, Vector3 } from "three";
import { BoxCollider2D } from "./script/collider/BoxCollider2D";
import { CubeSpawner } from "./script/helper/CubeSpawner";
import { LayerMask } from "./script/LayerMask";
import { PhysicsProcessor } from "./script/PhysicsProcessor";
import { RigidbodyType2D, RigidBody2D } from "./script/RigidBody2D";
import { TestLayer } from "./script/TestLayer";

export class Box2dGameBootstrapper extends Bootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.engine.instantiater;
        
        const physics_processor = new PrefabRef<PhysicsProcessor>();
        const cursor = new PrefabRef<GameObject>();

        // layer mask settings concept:

        // this.setting.layer.set(
        //     { "default", "player", "enemy", "projectile", "ground", "wall" },
        //     {
        //         "wall": { false, true, true, true, true, true },
        //         "ground": { false, true, true, true, true },
        //         "projectile": { false, true, true, true },
        //         "enemy": { false, true, true },
        //         "player": { false, true },
        //         "default": { false }
        //     }
        // );

        const layerMask = new LayerMask();

        layerMask.setLayerCollisionMatrix<TestLayer>({
            default: { default: false, player: false, enemy: false, projectile: false, ground: false, wall: false },
            player: { default: false, player: false, enemy: false, projectile: false, ground: false },
            enemy: { default: false, player: false, enemy: false, projectile: false },
            projectile: { default: false, player: false, enemy: false },
            ground: { default: false, player: false },
            wall: { default: false }
        });

        const wallLayerMask = layerMask.getLayers<TestLayer>().wall;
        
        console.log(wallLayerMask);
        
        return this.sceneBuilder

            .withChild(instantiater.buildGameObject("floor", new Vector3(0, -60, 0))
                .withComponent(CssHtmlElementRenderer, c => {
                    const div = document.createElement("div");
                    div.style.backgroundColor = "black";
                    c.element = div;
                    c.elementWidth = 180;
                    c.elementHeight = 5;
                })
                .withComponent(RigidBody2D, c => {
                    c.physicsProcessor = physics_processor.ref!;
                    c.bodyType = RigidbodyType2D.Static;
                })
                .withComponent(BoxCollider2D, c => {
                    c.size = new Vector2(180, 5);
                }))

            .withChild(instantiater.buildGameObject("floor2",
                new Vector3(90, 20, 0),
                new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2))
                .withComponent(CssHtmlElementRenderer, c => {
                    const div = document.createElement("div");
                    div.style.backgroundColor = "black";
                    c.element = div;
                    c.elementWidth = 180;
                    c.elementHeight = 5;
                })
                .withComponent(RigidBody2D, c => {
                    c.physicsProcessor = physics_processor.ref!;
                    c.bodyType = RigidbodyType2D.Static;
                })
                .withComponent(BoxCollider2D, c => {
                    c.size = new Vector2(180, 5);
                }))
            
            .withChild(instantiater.buildGameObject("floor3",
                new Vector3(-90, 20, 0),
                new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), -Math.PI / 2))
                .withComponent(CssHtmlElementRenderer, c => {
                    const div = document.createElement("div");
                    div.style.backgroundColor = "black";
                    c.element = div;
                    c.elementWidth = 180;
                    c.elementHeight = 5;
                })
                .withComponent(RigidBody2D, c => {
                    c.physicsProcessor = physics_processor.ref!;
                    c.bodyType = RigidbodyType2D.Static;
                })
                .withComponent(BoxCollider2D, c => {
                    c.size = new Vector2(180, 5);
                }))

            .withChild(instantiater.buildGameObject("cube", new Vector3(0, 10, 0))
                .withComponent(CssHtmlElementRenderer, c => {
                    const div = document.createElement("div");
                    div.style.backgroundColor = "#39C5BB";
                    c.element = div;
                    c.elementWidth = 10;
                    c.elementHeight = 10;
                })
                .withComponent(RigidBody2D, c => {
                    c.physicsProcessor = physics_processor.ref!;
                    c.bodyType = RigidbodyType2D.Dynamic;
                })
                .withComponent(BoxCollider2D, c => {
                    c.size = new Vector2(10, 10);
                    c.filter.categoryBits = 0x0001 << 1;
                    c.filter.maskBits = 0x0001;
                    c.filter.groupIndex = -10;
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
                    c.viewSize = 200;
                })
                .withComponent(TrackCameraController, c => {
                    c.enabled = false;
                    c.setTrackTarget(cursor.ref!);
                })
                .withComponent(EditorCameraController, c => {
                    c.maxViewSize = 1000;
                })
                .withComponent(EditorGridRenderer, c => {
                    c.renderHeight = 1000;
                    c.renderWidth = 1000;
                }))

            .withChild(instantiater.buildGameObject("physics_manager")
                .withComponent(PhysicsProcessor)
                .getComponent(PhysicsProcessor, physics_processor))
        ;
    }
}
