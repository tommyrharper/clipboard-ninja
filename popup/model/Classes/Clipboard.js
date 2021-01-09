import { Message } from './Message.js';

export class Clipboard {
  constructor() {
    this.clipboard = [];
    this.div = document.getElementById("clipboard");
    this.MAX_MESSAGES = 5;
    // TODO: Enable this with dark mode
    //this.darkmode = document.getElementById("darkmode");
    //this.darkmode.addEventListener("click", this.toggleDarkMode);
  }

  storeMessage = (msg) => {
    if (this.clipboard.length >= this.MAX_MESSAGES) {
      this.clipboard.pop();
    }
    this.clipboard.unshift(new Message(msg));
    this.processMessage();
  };

  processMessage = () => {
    if (this.clipboard.length > 1) {
      this.deleteMessages();
    }
    this.renderMessages();
  };

  renderMessages = () => {
    for (const message of this.clipboard) {
      this.div.appendChild(message.div);
    }
  };

  deleteMessages = () => {
    const messages = document.querySelectorAll("#message");
    for (const msg of messages) {
      msg.remove();
    }
  };

  toggleDarkMode = () => {
    // TODO:
    // Keep track of what mode were in, and edit all elements appropriately
    // console.log("inside toggle");
    // const msg = document.querySelectorAll("message");
    // msg.style.border = "solid white 1px";
    // msg.style.color = "white";
    // const body = document.querySelector("body");
    // body.style.backgroundColor = "black";
    // const title = document.getElementById("title");
    // title.style.color = "white";
  };
}
