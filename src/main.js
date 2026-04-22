import { AssetLoader } from "./assets/assetLoader";
import { SceneManager } from "./Scene.js";

class Application {
  constructor() {
    this.sceneManager = new SceneManager();
    this.assetLoader = new AssetLoader();
  }
}
