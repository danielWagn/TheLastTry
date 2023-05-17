const express = require("express");
const path = require("path");

const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname) + "/programm.html");
});

app.get('/film', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/film.html");
});

app.get('/impressum', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/impressum.html");
});

app.get('/account', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/account.html");
});

app.get('/beleg', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/beleg.html");
});

app.get('/kasse', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/kasse.html");
});

app.get('/login', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/login.html");
});

app.get('/reservierung/klein', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/sitzplatz.html");
});

app.get('/reservierung/gross', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/account.html");
});


app.listen(3000, () => console.log('Web listens on Port 3000'));