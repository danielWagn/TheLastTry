const express = require("express");
const path = require("path");

const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname) + "/Programm.html");
});

app.get('/detail', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/Programm.html");
});

app.get('/', (req,res,) => {
    res.sendFile(path.join(__dirname) + "/Programm.html");
});

app.listen(3000, () => console.log('Web listens on Port 3000'));