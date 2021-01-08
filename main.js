// console.log('inside main.js')

// class Clipboard { 
//   constructor() {
//     this.clipboard = []
//     this.div = document.createElement("div")
//     this.div.id = 'clipboard'
//   }

//   storeMessage = (msg) => { 
//     this.clipboard.push(msg)
//   }

//   displayMessages = () => {
//     console.log(this.clipboard)
//   }
// }

// class Message { 
//   constructor(msg) {
//     this.message = msg 
//     this.div = document.createElement("div")
//     this.div.id = 'cbmessage'
//     this.div.innerHTML = msg;
//   }
// }

// // event listener

// const clipboard = new Clipboard();

// // const main = document.getElementById('main');
// const main = document.body;

// main.prepend(clipboard.div);

// function onKeyDown(event) {
//   console.log('onKeyDown');
//   if (event.code === 'KeyC') {
//     console.log('was command c');
//     const selectedText = window.getSelection().toString();
//     if (selectedText.length > 0) {
//       const newMsg = new Message(selectedText);
//       clipboard.storeMessage(newMsg.message);
//       console.log(clipboard.displayMessages())
//       const cb = document.getElementById('clipboard');
//       cb.append(newMsg.div)
//     }
//   }
// }

// document.addEventListener("keydown", onKeyDown)

// console.log(document);


function onKeyDown(event) {
  console.log('onKeyDown');
  if (event.code === 'KeyC') {
    console.log('was command c');
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      console.log('about to send API request');

      chrome.runtime.sendMessage({message: selectedText}, function(response) {
        console.log(response);
      });
    }
  }
}

document.addEventListener("keydown", onKeyDown)

