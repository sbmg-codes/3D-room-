import GUI from "lil-gui";

export class GUIManager {
  constructor() {
    this.gui = new GUI();
    this.folders = {};
  }

  createFolder(name) {
    if (!this.folders[name]) {
      this.gui.addFolder(name);
    }
  }

  add(object, prop, min, max, step, folder) {
    return folder.add(object, prop, min, max, step);
  }
}
