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
  }

  moveTo(targetAxes) {
    this.isMoving = true;
    this.moveProgress = 0;

    this.startPos.copy(this.camera.position);

    this.camera.getWorldDirection(this.startLook);
    this.startLook.multiplyScalar(5).add(this.camera.position);

    const camOffset = new THREE.Vector3(1, 3, 3);
    camOffset.applyQuaternion(targetAxes.quaternion);

    this.endPos.copy(targetAxes.position).add(camOffset);

    const forward = new THREE.Vector3(0, 0, -5);
    forward.applyQuaternion(targetAxes.quaternion);

    this.endLook.copy(targetAxes.position).add(forward);
  }
  update(delta) {
    if (!this.isMoving) return;

    this.moveProgress += delta * 1.2;

    if (this.moveProgress >= 1) {
      this.moveProgress = 1;
      this.isMoving = false;
    }

    const t =
      this.moveProgress * this.moveProgress * (3 - 2 * this.moveProgress);

    this.camera.position.lerpVectors(this.startPos, this.endPos, t);

    this.tempLook.lerpVectors(this.startLook, this.endLook, t);
    this.camera.lookAt(this.tempLook);
  }
}
