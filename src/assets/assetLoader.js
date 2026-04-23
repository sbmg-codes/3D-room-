import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class AssetLoader {
  constructor() {
    this.loader = new GLTFLoader();
    this.modelPath = "/models/room.glb";
    this.model = null;
  }

  async loadRoom() {
    try {
      this.model = await this.loader.loadAsync(this.modelPath);
    } catch (err) {
      console.error(err);
    }
  }
}
