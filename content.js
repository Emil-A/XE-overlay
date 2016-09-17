document.onmouseup = function(e) {
  var x = e.pageX;
  var y = e.pageY;
  alert(getSelectionText());
};

function getSelectionText() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	chrome.runtime.sendMessage({type: "text", text: text});
	return text;
}

