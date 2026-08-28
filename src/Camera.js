import * as THREE from "three";

export class CameraManager {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.lookAt(0, 0, 0);
    this.camera.fov = 70;
    this.camera.updateProjectionMatrix();

    this.isMoving = false;
    this.moveProgress = 0;

    this.startPos = new THREE.Vector3();
    this.endPos = new THREE.Vector3();

    this.startLook = new THREE.Vector3();
    this.endLook = new THREE.Vector3();
    this.tempLook = new THREE.Vector3();

    this.currentCameraPosition = new THREE.Vector3();
  }

  moveTo(targetAxes, object) {
    this.isMoving = true;
    this.endPos.copy(targetAxes.position);
  }
  update(delta) {
    if (!this.isMoving) return;

    this.camera.position.lerp(this.endPos, 0.8);

    if (this.camera.position.distanceTo(this.endPos) < 0.1) {
      this.camera.position.copy(this.endPos);
      this.isMoving = false;
    }
  }
}
