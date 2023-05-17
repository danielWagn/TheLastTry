function movieBox (obj) {

    // <div class="row movie-box">
    let programm = document.createElement('div');
    programm.id = 'programm-box-' + obj.id;
    programm.className = 'row movie-box';

    // <div class="col-4 movie-picture">
    let programm_picture = document.createElement('div');
    programm_picture.id = 'programm-box-picture-' + obj.id;
    programm_picture.className = 'col-4 movie-picture';
    programm_picture.innerHTML = '<img src="./images/'+ obj.coverpfad +'" alt="' + obj.bezeichnung + '">';

    // <div class="col-8 movie-info">
    let programm_info = document.createElement('div');
    programm_info.id = 'programm-box-info-' + obj.id;
    programm_info.className = 'col-8 movie-info';

    // h2
    let programm_info_title = document.createElement('h2');
    programm_info_title.id = 'programm-box-info-title-' + obj.id;
    programm_info_title.innerHTML = obj.bezeichnung;

    // p1
    let programm_info_p1 = document.createElement('p');
    programm_info_p1.id = 'programm-box-info-p1-' + obj.id;
    programm_info_p1.innerHTML = '<b>Genre:</b> ' + obj.genre.bezeichnung + ' - FSK ' + obj.fsk + '';

    // p2
    let programm_info_p2 = document.createElement('p');
    programm_info_p2.id = 'programm-box-info-p2-' + obj.id;
    programm_info_p2.innerHTML = obj.beschreibung;

    // p3
    let programm_info_p3 = document.createElement('p');
    programm_info_p3.id = 'programm-box-info-p3-' + obj.id;
    programm_info_p3.innerHTML = '<b>Dauer:</b> ' + obj.dauer + ' Minuten';

    // Button
    let programm_info_button = document.createElement('button');
    programm_info_button.id = 'programm-box-info-button- + obj.id';
    programm_info_button.className = 'btn Movie-detail-button btn-outline-dark'
    programm_info_button.innerHTML = 'Details';
    programm_info_button.onclick = function () {
        window.location.href = 'http://localhost:3000/film?id=' + obj.id
    };

    let root = document.querySelector('#programm-root');
    root.appendChild(programm);

    let root_programm = document.querySelector('#programm-box-' + obj.id);
    root_programm.appendChild(programm_picture);
    root_programm.appendChild(programm_info);

    let root_info = document.querySelector('#programm-box-info-' + obj.id);
    root_info.appendChild(programm_info_title);
    root_info.appendChild(programm_info_p1);
    root_info.appendChild(programm_info_p2);
    root_info.appendChild(programm_info_p3);
    root_info.appendChild(programm_info_button);
}


function getFilme() {

    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection 
    var url = 'http://localhost:8000/api/film/alle';
    xhr.open("GET", url, true);

    // function execute after request is successful
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(JSON.parse(this.responseText));
            for (film of JSON.parse(this.responseText)) {
                movieBox(film);
            }  
        }
    }
    // Sending our request
    xhr.send();
}
getFilme();