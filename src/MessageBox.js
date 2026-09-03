import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export class MessageBox {
  constructor(messages) {
    this.messages = messages;
    this.index = 0;

    // main bubble
    this.element = document.createElement("div");
    this.element.className = "robot-message";

    this.textDiv = document.createElement("div");
    this.textDiv.className = "message-text";
    this.textDiv.textContent = this.messages[this.index];

    this.tipDiv = document.createElement("div");
    this.tipDiv.className = "connecting-div";

    this.element.appendChild(this.textDiv);
    this.element.appendChild(this.tipDiv);

    this.prevBtn = document.createElement("button");
    this.nextBtn = document.createElement("button");
    this.btnsParent = document.createElement("div");
    this.btnsParent.className = "message-btns";

    this.prevBtn.textContent = "<";
    this.nextBtn.textContent = ">";

    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    this.btnsParent.appendChild(this.prevBtn);
    this.btnsParent.appendChild(this.nextBtn);

    this.object = new CSS2DObject(this.element);
    this.btns = new CSS2DObject(this.btnsParent);
  }

  next() {
    this.index = (this.index + 1) % this.messages.length;
    this.textDiv.textContent = this.messages[this.index];
  }

  prev() {
    this.index = (this.index - 1 + this.messages.length) % this.messages.length;
    this.textDiv.textContent = this.messages[this.index];
  }

  attachTo(head, offset) {
    head.add(this.object);
    this.object.position.set(0, 0, -0.6);

    head.add(this.btns);
    this.btns.position.set(0, -0.2, -1);
  }

  show() {
    this.element.style.visibility = "visible";
    this.element.style.opacity = 1;
    this.btnsParent.style.opacity = 1;
  }

  hide() {
    this.element.style.opacity = 0;
    this.btnsParent.style.opacity = 0;
    this.element.style.visibility = "hidden";
  }
}
