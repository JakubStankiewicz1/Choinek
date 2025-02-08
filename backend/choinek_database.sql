CREATE DATABASE IF NOT EXISTS choinek_db;
USE choinek_db;

-- Tworzenie tabeli użytkownik
CREATE TABLE IF NOT EXISTS uzytkownik (
    id INT PRIMARY KEY AUTO_INCREMENT,
    imie VARCHAR(255) NOT NULL,
    nazwisko VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefon VARCHAR(15) NOT NULL,
    haslo VARCHAR(255) NOT NULL,
    data_rejestracji DATETIME NOT NULL DEFAULT NOW()
);

-- Tworzenie tabeli kategoria nadrzędna
CREATE TABLE IF NOT EXISTS kategoria_nadrzedna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nazwa VARCHAR(255) NOT NULL
);

-- Tworzenie tabeli kategoria podrzędna
CREATE TABLE IF NOT EXISTS kategoria_podrzedna (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nazwa VARCHAR(255) NOT NULL,
    kategoria_nadrzedna_id INT,
    FOREIGN KEY (kategoria_nadrzedna_id) REFERENCES kategoria_nadrzedna(id)
);

-- Tworzenie tabeli choinki
CREATE TABLE IF NOT EXISTS choinki (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nazwa VARCHAR(255) NOT NULL,
    kategoria_nadrzedna_id INT,
    kategoria_podrzedna_id INT,
    opis TEXT NOT NULL,
    miasto VARCHAR(255) NOT NULL,
    data_dodania DATETIME NOT NULL DEFAULT NOW(),
    gwiazdki INT NOT NULL DEFAULT 0,
    bestseller BOOLEAN NOT NULL DEFAULT FALSE,
    informacja_1 VARCHAR(255),
    informacja_2 VARCHAR(255),
    informacja_3 VARCHAR(255),
    FOREIGN KEY (kategoria_nadrzedna_id) REFERENCES kategoria_nadrzedna(id),
    FOREIGN KEY (kategoria_podrzedna_id) REFERENCES kategoria_podrzedna(id)
);

-- Tworzenie tabeli zdjecia_choinki
CREATE TABLE IF NOT EXISTS zdjecia_choinki (
    id INT PRIMARY KEY AUTO_INCREMENT,
    choinka_id INT,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (choinka_id) REFERENCES choinki(id)
);

-- Tworzenie tabeli rozmiary_choinek
CREATE TABLE IF NOT EXISTS rozmiary_choinek (
    id INT PRIMARY KEY AUTO_INCREMENT,
    zakres VARCHAR(50) NOT NULL
);

-- Tworzenie tabeli ceny_choinek
CREATE TABLE IF NOT EXISTS ceny_choinek (
    id INT PRIMARY KEY AUTO_INCREMENT,
    choinka_id INT,
    rozmiar_id INT,
    cena DECIMAL(10, 2) NOT NULL,
    ilosc_dostepnych INT NOT NULL,
    FOREIGN KEY (choinka_id) REFERENCES choinki(id),
    FOREIGN KEY (rozmiar_id) REFERENCES rozmiary_choinek(id)
);

-- Tworzenie tabeli produkty
CREATE TABLE IF NOT EXISTS produkty (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nazwa VARCHAR(255) NOT NULL,
    kategoria_nadrzedna_id INT,
    kategoria_podrzedna_id INT,
    opis TEXT NOT NULL,
    miasto VARCHAR(255) NOT NULL,
    data_dodania DATETIME NOT NULL DEFAULT NOW(),
    gwiazdki INT NOT NULL DEFAULT 0,
    bestseller BOOLEAN NOT NULL DEFAULT FALSE,
    cena DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (kategoria_nadrzedna_id) REFERENCES kategoria_nadrzedna(id),
    FOREIGN KEY (kategoria_podrzedna_id) REFERENCES kategoria_podrzedna(id)
);

-- Przykładowe dane
INSERT INTO kategoria_nadrzedna (nazwa) VALUES ('Kategoria Nadrzędna 1');
INSERT INTO kategoria_podrzedna (nazwa, kategoria_nadrzedna_id) VALUES ('Kategoria Podrzędna 1', 1);
-- INSERT INTO choinki (nazwa, kategoria_nadrzedna_id, kategoria_podrzedna_id, opis, miasto, data_dodania, gwiazdki, bestseller, informacja_1, informacja_2, informacja_3) VALUES ('Choinka 1', 1, 1, 'Opis choinki 1', 'Warszawa', NOW(), 0, FALSE, 'Informacja 1', 'Informacja 2', 'Informacja 3');
-- INSERT INTO zdjecia_choinki (choinka_id, url) VALUES (1, 'https://pk1.pocztakwiatowa.pl/media/catalog/product/xc/image/550x550/9/1/9101_choinka_1.jpg.jpg');
-- INSERT INTO rozmiary_choinek (zakres) VALUES ('110-140');
-- INSERT INTO ceny_choinek (choinka_id, rozmiar_id, cena, ilosc_dostepnych) VALUES (1, 1, 100.00, 5);
-- INSERT INTO produkty (nazwa, kategoria_nadrzedna_id, kategoria_podrzedna_id, opis, miasto, data_dodania, gwiazdki, bestseller, cena) VALUES ('Produkt 1', 1, 1, 'Opis produktu 1', 'Warszawa', NOW(), 0, FALSE, 50.00);