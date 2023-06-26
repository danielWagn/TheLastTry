const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const XMLHttpRequest = require('xhr2');

const helper = require('./helper.js');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "OEfmaR&C2ek" }));


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname) + "/programm.html");
});

app.get('/film', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/film.html");
});

app.get('/impressum', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/impressum.html");
});

//app.get('/account', (req,res,) => {
//    res.sendFile(path.join(__dirname) + "/account.html");
//});

app.get('/beleg', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/beleg.html");
});

app.get('/kasse', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/kasse.html");
});

app.get('/logres', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/login.html");
});

function checkUnique (username) {

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

function registration(body) {
    console.log("Signup start...");
    checkUnique(body.user);
    return;
}

function login(body) {
    console.log("Login");
    return;
}

function checkAction(body) {
    if (body.action == "Signup") {
        registration(body);
        return;
    }
    if (body.action == "Login") {
        login(body);
        return;
    }
    
}

app.post('/logres', function (req,res,) {
    checkAction(req.body);
    res.sendFile(path.join(__dirname) + "/login.html");
});

app.get('/reservierungklein', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/sitzplatzreservierungklein.html");
});

app.get('/reservierunggross', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/sitzplatzreservierunggross.html");
});


app.listen(3000, () => console.log('Web listens on Port 3000'));