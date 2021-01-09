import { copyTextToClipboard } from './copyText.js';

export class Message {
  constructor(msg) {
    this.message = msg;
    this.div = document.createElement("div");
    this.div.addEventListener("click", this.copyMessage, false);
    this.div.addEventListener("mouseover", this.displayFull, false);
    this.div.id = "message";
    this.div.innerHTML = msg;
  }

  copyMessage = () => {
    console.log(this.message);
    copyTextToClipboard(this.message);
  };

  displayFull = () => {
    // TODO:
    // The idea is to make the box bigger if you hover over it.
    // Otherwise, we could have a default box size to make the design more clean.
    console.log("Display full text box");
  };
}