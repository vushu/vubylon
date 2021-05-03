import type {Camera} from "@babylonjs/core";
declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        mozPointerLockElement?: Element;
        mozpointerlockchange?: Element;
        msPointerLockElement?: Element;
        webkitPointerLockElement?: Element;
        webkitFullscreenElement?: Element;
    }

    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}

export class PointerLock {

    lockPointer(canvas: HTMLCanvasElement, camera : Camera, isLocked : boolean) {


        var pointerlockchange = function () {
            var controlEnabled = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || false;

            // If the user is already locked
            if (!controlEnabled) {
                camera.detachControl(canvas);
                isLocked = false;
            } else {
                camera.attachControl(canvas);
                isLocked = true;
            }
        };


        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    }
}
