import {
  AmbientLight,
  DirectionalLight,
  PointLight,
  RectAreaLight,
} from "three";

export class LightManager {
  constructor(scene) {
    this.scene = scene;
    this.ambientLight = new AmbientLight("white", 1);
    this.ambientLight.castShadow = true;
    this.threeLightSetup();
  }

  threeLightSetup() {
    const mainLight = new RectAreaLight("white", 3, 10, 10);
    mainLight.position.set(0, 10, 0);
    mainLight.lookAt(0, 0, 0);
    mainLight.position.set;
    this.scene.add(mainLight);
  }
}
