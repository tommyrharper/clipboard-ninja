chrome.runtime.onInstalled.addListener(function() {});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log('message', request.message);

    chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected .....");
      port.onMessage.addListener(function(msg) {
           console.log("message recieved" + msg);
           port.postMessage(request.message);
      });
    })

    if (request.message) {
      sendResponse({result: "success!"});
    } else {
      sendResponse({result: "failure!"});
    }
  }
);