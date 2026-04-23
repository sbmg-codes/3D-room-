import { AmbientLight } from "three";

export class LightManager {
  constructor(scene) {
    this.scene = scene;
    this.ambientLight = new AmbientLight("pink", 1.3);
    scene.add(this.ambientLight);
  }
}
