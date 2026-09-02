import * as THREE from "three";
import { MessageBox } from "./MessageBox";
import "../static/style.css";

export class Robot {
  constructor(animation, model, body) {
    this.animation = animation;
    this.model = model;
    this.body = body;
    this.animationMixer = new THREE.AnimationMixer(model);
    this.showMessage();
  }
  playAnimation() {
    const action = this.animationMixer.clipAction(this.animation);
    this.animationMixer.timeScale = 0.5;
    action.play();
  }

  showMessage() {
    this.messageBox = new MessageBox([
      "Hello, welcome here",
      "I'm your assistant robot",
      "Hope you enjoy the site!",
    ]);
    this.messageBox.attachTo(this.body);
    this.messageBox.show();
  }
}
