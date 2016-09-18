var x = null; //x and y coordinates for mouse position
var y = null;
var exchangeinfo = {};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	//display button
	exchangeinfo = message;

	var overlay = document.createElement('div');
	overlay.id = 'currencyOverlay';
	overlay.style.width = "190px";
	overlay.style.height = "40px";
	var image = document.createElement('img');
	image.setAttribute("src", "images/38x38.png");
	overlay.style.position = 'absolute';
	overlay.style.left = x + 30 + 'px';
	overlay.style.top = y + 20 + 'px';
	overlay.style.backgroundColor = "#ADD8E6";
	overlay.style.borderRadius = "10px";
	overlay.innerHTML = exchangeinfo.originalamount + " " + exchangeinfo.originaliso + " = " + exchangeinfo.convertedamount + " " + exchangeinfo.convertediso;
	document.body.appendChild(overlay);
	overlay.appendChild(image);



	//insert button to DOM
	// console.log('inserting image to DOM');
	// var button = document.createElement('img');
	// button.setAttribute("src", "images/38x38.png");
	// button.id = 'currencyOverlay';
	// button.style.position = 'absolute';
	// button.style.left = x + 5 + 'px';
	// button.style.top = y + 5 + 'px';
	// document.body.appendChild(button);
	// console.log(message); //it works fam
	// // chrome.runtime.sendMessage({type: "submit"});

	// // var button = document.getElementById('currencyOverlay');

	// button.onclick = function() {
	// 	var button = document.getElementById('currencyOverlay');
	// 	button.parentNode.removeChild(button);

	// 	var div = document.createElement('div');
	// 	div.id = 'currencyOverlay2';
	// 	div.style.left = x + 5 + 'px';
	// 	div.style.top = y + 5 + 'px';
	// 	div.innerHTML = "test";
	// 	// exchangeinfo.originalamount + " " + exchangeinfo.originaliso + " = " exchangeinfo.convertedamount + " " + exchangeinfo.convertediso;
	// }


});
// var button = document.getElementById('currencyOverlay');


document.onmouseup = function(e) {
	x = e.pageX;
	y = e.pageY;
	getSelectionText();
};

document.onmousedown = function(e) {
	//if (!e.target != document.getElementById('currencyOverlay')) {
	console.log('removing button')
	var button = document.getElementById('currencyOverlay');
	if (button) {
		button.parentNode.removeChild(button);
	}
 	//}
 }

function getSelectionText() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	if (text != "") {
		// alert("content.js is running properly");

		chrome.runtime.sendMessage({
			type: "text",
			text: text
		});
		window.getSelection().removeAllRanges();
	}
	return text;
}