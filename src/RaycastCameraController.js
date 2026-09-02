import * as THREE from "three";

export class RaycastCameraController {
  constructor(camera, scene, orbit, piano) {
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.camera = camera;
    this.scene = scene;
    this.piano = piano;

    window.addEventListener("pointerdown", (event) => {
      this.onPointerDown(event);
    });
  }

  onPointerDown(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera.camera);

    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true,
    );
    this.handlePianoClicks(intersects);
  }

  handlePianoClicks(intersects) {
    if (intersects.length > 0) {
      intersects.forEach((intersect) => {
        if (intersect.object.name === "piano_body") {
          this.camera.moveTo(intersect.object);
        }
        if (this.piano.keyMeshes.includes(intersect.object)) {
          this.piano.playPianoSound(intersect.object.name);
          this.piano.playPianoAnimation(intersect.object.name);
        }

        if (intersect.object.name === "robot_body") {
          this.camera.moveTo(intersect.object);
        }
      });
    }
  }
}
