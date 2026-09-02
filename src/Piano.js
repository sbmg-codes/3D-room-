import * as TONE from "tone";
import * as THREE from "three";
import gsap from "gsap";

export class Piano {
  constructor(scene) {
    this.scene = scene;
    console.log(scene);
    this.keyNames = [
      "F",
      "G",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F#",
      "G#",
      "A#",
      "C#",
      "D#",
    ];
    this.keyMeshes = this.keyNames.map((keyname) => {
      return scene.getObjectByName(`${keyname}_KEY`);
    });

    this.isPianoClicked = false;
    this.mixer = new THREE.AnimationMixer();
    this.synth = new TONE.Synth().toDestination();
  }

  async playPianoSound(keyname) {
    if (TONE.getContext().state !== "running") {
      await TONE.start();
    }

    const key = keyname.split("_").at(0);

    const octaveBreakIndex = this.keyNames.indexOf("C");
    const keyIndex = this.keyNames.indexOf(key);

    const octave = keyIndex >= 0 && keyIndex < octaveBreakIndex ? 3 : 4;

    const note = `${key}${octave}`;
    this.synth.triggerAttackRelease(note, "8n");
  }

  playPianoAnimation(keyname) {
    const mesh = this.scene.getObjectByName(`${keyname}`);
    if (!mesh) {
      console.warn(`No mesh found for ${keyname}_KEY`);
      return;
    }

    gsap.killTweensOf(mesh.rotation);
    const startRotX =
      mesh.userData.restRotX ?? (mesh.userData.restRotX = mesh.rotation.x);

    gsap
      .timeline()
      .to(mesh.rotation, {
        x: startRotX + 0.05,
        duration: 0.08,
        ease: "power1.out",
      })
      .to(mesh.rotation, { x: startRotX, duration: 0.15, ease: "power1.in" });
  }
}
