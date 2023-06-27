const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const XMLHttpRequest = require('xhr2');


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

app.get('/beleg', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/beleg.html");
});

app.get('/kasse', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/kasse.html");
});


function checkUnique (username) {

    let xhr = new XMLHttpRequest();

    var url = 'http://localhost:8000/api/benutzer/eindeutig';
    var json_name = { 
        benutzername: "danieltest.de" 
    };

    console.log(JSON.stringify(json_name));

    xhr.open("POST", url);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const unique = JSON.parse(this.responseText);
            console.log(unique);
        }
    };
    
    xhr.send(JSON.stringify(json_name));
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