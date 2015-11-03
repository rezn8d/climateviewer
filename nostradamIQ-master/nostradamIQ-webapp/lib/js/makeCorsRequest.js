function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}
function makeCorsRequest(url) {
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    console.log('CORS not supported');
    return;
  }
  xhr.onload = function() {
    var response = xhr.responseText;
    console.log('Response from CORS request to ' + url + ': ' + getTitle(response));
    return response;
  };
  xhr.onerror = function() {
    console.log('Woops, there was an error making the CORS request.');
  };
  xhr.send();
}