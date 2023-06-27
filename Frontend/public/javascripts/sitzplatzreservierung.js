//let btn = document.getElementById("kasse-link-button-reservierung");

//btn.onclick = function () {
//        window.location.href = 'http://localhost:3000/kasse';
//    };
        
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

function formButton(){
    let form = document.getElementById("kasse-form");
    function submitForm(event) {
        event.preventDefault();
    }

    form.addEventListener('submit', submitForm);

    return;
};

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
            let preparedSeatList = prepareSeatList(vorstellung_obj)
            setSeats(vorstellung_obj, preparedSeatList);
            formButton();
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

    return;
};

function setSeatsKlein(v_obj, prepSeats) {
    
    let seatList = [
        "A1", "A2", "A3", "A9", "A10", "A11", 
        "B1", "B2", "B3", "B4", "B8", "B9", "B10", "B11",
        "C1", "C2", "C3", "C4", "C5", "C7", "C8", "C9", "C10", "C11",
        "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11",
        "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
        "F3", "F4", "F5", "F6", "F7", "F8", "F9"
    ];

    for (const seat of seatList) {
        let targetSeat = document.getElementById(seat);
        
        if (prepSeats.includes(seat)) {
            targetSeat.className = "closed-seat";
        }
        else {
            targetSeat.className = "seat";
            targetSeat.onclick = function() { reserve(this); }
        }

    }
    
    return;
};

function setSeatsGross(v_obj, prepSeats) {
    
    console.log(prepSeats);

    let seatList = [
        "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", 
        "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11",
        "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11",
        "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11",
        "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", 
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11"
    ];
    
    for (const seat of seatList) {
        let targetSeat = document.getElementById(seat);
        
        if (prepSeats.includes(seat)) {
            targetSeat.className = "closed-seat";
        }
        else {
            targetSeat.className = "seat";
            targetSeat.onclick = function() { reserve(this); }
        }

    }
    
    return;
};

function prepareSeatList(vorstellung_obj) {
    let prepSeats = [];
    
    for (reservierung of vorstellung_obj.reservierungen) {
        for (reservierteSitze of reservierung.reserviertesitze) {
            prepSeats.push(reservierteSitze.sitzplatz)
        }
    }

    return prepSeats;
}

function setSeats(v_obj, prepSeats) {
    if (v_obj.kinosaal.bezeichnung == "Kleiner Saal") {
        setSeatsKlein(v_obj, prepSeats);
    }
    else {
        setSeatsGross(v_obj, prepSeats);
    }
    
    return;
}

function makeReservation(obj, reservierer) {
    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/reservierung';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    const sendObj = {
        zeitpunkt: obj.zeitpunkt,
        vorstellung: {
            id: obj.vorstellung.id
        },
        reservierer: {
            id: reservierer
        },
        reserviertesitze: []
    };

    for (const seat of obj.reserviertesitze) {
        sendObj.reserviertesitze.push({reihe: "0", sitzplatz: seat});
    }

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const reservierung_obj = JSON.parse(this.responseText);
            console.log(reservierung_obj.id);
            window.location.href = 'http://localhost:3000/beleg' + '?vID=' + obj.vorstellung.id + '&ID=' + reservierung_obj.id;
        }
    }
    // Sending our request
    xhr.send(JSON.stringify(sendObj));
}

function makeReservationPerson(obj) {
    console.log(obj);
    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/reservierer';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    const sendObj = {
        vorname: obj.reservierer.vorname,
        nachname: obj.reservierer.nachname,
        email: obj.reservierer.email
    };

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const reservierer_obj = JSON.parse(this.responseText);
            console.log(reservierer_obj.id);
            makeReservation(obj, reservierer_obj.id);
        }
    }
    // Sending our request
    xhr.send(JSON.stringify(sendObj));
}

function kasse(){
    const vorstellungID = getURLParameter();

    let date = document.getElementById("reservation-film-info-date").innerHTML;
    let time = document.getElementById("reservation-film-info-time").innerHTML;
    let ausgesucht = document.getElementById("ausgesucht").innerHTML;

    let vorname = document.getElementById("kasseVorname").value;
    let nachname = document.getElementById("kasseNachname").value;
    let email = document.getElementById("kasseEmail").value;

    const zeitpunkt = date + " " + time.substring(0,5) + ":00";
    const seatList = ausgesucht.split(",");

    let uebergabe = {
        zeitpunkt: zeitpunkt,
        vorstellung: {
            id: vorstellungID
        },
        reservierer: {
            vorname: vorname,
            nachname: nachname,
            email: email
        },
        reserviertesitze: seatList
    };

    console.log(seatList);
    if (seatList.length != 0) {
        reservationID = makeReservationPerson(uebergabe);
        //window.location.href = 'http://localhost:3000/beleg' + '?vID=' + vorstellungID + '&ID=' + reservationID ;
    }
    return;
};