import {
  AmbientLight,
  DirectionalLight,
  PointLight,
  RectAreaLight,
} from "three";

export class LightManager {
  constructor(scene) {
    this.scene = scene;
    this.lights = {};
    this.threeLightSetup();
  }

  threeLightSetup() {
    const mainLight = new RectAreaLight("white", 1, 10, 10);
    mainLight.position.set(0, 10, 0);
    mainLight.lookAt(0, 0, 0);
    this.lights.main = mainLight;
    this.scene.add(mainLight);

    const secondaryLight = new DirectionalLight("white", 1.2);
    secondaryLight.position.set(-5, 5, 5);
    secondaryLight.lookAt(0, 0, 0);
    this.lights.secondary = secondaryLight;
    this.scene.add(secondaryLight);

    const accentLight = new PointLight(0xff9966, 2, 20);
    accentLight.position.set(5, 3, -6);
    this.lights.accent = accentLight;
    this.scene.add(accentLight);

    const ambientLight = new AmbientLight("white", 0.4);
    this.lights.ambient = ambientLight;
    this.scene.add(ambientLight);
  }

  configLight(light, position, lookAtPosition) {
    light.position.set(...position);
    if (lookAtPosition) light.lookAt(...lookAtPosition);
  }
}
