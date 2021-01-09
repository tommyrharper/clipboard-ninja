import { Clipboard } from './Classes/Clipboard.js'

const clipboard = new Clipboard();

let port = chrome.extension.connect({
  name: "Sample Communication",
});
port.postMessage("Hi BackGround from popup.js");
port.onMessage.addListener(function (msg) {
  console.log("Received from background.js: ", msg);
  clipboard.storeMessage(msg);
  // We have at least one element, delete the no clipboard elements div.
  const empty = document.getElementById("empty");
  empty.remove();
});
