import {VuCore} from "./vu-core";
import type {VuScene} from "./vu-scene";

export class VuApplication {

    public addScene(scene : VuScene) {
        if (scene.sceneName == "") { throw "Please add a name"; }

        if (VuCore.get().currentSceneName == "") {
            VuCore.get().currentSceneName = scene.sceneName;
            scene.sceneInit();
            scene.init();
        }

        console.debug("scene name " + scene.sceneName);
        VuCore.get().scenes.set(scene.sceneName, scene);
    }


    public run() {
        VuCore.get().engine.runRenderLoop(function(){
            if (VuCore.get().scenes.has(VuCore.get().currentSceneName)){
                VuCore.get().scenes.get(VuCore.get().currentSceneName).render();
            }
        });
    }

}

