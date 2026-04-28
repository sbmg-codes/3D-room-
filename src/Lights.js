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
    const mainLight = new DirectionalLight("ee778f", 2.7);
    mainLight.position.set(-1.1, 10, 0);
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

    if (this.debug) {
      const lightsFolder = this.debug.gui.addFolder("Lights");

      // Main light
      const mainFolder = lightsFolder.addFolder("Main");
      mainFolder.add(mainLight, "intensity", 0, 10, 0.1).name("Intensity");
      mainFolder.addColor(mainLight, "color").name("Color");
      mainFolder.add(mainLight.position, "x", -10, 10, 0.1).name("X");
      mainFolder.add(mainLight.position, "y", -10, 10, 0.1).name("Y");
      mainFolder.add(mainLight.position, "z", -10, 10, 0.1).name("Z");

      // Fill light
      const fillFolder = lightsFolder.addFolder("Fill");
      fillFolder.add(fillLight, "intensity", 0, 5, 0.1).name("Intensity");
      fillFolder.addColor(fillLight, "color").name("Color");

      // Rim light
      const rimFolder = lightsFolder.addFolder("Rim");
      rimFolder.add(rimLight, "intensity", 0, 5, 0.1).name("Intensity");
      rimFolder.addColor(rimLight, "color").name("Color");

      // Ambient light
      const ambientFolder = lightsFolder.addFolder("Ambient");
      ambientFolder
        .add(ambientLight, "intensity", 0, 2, 0.01)
        .name("Intensity");
      ambientFolder.addColor(ambientLight, "color").name("Color");
    }
  }
}
