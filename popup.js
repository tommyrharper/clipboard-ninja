class Clipboard {
  constructor() {
    this.clipboard = [];
    this.div = document.getElementById("clipboard");
    this.MAX_MESSAGES = 5;
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
}

class Message {
  constructor(msg) {
    this.message = msg;
    this.div = document.createElement("div");
    this.div.addEventListener("click", this.copyMessage, false);
    this.div.id = "message";
    this.div.innerHTML = msg;
  }

  copyMessage = () => {
    console.log(this.message);
  };
}

console.log("inside popup.js");

const clipboard = new Clipboard();

let port = chrome.extension.connect({
  name: "Sample Communication",
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function (msg) {
  console.log("received: ", msg);
  clipboard.storeMessage(msg);
});
