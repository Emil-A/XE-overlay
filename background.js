// message.text is the highlighted text
//AJAX request for list of currencies, see if our selected text is in the list of currencies


// fetchCurrencies returns true or false depending on if selected text is found in the list of currencies
// send display msg if in list of currencies
var convertediso = "CAD";

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  fetchCurrencies(message.text, findSelectedTextMatch);
});



chrome.extension.getBackgroundPage().console.log('extension opened');



function fetchCurrencies(selectedText, callback) { //gets the list of currencies

  chrome.extension.getBackgroundPage().console.log("fetching currencies");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", chrome.extension.getURL('./currencies.json'), true);
  // xhr.open("GET", 'http://localhost:8080/currencies.json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var currenciesList = JSON.parse(xhr.responseText).currencies;

      chrome.extension.getBackgroundPage().console.log(currenciesList);
      callback(selectedText, currenciesList);

    }
  }
  xhr.send();
}



function findSelectedTextMatch(selectedText, currencies) {
  var currency = null;
  if (currency = findISOCode(selectedText, currencies)) { //set currency to that index
    chrome.extension.getBackgroundPage().console.log(currency);

    processMatchedText(currency, selectedText);

  } else if (currency = findCurrencyName(selectedText, currencies)) {
    //set currency to that index
    chrome.extension.getBackgroundPage().console.log(currency);
    processMatchedText(currency, selectedText);

  } else {
    return false;
  }
}


function processMatchedText(currency, selectedText) {
  if (isValid(currency)) { //verify if valid
    var originalamount = returnDigits(selectedText);
    //fetch XE here with callback
    fetchXE(currency.iso, originalamount, pushtoContent) //XE AJAX call, push to content, feed it original iso, originalamount, call pushtoContent()
  } else {
    return false; //if no match, go away
  }

}
//callback(originaliso, originalamount, resp.to[0].mid);
function pushtoContent(originaliso, originalamount, convertedamount) {

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      originaliso: originaliso,
      originalamount: originalamount,
      convertedamount: convertedamount,
      convertediso: convertediso
    }, function(response) {});
  });



}

function isValid(currency) { //returns true if obsolete, false if not
  return (!currency.is_obsolete);
}

function findISOCode(selectedText, currencies) { //returns iso matched with selected text, false if not
  chrome.extension.getBackgroundPage().console.log("finding matching ISO code");
  var found = false;
  for (var i = 0; i < currencies.length; i++) {
    if (selectedText.includes(currencies[i].iso)) {
      return currencies[i];
    }
  }
  return found;
}

function findCurrencyName(selectedText, currencies) { //returns iso if matched with currency text, false if not

  for (var i = 0; i < currencies.length; i++) {
    var found = false;
    if (selectedText.includes(currencies[i].currency_name)) {
      return currencies[i];
    }
    return found;
  }
  chrome.extension.getBackgroundPage().console.log("finding matching currency name");
}


function returnDigits(s) {
  return s.match(/\d+(?:\.\d+)?/).join(""); //returns integer of all the digits
}


function fetchXE(originaliso, originalamount, callback) { //logs amount and currency
  var xhr = new XMLHttpRequest();

  // var currency = "USD";
  // var amount = "100";
  user = "hackthenorth067";
  pass = "Waterloo1756";
  xhr.open("GET", "https://xecdapi.xe.com/v1/convert_from.json/?from=" + originaliso + "&to=" + convertediso + "&amount=" + originalamount, true);
  xhr.withCredentials = true;
  xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));

  xhr.onreadystatechange = function() {
    chrome.extension.getBackgroundPage().console.log(callback);

    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var resp = JSON.parse(xhr.responseText);
        var convertedamount = resp.to[0].mid;
        chrome.extension.getBackgroundPage().console.log(resp.to[0].mid);
        callback(originaliso, originalamount, convertedamount);
      } else {
        chrome.extension.getBackgroundPage().console.error("Request Failed. Check console for details.");
        var resp = JSON.parse(xhr.responseText);
      }

    }
  }
  xhr.send();
}