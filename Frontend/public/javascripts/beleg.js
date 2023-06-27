function getURLParameter()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const rid = urlParams.get('ID');
    const vid = urlParams.get('vID');

    let idObj = {
        id: rid,
        vid: vid
    };

    return idObj;
}

function info1(obj, rid) {
    
    const belegBild = document.getElementById("beleg-info-bild");
    belegBild.innerHTML = '<img src="./images/' + obj.film.coverpfad + '" alt="' + obj.film.bezeichnung + '"></img>';

    const belegTitel = document.getElementById("beleg-ergebnis-titel");
    belegTitel.innerHTML = obj.film.bezeichnung;

    const belegDatum = document.getElementById("beleg-ergebnis-datum");
    belegDatum.innerHTML = obj.zeitpunkt.substring(0,16);

    const belegLaenge = document.getElementById("beleg-ergebnis-laenge");
    belegLaenge.innerHTML = obj.film.dauer + " Minuten";

    const belegSaal = document.getElementById("beleg-ergebnis-saal");
    belegSaal.innerHTML = obj.kinosaal.bezeichnung;

    setBeleg2(obj, rid);
        
    return;
}

function info2(vobj, robj){
    const belegName = document.getElementById("beleg-ergebnis-bestellt-name");
    belegName.innerHTML = robj.reservierer.vorname + " " + robj.reservierer.nachname;

    const belegMail = document.getElementById("beleg-ergebnis-bestellt-email");
    belegMail.innerHTML = robj.reservierer.email;

    const seatList = [];

    for (const reservierung of vobj.reservierungen) {
        if (reservierung.reservierer.id == robj.reservierer.id) {
            for (const seat of reservierung.reserviertesitze) {
                seatList.push(seat.sitzplatz);
            }
        }
    }

    const anzahl = seatList.length;
    const seatString = seatList.join();
    console.log(anzahl + " " + seatString);

    const belegAnzahl = document.getElementById("beleg-ergebnis-sitze-anzahl");
    belegAnzahl.innerHTML = anzahl;

    const belegSitze = document.getElementById("beleg-ergebnis-sitze");
    belegSitze.innerHTML = seatString;

    const belegPreis = document.getElementById("beleg-ergebnis-preis");
    const us_preis = parseFloat(anzahl * vobj.film.preis).toFixed(2)  + ' €'
    const eu_preis = us_preis.replaceAll('.',',');
    belegPreis.innerHTML = eu_preis;

    return;
}

function setBeleg2(vobj, rid) {
    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    console.log(rid);
    var url = 'http://localhost:8000/api/reservierung/gib/' + rid;
    xhr.open("GET", url, true);

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const reservierung_obj = JSON.parse(this.responseText);
            console.log(reservierung_obj);
            info2(vobj, reservierung_obj);
        }
    }
    // Sending our request
    xhr.send();
    return;
}

function setBeleg(obj) {

    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/vorstellung/gib/' + obj.vid;
    xhr.open("GET", url, true);

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const vorstellung_obj = JSON.parse(this.responseText);
            console.log(vorstellung_obj);
            info1(vorstellung_obj, obj.id);
        }
    }
    // Sending our request
    xhr.send();
}

function checkExists(obj) {
    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/vorstellung/existiert/' + obj.vid;
    xhr.open("GET", url, true);

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const vorstellung = JSON.parse(this.responseText);
            if (vorstellung.existiert == true){
                checkExists2(obj); 
            }
            else {   
                window.location.href = "http://localhost:3000/error"
            }
        }
    }
    // Sending our request
    xhr.send();
}

function checkExists2(obj) {
    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/reservierung/existiert/' + obj.id;
    xhr.open("GET", url, true);

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const reservierung = JSON.parse(this.responseText);
            if (reservierung.existiert == true){
                setBeleg(obj);
            }
            else {   
                window.location.href = "http://localhost:3000/error"
            }
        }
    }
    // Sending our request
    xhr.send();
}

const idObj = getURLParameter();
checkExists(idObj);

