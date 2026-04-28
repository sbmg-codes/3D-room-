import GUI from "lil-gui";

export class GUIManager {
  constructor() {
    this.gui = new GUI();
    this.folders = {};
  }

  createFolder(name) {
    if (!this.folders[name]) {
      this.folders[name] = this.gui.addFolder(name);
    }
    return this.folders[name];
  }

  add(object, prop, min, max, step, folderName) {
    const folder = this.createFolder(folderName);
    return folder.add(object, prop, min, max, step);
  }
}
