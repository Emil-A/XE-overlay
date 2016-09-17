function getExData(currency) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://xecdapi.xe.com/v1/convert_to.json/?to=CAD&from="+currency+"&amount=1000.00", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = JSON.parse(xhr.responseText);
      console.log(resp);
    }
  }
  xhr.send();
}

getExData();