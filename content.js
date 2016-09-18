chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		if(message.type == "display") {
			//display button
			chrome.runtime.sendMessage({type: "submit"});
		}

		if(message.type == "final") {
			//display final exchange rate
			alert(message.exchange);
		}
	}
);

document.onmouseup = function(e) {
  var x = e.pageX;
  var y = e.pageY;
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

