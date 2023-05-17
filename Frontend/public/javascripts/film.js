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
    
    let vorstellung = document.createElement('div');
    vorstellung.id = 'vorstellung-detail-box-' + obj.date;
    vorstellung.className = 'movie-show';

    let vorstellung_date = document.createElement('div');
    vorstellung_date.id = 'vorstellung-detail-box-date';
    vorstellung_date.className = 'movie-date';
    vorstellung_date.innerHTML = obj.date;

    let vorstellung_date_line = document.createElement('div');
    vorstellung_date_line.id = 'vorstellung-detail-box-date-line';
    vorstellung_date.className = 'date-line';

    let vorstellung_items = document.createElement('div');
    vorstellung_items.id = 'vorstellung-detail-box-items' + obj.date;
    vorstellung_items.className = 'movie-times row';

    let root = document.querySelector('#root-vorstellungen');
    root.appendChild(vorstellung);
}

function getURLParameter()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')

    return id
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
            let vorstellung_obj = JSON.parse(this.responseText);
            console.log(vorstellung_obj);
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