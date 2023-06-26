-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Insert Statements


-- ------------------------------
-- Benutzerrolle
INSERT INTO Benutzerrolle (bezeichnung) VALUES ('Administrator');
INSERT INTO Benutzerrolle (bezeichnung) VALUES ('Moderator');
INSERT INTO Benutzerrolle (bezeichnung) VALUES ('Benutzer');


-- ------------------------------
-- Kinosaal
INSERT INTO Kinosaal (bezeichnung, leinwand, tonsystem, projektion, projektionsart, sitzreihen, sitzeProReihe, geschoss) VALUES ('Saal 1', 67, 'Dolby SRD', 'Digitale Projektion', 0, 10, 22, 'Erdgeschoss');
INSERT INTO Kinosaal (bezeichnung, leinwand, tonsystem, projektion, projektionsart, sitzreihen, sitzeProReihe, geschoss) VALUES ('Saal 2', 74, 'Dolby SRD', 'Digitale Projektion', 0, 12, 25, 'Erdgeschoss');
INSERT INTO Kinosaal (bezeichnung, leinwand, tonsystem, projektion, projektionsart, sitzreihen, sitzeProReihe, geschoss) VALUES ('Saal 3', 122, 'Dolby Digital 7.1', 'Digitale 3D Projektion', 1, 15, 25, '1. Stock');
INSERT INTO Kinosaal (bezeichnung, leinwand, tonsystem, projektion, projektionsart, sitzreihen, sitzeProReihe, geschoss) VALUES ('Saal 4', 108, 'Dolby SRD / DTS', 'Digitale 3D Projektion', 1, 13, 23, '2. Stock');

-- ------------------------------
-- Filmgenre
INSERT INTO Filmgenre (bezeichnung) VALUES ('Action');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Drama');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Komödie');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Fantasy');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Horror');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Krieg');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Musik');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Thriller');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Science Fiction');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Sport');
INSERT INTO Filmgenre (bezeichnung) VALUES ('Western');
