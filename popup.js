
chrome.extension.getBackgroundPage().console.log('foo');

function getEXData(currency, amount) {
  var xhr = new XMLHttpRequest();

  //xhr.open(method, url, true)
  user = "hackthenorth067";
  pass = "Waterloo1756";
  xhr.open("GET", "https://xecdapi.xe.com/v1/convert_from.json/?from="+currency+"&to=CAD&amount="+amount, true);
  xhr.withCredentials = true;
  xhr.setRequestHeader("Authorization", "Basic " + btoa(user+":"+pass));
  

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      chrome.extension.getBackgroundPage().console.log(resp.to.mid); //this
    } else {
      alert("Request Failed. Check console for details.");
      var resp = JSON.parse(xhr.responseText);
      chrome.extension.getBackgroundPage().console.log(resp.message);
    }
  }
  xhr.send();
  console.log(xhr.response);
}

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('test');

  button.addEventListener('click', function() {
    getEXData("USD", "100");
  });


});