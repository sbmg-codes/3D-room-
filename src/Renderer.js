// RendererManager.js
import * as THREE from "three";

export class RendererManager {
  constructor(scene, camera) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.scene = scene;
    this.camera = camera;
    this.zeroMargins();

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // soft edges
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    // removed: physicallyCorrectLights (deprecated)
    // removed: renderer.shadowMap.mapSize (must be set per-light)

    window.addEventListener("resize", () => this.onResize());
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  zeroMargins() {
    document.body.style.margin = 0;
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }
}
