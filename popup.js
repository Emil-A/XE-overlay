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

          getExData(currency.iso, amount);
        }
      }
    }
  }
  xhr.send();
}

function getExData(currency, amount) {
  console.log("fetching EX data");
  var xhr = new XMLHttpRequest();

  //xhr.open(method, url, true)
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

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('test');

  button.addEventListener('click', function() {
    checkCurrency("USD 100");
    // getExData("USD", "100");
  });


});