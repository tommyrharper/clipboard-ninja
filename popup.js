let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";console.log("test");'});
  });
};

class Clipboard { 
  constructor() {
    this.clipboard = []
    this.div = document.createElement("div")
    this.div.id = 'clipboard'
  }

  storeMessage = (msg) => { 
    this.clipboard.push(msg)
  }

  displayMessages = () => {
    console.log(this.clipboard)
  }
}

class Message { 
  constructor(msg) {
    this.message = msg 
    this.div = document.createElement("div")
    this.div.id = 'cbmessage'
    this.div.innerHTML = msg;
  }
}

console.log('inside popup.js');

const clipboard = new Clipboard();

const messageContainer = document.getElementById('messages-container');

const exampleMessage = document.getElementById('example-message');

let port = chrome.extension.connect({
  name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
  const newMsg = new Message(msg);
  // clipboard.storeMessage(newMsg.message);
  //exampleMessage.innerHTML = msg;
  // console.log("message received : " + msg);
  const newDiv = document.createElement('div');
  messageContainer.appendChild(newDiv);
  newDiv.innerHTML = msg
});