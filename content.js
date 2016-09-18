var x = null; //x and y coordinates for mouse position
var y = null;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
			//display button

			//insert button to DOM
			var button = document.createElement('button');
			button.style.position = 'absolute';
			button.style.left = x + 'px';
			button.style.top = y + 'px';
			document.body.appendChild(button);
			console.log(message);

			// chrome.runtime.sendMessage({type: "submit"});


	}
);

document.onmouseup = function(e) {
  x = e.pageX;
  y = e.pageY;
  getSelectionText();
};


function getSelectionText() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	if (text != "") {
		alert("1");
		chrome.runtime.sendMessage({type: "text", text: text});
	}
	return text;
}
