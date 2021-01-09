function onKeyDown(event) {
  if (event.code === "KeyC") {
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {

      console.log("Sending API request from (content_script) main.js to (background_script) background.js");

      chrome.runtime.sendMessage(
        { message: selectedText },
        function (response) {
          console.log(response);
        }
      );
    }
  }
}

document.addEventListener("keydown", onKeyDown);
