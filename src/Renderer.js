import * as THREE from "three";

export class RendererManager {
  constructor(scene, camera) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.scene = scene;
    this.camera = camera;
    this.zeroMargins();
  }

  zeroMargins() {
    document.body.style.margin = 0;
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }
}
