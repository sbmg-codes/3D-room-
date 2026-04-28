import {
  AmbientLight,
  DirectionalLight,
  PointLight,
  RectAreaLight,
} from "three";

export class LightManager {
  constructor(scene, debug) {
    this.scene = scene;
    this.lights = {};

    this.debug = debug;
  }

  threeLightSetup() {
    const mainLight = new DirectionalLight(0xffff5e6, 3.5);
    mainLight.position.set(0, 10, 0);
    mainLight.lookAt(0, 0, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;

    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 30;

    mainLight.shadow.camera.left = -8;
    mainLight.shadow.camera.right = 8;
    mainLight.shadow.camera.top = 8;
    mainLight.shadow.camera.bottom = -8;

    mainLight.shadow.bias = -0.001;
    mainLight.shadow.radius = 8;
    this.lights.main = mainLight;

    this.scene.add(mainLight);

    const fillLight = new DirectionalLight(0xd0e7ff, 0.8);
    fillLight.position.set(-4, 4, 3);
    this.scene.add(fillLight);

    const rimLight = new DirectionalLight(0xffd0a0, 0.5);
    rimLight.position.set(-2, 6, -8);
    this.lights.rim = rimLight;
    this.scene.add(rimLight);

    const ambientLight = new AmbientLight(0xfff5e6, 0.3);
    this.lights.ambient = ambientLight;
    this.scene.add(ambientLight);

    this.debug.gui.addFolder("Lights");
  }
}
