import {Engine, Scene} from "@babylonjs/core";
import type {VuScene} from "./vu-scene";

export class VuCore {
    public static instance: VuCore;
    public engine : Engine;
    public canvas : HTMLCanvasElement;

    public _scenes: Map<string, VuScene>;

    get scenes() {
        return this._scenes;
    }


    public currentSceneName: string;

    private constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.engine = new Engine(this.canvas);
        this._scenes = new Map<string, VuScene>();
        this.currentSceneName = "";
        window.addEventListener("resize", function () {
            VuCore.get().engine.resize();
        });
    }

    public static get() {
        if (!VuCore.instance) {
            VuCore.instance = new VuCore();
        }
        return VuCore.instance;
    }

}
