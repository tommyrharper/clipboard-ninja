console.log('inside main.js')

class Clipboard { 
    constructor() {
      this.clipboard = []
      this.node = document.createElement("div")
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
      this.node = document.createElement("div")
    }
  }
  
  // event listener
  
  const clipboard = new Clipboard();
  
  function onKeyDown(event) {
    console.log('onKeyDown');
    if (event.code === 'KeyC') {
      console.log('was command c');
      clipboard.storeMessage(new Message('test message'));
      console.log(clipboard.displayMessages())
    }
  }
  
  document.addEventListener("keydown", onKeyDown)