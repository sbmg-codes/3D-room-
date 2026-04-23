import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { AssetLoader } from "./assets/assetLoader";
import { CameraManager } from "./Camera.js";
import { RendererManager } from "./Renderer.js";
import { RoomScene } from "./Scene.js";
import { LightManager } from "./Lights.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class Application {
  constructor() {
    this.sceneManager = new RoomScene();
    this.assetLoader = new AssetLoader();
    this.cameraManager = new CameraManager();
    this.rendererManager = new RendererManager(
      this.sceneManager.scene,
      this.cameraManager.camera,
    );
    this.cameraManager.camera.position.set(0, 2, 50);
    this.lightManager = new LightManager(this.sceneManager.scene);
    this.orbit = new OrbitControls(
      this.cameraManager.camera,
      this.rendererManager?.renderer.domElement,
    );

    this.addCube();
    this.init();
  }

  init() {
    this.load();
  }

  addCube() {}

  async load() {
    const model = await this.assetLoader.loadRoom();

    this.sceneManager.scene.add(model);

    model.scale.set(1, 1, 1);

    return model;
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.orbit.update();
    this.rendererManager.renderScene();
  }
}

const app = new Application();
app.animate();
// app.load();
