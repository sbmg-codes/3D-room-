import * as THREE from "three";

export class Robot {
  constructor(animation, model) {
    this.animation = animation;
    this.model = model;
    this.animationMixer = new THREE.AnimationMixer(model);
  }

  playAnimation() {
    const action = this.animationMixer.clipAction(this.animation);
    action.play();
  }
}
