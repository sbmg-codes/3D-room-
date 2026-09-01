import * as THREE from "three";

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

    // the camtarget (the synth / piano)
    this.target = undefined;
  }

  moveTo(object) {
    this.isMoving = true;

    this.startPos.copy(this.camera.position);
    this.endPos.set(-1, 6, 0);

    object.getWorldPosition(this.target);
  }

  update() {
    if (!this.isMoving) return;

    this.camera.position.lerp(this.endPos, 0.1);

    // Keep looking at the target while moving
    this.camera.lookAt(this.target);

    if (this.camera.position.distanceTo(this.endPos) < 0.1) {
      this.camera.position.copy(this.endPos);
      this.camera.lookAt(this.target);
      this.isMoving = false;
    }
  }
}
