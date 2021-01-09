class Clipboard {
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

class Message {
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

console.log("inside popup.js");

const clipboard = new Clipboard();

let port = chrome.extension.connect({
  name: "Sample Communication",
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function (msg) {
  console.log("received: ", msg);
  clipboard.storeMessage(msg);
  // We have at least one element, delete the no clipboard elements div.
  const empty = document.getElementById("empty");
  empty.remove();
});


function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
  }
  navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
      console.error('Async: Could not copy text: ', err);
  });
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}