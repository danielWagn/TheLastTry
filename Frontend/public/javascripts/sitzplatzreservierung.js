let btn = document.getElementById("kasse-link-button-reservierung");

btn.onclick = function () {
        window.location.href = 'http://localhost:3000/kasse';
    };
        
var geld = 0;
const neueliste = [];

let el = document.getElementById("ausgesucht");
let geldel = document.getElementById("preis");

function reserve(seat) {
    if(neueliste.includes(seat.id)){
        const index = neueliste.indexOf(seat.id)
        neueliste.splice(index, 1);
        seat.style.background = "white";
        el.innerHTML=neueliste;
        let us_preis = parseFloat(neueliste.length * 10.50).toFixed(2)  + ' €';
        let eu_preis = us_preis.replaceAll('.',',');
        geldel.innerHTML = "Preis: " + eu_preis;
    }
    else{
        neueliste.push(seat.id);
        seat.style.background = "rgb(64, 214, 132)";
        el.innerHTML=neueliste;
        let us_preis = parseFloat(neueliste.length * 10.50).toFixed(2)  + ' €';
        let eu_preis = us_preis.replaceAll('.',',');
        geldel.innerHTML = "Preis: " + eu_preis;
    }
}

function getURLParameter()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')

    return id
}

function getVorstellung(Id) {

    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/vorstellung/gib/' + Id;
    xhr.open("GET", url, true);

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const vorstellung_obj = JSON.parse(this.responseText);
            console.log(vorstellung_obj); 
            setFilmInfo(vorstellung_obj);
        }
    }
    // Sending our request
    xhr.send();
}

const vorstellungID = getURLParameter();
console.log(vorstellungID);
let vorstellungsObject = getVorstellung(vorstellungID);

function setFilmInfo(vorstellung_obj) {
    let infoPicture = document.getElementById("reservation-film-info-picture");
    infoPicture.src = "./images/" + vorstellung_obj.film.coverpfad;  
    infoPicture.alt = vorstellung_obj.film.bezeichnung;

    let infoTitle = document.getElementById("reservation-film-info-title");
    infoTitle.innerHTML = vorstellung_obj.film.bezeichnung

    let infoRoom = document.getElementById("reservation-film-info-room");
    infoRoom.innerHTML = vorstellung_obj.kinosaal.bezeichnung

    let infoDate = document.getElementById("reservation-film-info-date");
    infoDate.innerHTML = vorstellung_obj.zeitpunkt.substring(0,10);

    let infoTime = document.getElementById("reservation-film-info-time");
    infoTime.innerHTML = vorstellung_obj.zeitpunkt.substring(11,16) + " Uhr";

    let infoPreis = document.getElementById("reservation-film-info-price");
    const preis = parseFloat(vorstellung_obj.film.preis).toFixed(2)  + ' €'
    infoPreis.innerHTML = preis;

    let infoButton = document.getElementById("reservation-film-info-button");
    infoButton.filmID = vorstellung_obj.film.id;
    infoButton.onclick = function () {
        const urlStringLittle = "http://localhost:3000/film?id=" + this.filmID;
        window.location.href = urlStringLittle;
    };
}

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
    xhr.send(JSON.stringify({ "benutzername": "daniel@test.de" }));
}

checkUnique("daniel@test.de");