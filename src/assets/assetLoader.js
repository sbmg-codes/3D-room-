import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class AssetLoader {
  constructor() {
    this.loader = new GLTFLoader();
    this.modelPath = "/models/room.glb";
    this.model = null;
  }

  async loadRoom() {
    return new Promise((resolve, reject) => {
      this.loader.load(
        "/models/room.glb",
        (gltf) => {
          gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.receiveShadow = true;
              child.castShadow = true;
            }
          });
          resolve(gltf.scene);
        },
        (xhr) => {
          console.log();
        },
        reject,
      );
    });
  }
}
