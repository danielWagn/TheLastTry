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

const idObj = getURLParameter();
setBeleg(idObj);

