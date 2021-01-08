function onKeyDown(event) {
  console.log("onKeyDown");
  if (event.code === "KeyC") {
    console.log("was command c");
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      console.log("about to send API request");

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
