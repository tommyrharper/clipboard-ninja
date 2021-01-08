// Pure JS
// const contents = document.getElementById('contents');
// contents.parentNode.removeChild(contents);

// jQuery
var contents = $('#contents');
var contentsParent = contents.parent();
contents.remove();
const imgUrl = chrome.extension.getURL('./stoicquote2.jpg');
contentsParent.prepend('<img src="' + imgUrl + '" alt="">');
contentsParent.prepend('<h1>Use your time wisely, each moment is precious.</h1>');

contentsParent.addClass("title");