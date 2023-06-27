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

app.get('/reservierungklein', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/sitzplatzreservierungklein.html");
});

app.get('/reservierunggross', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/sitzplatzreservierunggross.html");
});

app.get('/error', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/error.html");
});


app.listen(3000, () => console.log('Web listens on Port 3000'));