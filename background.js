chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log('The color is green.');
//   });
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       // pageUrl: {hostEquals: 'developer.chrome.com'},
  //     })
  //     ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});

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