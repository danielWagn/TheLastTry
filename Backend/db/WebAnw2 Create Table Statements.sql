-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Create Table Statements

-- ------------------------------
-- Person

CREATE TABLE Person (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	anrede INTEGER NOT NULL DEFAULT 0,
	vorname TEXT NOT NULL,
	nachname TEXT NOT NULL,
	telefonnummer TEXT NOT NULL,
	email TEXT NOT NULL,
	geburtstag TEXT DEFAULT NULL,
);

-- ------------------------------
-- Kinoreservierung
CREATE TABLE Kinosaal (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	leinwand INTEGER NOT NULL DEFAULT 100,
	tonsystem TEXT NOT NULL,
	projektion TEXT NOT NULL,
	projektionsart INTEGER NOT NULL DEFAULT 0,
	sitzreihen INTEGER NOT NULL DEFAULT 20,
	sitzeProReihe INTEGER NOT NULL DEFAULT 25,
	geschoss TEXT NOT NULL
);

CREATE TABLE Filmgenre (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL
);

CREATE TABLE Reservierer (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	vorname TEXT NOT NULL,
	nachname TEXT NOT NULL,
	email TEXT NOT NULL
);

CREATE TABLE Film (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	genreId INTEGER NOT NULL,
	fsk INTEGER NOT NULL DEFAULT 12,
	dauer INTEGER NOT NULL DEFAULT 90,
	regie TEXT NOT NULL,
	darsteller TEXT NOT NULL,
	preis REAL NOT NULL DEFAULT 10.0,
	coverpfad TEXT DEFAULT NULL,
	videopfad TEXT DEFAULT NULL,
	imdb TEXT DEFAULT NULL,
	CONSTRAINT fk_Film1 FOREIGN KEY (genreId) REFERENCES Filmgenre(id)
);

CREATE TABLE Vorstellung (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	filmId INTEGER NOT NULL,
	kinosaalId INTEGER NOT NULL,
	zeitpunkt TEXT NOT NULL,
	CONSTRAINT fk_Vorstellung1 FOREIGN KEY (filmId) REFERENCES Film(id),
	CONSTRAINT fk_Vorstellung2 FOREIGN KEY (kinosaalId) REFERENCES Kinosaal(id)
);

CREATE TABLE Reservierung (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	zeitpunkt NUMERIC NOT NULL,
	reserviererId INTEGER NOT NULL,
	vorstellungId INTEGER NOT NULL,
	CONSTRAINT fk_Reservierung1 FOREIGN KEY (reserviererId) REFERENCES Reservierer(id),
	CONSTRAINT fk_Reservierung3 FOREIGN KEY (vorstellungId) REFERENCES Vorstellung(id)
);

CREATE TABLE ReservierterSitz (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	reservierungId INTEGER NOT NULL,
	reihe INTEGER NOT NULL DEFAULT 1,
	sitzplatz INTEGER NOT NULL DEFAULT 1,
	CONSTRAINT fk_ReservierterSitz1 FOREIGN KEY (reservierungId) REFERENCES Reservierung(id)
);

-- ------------------------------
-- Benutzer
CREATE TABLE Benutzer (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	benutzername TEXT NOT NULL,
	passwort TEXT NOT NULL,
	personId INTEGER DEFAULT NULL,
	CONSTRAINT fk_Benutzer2 FOREIGN KEY (personId) REFERENCES Person(id)
);
