// // Add bubble to the top of the page.
// var bubbleDOM = document.createElement('div');
// bubbleDOM.setAttribute('class', 'selection_bubble');
// document.body.appendChild(bubbleDOM);

// // Lets listen to mouseup DOM events.
// document.addEventListener('mouseup', function (e) {
//   var selection = window.getSelection().toString();
//   if (selection.length > 0) {
//     renderBubble(e.clientX, e.clientY, selection);
//   }
//   console.log("mouse up");
// }, false);


// // Close the bubble when we click on the screen.
// document.addEventListener('mousedown', function (e) {
//   bubbleDOM.style.visibility = 'hidden';
//   console.log("mouse down");
// }, false);

// // Move that bubble to the appropriate location.
// function renderBubble(mouseX, mouseY, selection) {
//   bubbleDOM.innerHTML = selection;
//   bubbleDOM.style.top = mouseY + 'px';
//   bubbleDOM.style.left = mouseX + 'px';
//   bubbleDOM.style.visibility = 'visible';
// }

chrome.extension.getBackgroundPage().console.log('foo');

console.log("test");