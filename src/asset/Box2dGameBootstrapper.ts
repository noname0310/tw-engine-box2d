import { 
    Bootstrapper,
    Camera,
    CssSpriteRenderer,
    EditorGridRenderer,
    GameObject,
    PlayerGridMovementController,
    PrefabRef,
    SceneBuilder,
    TrackCameraController
} from "the-world-engine";
import { Vector3 } from "three";

export class Box2dGameBootstrapper extends Bootstrapper {
    public run(): SceneBuilder {
        const instantiater = this.engine.instantiater;

        const cursor = new PrefabRef<GameObject>();
        
        return this.sceneBuilder

            .withChild(instantiater.buildGameObject("cursor")
                .withComponent(CssSpriteRenderer)
                .withComponent(PlayerGridMovementController)
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
