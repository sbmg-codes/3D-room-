import { BoxGeometry, Clock, Mesh, MeshBasicMaterial } from "three";
import { AssetLoader } from "./assets/assetLoader";
import { CameraManager } from "./Camera.js";
import { RendererManager } from "./Renderer.js";
import { RoomScene } from "./Scene.js";
import { LightManager } from "./Lights.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUIManager } from "./Debug.js";
import { Robot } from "./Robot.js";
import { RaycastCameraController } from "./RaycastCameraController.js";

class Application {
  constructor() {
    this.sceneManager = new RoomScene();
    this.assetLoader = new AssetLoader();
    this.cameraManager = new CameraManager();
    this.rendererManager = new RendererManager(
      this.sceneManager.scene,
      this.cameraManager.camera,
    );
    this.orbit = new OrbitControls(
      this.cameraManager.camera,
      this.rendererManager?.renderer.domElement,
    );
    this.debugPanel = new GUIManager();
    this.lightAxes = null;
    this.cameraAxes = null;

    this.lightManager = new LightManager(
      this.sceneManager.scene,
      this.debugPanel,
    );
    this.clock = new Clock();

    this.init();
  }

  async init() {
    await this.load();
    this.lightAxes = this.assetLoader.lightAxes;
    this.cameraAxes = this.assetLoader.cameraAxes;
    this.cameraManager.camera.position.set(
      this.cameraAxes.position.x,
      this.cameraAxes.position.y,
      this.cameraAxes.position.z,
    );
    this.robot = new Robot(
      this.assetLoader.gltf.animations[0],
      this.assetLoader.robotEyes,
    );
    this.robot.playAnimation();

    this.lightManager.threeLightSetup(this.lightAxes);

    const raycastController = new RaycastCameraController(
      this.cameraManager,
      this.sceneManager.scene,
    );
  }

  async load() {
    const model = await this.assetLoader.loadRoom();

    this.sceneManager.scene.add(model);

    model.scale.set(1, 1, 1);

    return model;
  }

  animate() {
    const delta = this.clock.getDelta();
    requestAnimationFrame(() => {
      this.animate();
      this.robot.animationMixer?.update(delta);
    });
    this.orbit.update();
    this.cameraManager.update(delta);
    this.rendererManager.renderScene();
  }
}

const app = new Application();
app.animate();
// app.load();
