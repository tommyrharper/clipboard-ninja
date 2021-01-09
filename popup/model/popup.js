import { Clipboard } from './Clipboard.js'

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
