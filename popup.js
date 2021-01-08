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

const messagesArray = [];

let port = chrome.extension.connect({
  name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
  const newMsg = new Message(msg);
  // clipboard.storeMessage(newMsg.message);
  //exampleMessage.innerHTML = msg;
  // console.log("message received : " + msg);

  //       console.log(clipboard.displayMessages())
  //       const cb = document.getElementById('clipboard');
  //       cb.append(newMsg.div)

  // const messageDiv = document.createElement('div');
  // messageContainer.appendChild(messageDiv);
  // messageDiv.innerHTML = msg

  console.log(msg);

  messagesArray.push(msg);


  if (messagesArray.length === 6) {
    messagesArray.shift()
  }

  renderMessages(messagesArray);

});

function renderMessages(messagesArray) {
  console.log('inside renderMessages');
  console.log('messagesArray', messagesArray);
  // Clear our all messages
  if (messagesArray.length > 1) {
    // for (let i = 0; i < messagesArray.length - 1; i++) {
    //   let myobj = document.getElementById("message");
    //   console.log('myobj', myobj);
    //   myobj.remove();
    // }
    const messages = document.querySelectorAll('#message')
    console.log('messages', messages);
    for(const msg of messages) {
      console.log(msg)
      msg.remove();
    }
  }


  // Render
  for (const message of messagesArray) {
    console.log('inside for loop');
    console.log('message', message);
    const messageDiv = document.createElement('div');
    messageDiv.id = 'message'
    messageContainer.appendChild(messageDiv);
    messageDiv.innerHTML = message
  }

}