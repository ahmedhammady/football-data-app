function getData(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open('GET', 'https://client-tool-ott-cors-proxy.herokuapp.com/' + url, true);
    xhttp.send();
}