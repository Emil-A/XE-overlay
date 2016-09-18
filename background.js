chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		var value;
		if(message.type == "text") {
			alert("2");
			//value = checkCurrency(message.text);
			alert("6"+checkCurrency(message.text));
			alert("7"+value.currency);
			if(value.currency != null && value.amount != null) {
				alert("3");// stops here!!
				//Respond open button
				chrome.runtime.sendMessage({type: "display"});
			}
		}

		if(message.type == "submit") {
			var exchange = getExdata(value.currency, value.amount);
			chrome.runtime.sendMessage({type: "final", exchange: exchange});
		}
	}
);

chrome.extension.getBackgroundPage().console.log('extension opened');

function checkCurrency(text) {
  var matches = text.match(/\d+/g);
  if (matches == null) return; // No numbers in input, do nothing
  var xhr = new XMLHttpRequest();
  xhr.open("GET", chrome.extension.getURL('./currencies.json'), true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var currenciesList = JSON.parse(xhr.responseText).currencies;
      for (var i = 0; i < currenciesList.length; i++) {
        var currency = currenciesList[i];
        if ((text.indexOf(currency.iso) !== -1 || text.indexOf(currency.currency_name) !== -1) && !currency.obsolete) {
          //Currency symbol in text, scrape all digits 
          var amount = text.match(/\d/g);
          amount = amount.join("");
          alert("returns!");

          var value = {currency: currency.iso, amount: amount};
          alert("8"+value.currency);
          return value;
        }
      }
    }
  }
  xhr.send();
}

function getExData(currency, amount) {
  chrome.extension.getBackgroundPage().console.log("fetching EX data");
  var xhr = new XMLHttpRequest();

  user = "hackthenorth067";
  pass = "Waterloo1756";
  xhr.open("GET", "https://xecdapi.xe.com/v1/convert_from.json/?from=" + currency + "&to=CAD&amount=" + amount, true);
  xhr.withCredentials = true;
  xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var resp = JSON.parse(xhr.responseText);
        chrome.extension.getBackgroundPage().console.log(xhr.response);
        chrome.extension.getBackgroundPage().console.log(resp.to[0].mid);
        chrome.extension.getBackgroundPage().console.log(resp.to.mid);
        return resp.to.mid;

      } else {
        alert("Request Failed. Check console for details.");
        var resp = JSON.parse(xhr.responseText);
        chrome.extension.getBackgroundPage().console.log(resp);
        chrome.extension.getBackgroundPage().console.log(resp.message);
      }

    }
  }
  console.log("sending xhr request");
  console.log(xhr.send());
  // xhr.send();
  // console.log(xhr.response);
}