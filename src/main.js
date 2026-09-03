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
import { Piano } from "./Piano.js";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Monitor } from "./Monitor.js";

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";

document.body.appendChild(labelRenderer.domElement);

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
      this.assetLoader.robotBody,
    );
    this.robot.playAnimation();
    this.piano = new Piano(this.sceneManager.scene);

    this.lightManager.threeLightSetup(this.lightAxes);
    this.monitor = new Monitor(this.sceneManager.scene);

    const raycastController = new RaycastCameraController(
      this.cameraManager,
      this.sceneManager.scene,
      "",
      this.piano,
      this.robot,
      this.monitor.screen,
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
      this.robot?.animationMixer?.update(delta);
    });

    if (this.cameraManager.finishedMoving) {
      this.orbit.target.copy(this.cameraManager.target);
      this.cameraManager.finishedMoving = false;
    }

    this.cameraManager.update(delta);
    this.rendererManager.renderScene();
    labelRenderer.render(this.sceneManager.scene, this.cameraManager.camera);
  }
}

const app = new Application();
app.animate();
