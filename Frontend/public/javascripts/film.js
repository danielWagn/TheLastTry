function fillFilmInfo(film_obj) {

    let filmTitle = document.getElementById("film-detailpage-title");
    filmTitle.innerHTML = film_obj.bezeichnung;

    let filmPic = document.getElementById("film-detailpage-pic");
    filmPic.innerHTML = '<img src="images/' + film_obj.coverpfad + '" alt="' + film_obj.bezeichnung + '">';

    let filmInfoText = document.getElementById("film-detailpage-info-text");
    filmInfoText.innerHTML = '<p>' + film_obj.beschreibung + '</p>';

    let filmTrailer = document.getElementById("trailer");
    filmTrailer.src = "./trailer/" + film_obj.videopfad; 

    let filmInfoGenre = document.getElementById("film-detailpage-info-genre");
    filmInfoGenre.innerHTML = film_obj.genre.bezeichnung;

    let filmInfoFSK = document.getElementById("film-detailpage-info-fsk");
    filmInfoFSK.innerHTML = 'FSK: ' + film_obj.fsk;

    let filmInfoDuration = document.getElementById("film-detailpage-info-duration");
    filmInfoDuration.innerHTML = film_obj.dauer + ' Minuten';

    let filmInfoPrice = document.getElementById("film-detailpage-info-price");
    filmInfoPrice.innerHTML = film_obj.preis + ' €';
}

function vorstellungsBox (obj) {

    const anhang = obj.date.replaceAll('.','');
    
    let vorstellung = document.createElement('div');
    vorstellung.id = 'vorstellung-detail-box-' + anhang;
    vorstellung.className = "movie-show";

    let root = document.querySelector('#root-vorstellungen');
    root.appendChild(vorstellung);

    let vorstellung_date = document.createElement('div');
    vorstellung_date.className = "movie-date";
    vorstellung_date.innerHTML = obj.date;

    let vorstellung_date_line = document.createElement('div');
    vorstellung_date_line.className = "date-line";

    let vorstellung_items = document.createElement('div');
    vorstellung_items.id = 'vorstellung-detail-box-items' + anhang;
    vorstellung_items.className = "movie-times row";

    let root_vorstellung = document.querySelector('#vorstellung-detail-box-' + anhang);
    root_vorstellung.appendChild(vorstellung_date);
    root_vorstellung.appendChild(vorstellung_date_line);
    root_vorstellung.appendChild(vorstellung_items);

    for (time of obj.data) {
        let vorstellung_date_time = document.createElement('button');
        vorstellung_date_time.className = "btn btn-outline-light";
        vorstellung_date_time.innerHTML = time.zeitpunkt.substring(11,16);
        if (time.kinosaal.bezeichnung == "Grosser Saal") {
            vorstellung_date_time.onclick = function () {
                window.location.href = 'http://localhost:3000/reservierunggross';
            };
        } else {
            vorstellung_date_time.onclick = function () {
                window.location.href = 'http://localhost:3000/reservierungklein';
            };
        }

        let root_vorstellung_items = document.querySelector('#vorstellung-detail-box-items' + anhang);
        root_vorstellung_items.appendChild(vorstellung_date_time);
    }

}

function getURLParameter()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')

    return id
}

function prepareVorstellungen(obj) {

    let vorstellung_liste = [];

    if (!(obj.length === 0)){

        let time_list = [];

        obj.sort(function (a, b) {
            return a.zeitpunkt.localeCompare(b.zeitpunkt);
        });

        for (time of obj) {
            const time_eintrag = time.zeitpunkt.substring(0,10);
            if (!time_list.includes(time_eintrag)){
                time_list.push(time_eintrag);
            }
        }

        for (datum of time_list) {
            vorstellung_liste.push({date: datum, data: []});
        }

        for (vorstellung_eintrag of vorstellung_liste) {
            for (obj_eintrag of obj) {
                if (vorstellung_eintrag.date == obj_eintrag.zeitpunkt.substring(0,10)) {
                    vorstellung_eintrag.data.push(obj_eintrag);
                }
            }
        }
    }

    return vorstellung_liste;
}

function getVorstellungen(filmId) {

    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/vorstellung/film/' + filmId;
    xhr.open("GET", url, true);

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const vorstellung_obj = JSON.parse(this.responseText);
            let prep_Vorstellungen = prepareVorstellungen(vorstellung_obj);
            for (Veranstaltungstag of prep_Vorstellungen) {
                console.log(Veranstaltungstag);
                vorstellungsBox(Veranstaltungstag);
            }
        }
    }
    // Sending our request
    xhr.send();
}

function getFilm(filmId) {

    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/film/gib/' + filmId;
    xhr.open("GET", url, true);

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            film_obj = JSON.parse(this.responseText);
            fillFilmInfo(film_obj);
            getVorstellungen(filmId);
        }
    }
    // Sending our request
    xhr.send();
}

let filmId = getURLParameter();
getFilm(filmId);