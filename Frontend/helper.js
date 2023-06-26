const XMLHttpRequest = require('xhr2');

module.exports.checkUnique = function(username) {

    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/benutzer/eindeutig';
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const unique = JSON.parse(this.responseText);
            console.log(unique);
        }
        return
    }
    // Sending our request
    xhr.send(JSON.stringify({ "benutzername": username }));
}