function loadDoc() {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            print ("Dans le callback: "+this.responseText);
        }
    };
    var path="https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/50.6,3.06"
    xhttp.open("GET",path, true);
    xhttp.send();
}

var text=loadDoc();
print.log("Après appel: "+text);