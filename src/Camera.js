import GUI from "lil-gui";
import { GUIManager } from "./Debug";
import * as THREE from "three";
import { Vector3 } from "three/webgpu";

export class CameraManager {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.lookAt(1, 1, 1);
    this.camera.fov = 70;
    this.camera.updateProjectionMatrix();

    this.isMoving = false;
    this.moveProgress = 0;

    this.startPos = new THREE.Vector3();
    this.endPos = new THREE.Vector3();

    this.currentCameraPosition = new THREE.Vector3();

    // where the camera should look while/after moving
    this.target = new THREE.Vector3();
  }

  moveTo(object) {}
}
