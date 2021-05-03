import {FreeCamera, Scene, Vector3} from "@babylonjs/core";
import {VuCore} from "./vu-core";

export class VuScene {

    private _sceneName: string;
    private _scene: Scene;
    get scene(): Scene {
        return this._scene;
    }

    get sceneName() {
        return this._sceneName;
    }

    constructor(sceneName: string) {
        this._sceneName = sceneName;
    }

    public sceneInit(): void  {
        this._scene = new Scene(VuCore.get().engine);
        //this.attachDefaultCamera();
    }

    public attachDefaultCamera(): void {
        const camera = new FreeCamera(this._sceneName + "_cam", new Vector3(0,1,-14), this._scene);
        camera.attachControl(VuCore.get().canvas, true);
        camera.setTarget(new Vector3(0,0,0));
    }

    public init(): void {}

    public showDefaultLoadingScreen(show : boolean) {
        if (show) {
            return VuCore.get().engine.displayLoadingUI();
        }
        VuCore.get().engine.hideLoadingUI();
    }

    public enablePointerLock(lock : boolean) {

        this._scene.onPointerDown = function() {
            if (lock)
                VuCore.get().engine.enterPointerlock();
            else
                VuCore.get().engine.exitPointerlock();
        }
    }

    public changeScene(name : string): void {
        if (name == "") return;
        console.debug("changing scene to: " + name);

        if (VuCore.get().scenes.has(name)){

            VuCore.get().currentSceneName = name;
            VuCore.get().scenes.get(name).sceneInit();
            VuCore.get().scenes.get(name).init();
            this._scene.dispose();
            console.debug("scene is disposed");

        }
    }

    public render(): void {
        this._scene.render();
    }

}
