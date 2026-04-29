import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { lights, mod, modelDirection } from "three/tsl";

export class AssetLoader {
  constructor() {
    this.loader = new GLTFLoader();
    this.modelPath = "/models/room.glb";
    this.gltf = null;
    this.lightAxes = [];
    this.cameraAxes = null;
    this.robotEyes = null;
  }

  async loadRoom() {
    return new Promise((resolve, reject) => {
      this.loader.load(
        "/models/room.glb",
        (gltf) => {
          this.gltf = gltf;
          this.filterRobot(gltf.scene);
          gltf.scene.traverse((child) => {
            this.filterLights(child);
            this.filterCamera(child);
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

  filterLights(child) {
    if (child.name.includes("LIGHT")) {
      this.lightAxes.push(child);
    }
  }

  filterCamera(child) {
    if (child.name === "camera_axes") {
      this.cameraAxes = child;
    }
  }

  filterRobot(model) {
    this.robotBody = model.getObjectByName("robot_body");
    this.robotEyes = model.getObjectByName("robot_eyes");
    this.robotScreen = model.getObjectByName("robot_screen");
  }
}
