import * as THREE from "three";

export class Monitor {
  constructor(scene) {
    this.scene = scene;
    this.screen = scene.getObjectByName("screen");
    console.log(this.screen);
    this.videoPath = "/videos/portfolio-video (1).mp4";
    this.video = document.createElement("video");
    this.video.src = this.videoPath;
    this.video.loop = true;
    this.video.muted = true;
    this.video.playsInline = true;

    this.texture = new THREE.VideoTexture(this.video);
    this.texture.colorSpace = THREE.SRGBColorSpace;

    this.screen.material.map = this.texture;
    this.screen.material.needsUpdate = true;

    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;

    this.texture.repeat.y = -1;
    this.texture.offset.y = 1;
    this.video.play();
  }
}
