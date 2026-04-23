import { AssetLoader } from "./assets/assetLoader";
import { RoomScene } from "./Scene.js";

class Application {
  constructor() {
    this.sceneManager = new RoomScene();
    this.assetLoader = new AssetLoader();
  }
}
