from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import mysql.connector
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SECRET_KEY'] = 'your_secret_key'

# Konfiguracja połączenia z MySQL
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Broniewskiego14",
    "database": "choinek_db"
}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid!'}), 403
        return f(*args, **kwargs)
    return decorated

@app.route('/login', methods=['POST'])
def login():
    auth = request.json
    if not auth or not auth.get('username') or not auth.get('password'):
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    username = auth.get('username')
    password = auth.get('password')

    # Weryfikacja użytkownika (przykład)
    if username == 'admin' and password == 'admin':
        token = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify({'token': token})

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

def get_choinki():
    """ Pobiera listę choinek z bazy danych i grupuje ich rozmiary, ceny oraz zdjęcia """
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    query = """
    SELECT c.id, c.nazwa, c.opis, c.miasto, c.data_dodania, c.gwiazdki, c.bestseller, kn.nazwa AS kategoria_nadrzedna, 
           kp.nazwa AS kategoria_podrzedna, 
           GROUP_CONCAT(DISTINCT z.url ORDER BY z.id ASC) AS zdjecia, 
           GROUP_CONCAT(DISTINCT r.zakres ORDER BY r.id ASC) AS rozmiary, 
           GROUP_CONCAT(DISTINCT p.cena ORDER BY r.id ASC) AS ceny,
           GROUP_CONCAT(DISTINCT p.ilosc_dostepnych ORDER BY r.id ASC) AS ilosci,
           GROUP_CONCAT(DISTINCT c.informacja_1 ORDER BY c.id ASC) AS informacja_1,
           GROUP_CONCAT(DISTINCT c.informacja_2 ORDER BY c.id ASC) AS informacja_2,
           GROUP_CONCAT(DISTINCT c.informacja_3 ORDER BY c.id ASC) AS informacja_3
    FROM choinki c
    LEFT JOIN kategoria_nadrzedna kn ON c.kategoria_nadrzedna_id = kn.id
    LEFT JOIN kategoria_podrzedna kp ON c.kategoria_podrzedna_id = kp.id
    LEFT JOIN zdjecia_choinki z ON c.id = z.choinka_id
    LEFT JOIN ceny_choinek p ON c.id = p.choinka_id
    LEFT JOIN rozmiary_choinek r ON p.rozmiar_id = r.id
    GROUP BY c.id;
    """
    
    cursor.execute(query)
    choinki = cursor.fetchall()
    
    # Przetworzenie list (bo GROUP_CONCAT zwraca stringi)
    for choinka in choinki:
        choinka["zdjecia"] = choinka["zdjecia"].split(",") if choinka["zdjecia"] else []
        choinka["rozmiary"] = choinka["rozmiary"].split(",") if choinka["rozmiary"] else []
        choinka["ceny"] = choinka["ceny"].split(",") if choinka["ceny"] else []
        choinka["ilosci"] = choinka["ilosci"].split(",") if choinka["ilosci"] else []
        choinka["informacja_1"] = choinka["informacja_1"].split(",") if choinka["informacja_1"] else []
        choinka["informacja_2"] = choinka["informacja_2"].split(",") if choinka["informacja_2"] else []
        choinka["informacja_3"] = choinka["informacja_3"].split(",") if choinka["informacja_3"] else []
    
    cursor.close()
    conn.close()
    return choinki

@app.route('/choinki', methods=['GET'])
def choinki():
    return jsonify(get_choinki())

@app.route('/add_choinka', methods=['POST'])
def add_choinka():
    """ Dodaje nową choinkę do bazy danych """
    data = request.json
    nazwa = data.get("nazwa")
    kategoria_nadrzedna_id = data.get("kategoria_nadrzedna_id")
    kategoria_podrzedna_id = data.get("kategoria_podrzedna_id")
    opis = data.get("opis")
    miasto = data.get("miasto")
    bestseller = data.get("bestseller", False)
    informacja_1 = data.get("informacja_1", "")
    informacja_2 = data.get("informacja_2", "")
    informacja_3 = data.get("informacja_3", "")
    zdjecia = data.get("zdjecia", [])
    rozmiary = data.get("rozmiary", [])

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Dodanie choinki
    cursor.execute(
        "INSERT INTO choinki (nazwa, kategoria_nadrzedna_id, kategoria_podrzedna_id, opis, miasto, bestseller, informacja_1, informacja_2, informacja_3) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (nazwa, kategoria_nadrzedna_id, kategoria_podrzedna_id, opis, miasto, bestseller, informacja_1, informacja_2, informacja_3)
    )
    choinka_id = cursor.lastrowid

    # Dodanie zdjęć
    for url in zdjecia:
        if url:
            cursor.execute(
                "INSERT INTO zdjecia_choinki (choinka_id, url) VALUES (%s, %s)",
                (choinka_id, url)
            )

    # Dodanie rozmiarów, cen i ilości
    for rozmiar in rozmiary:
        zakres = rozmiar.get("zakres")
        cena = rozmiar.get("cena")
        ilosc = rozmiar.get("ilosc_dostepnych")
        if zakres and cena and ilosc:
            cursor.execute(
                "INSERT INTO rozmiary_choinek (zakres) VALUES (%s)",
                (zakres,)
            )
            rozmiar_id = cursor.lastrowid
            cursor.execute(
                "INSERT INTO ceny_choinek (choinka_id, rozmiar_id, cena, ilosc_dostepnych) VALUES (%s, %s, %s, %s)",
                (choinka_id, rozmiar_id, cena, ilosc)
            )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Choinka dodana!"}), 201

@app.route('/delete_choinka/<int:choinka_id>', methods=['DELETE'])
def delete_choinka(choinka_id):
    """ Usuwa choinkę z bazy danych """
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Usunięcie zdjęć, cen i rozmiarów powiązanych z choinką
    cursor.execute("DELETE FROM zdjecia_choinki WHERE choinka_id = %s", (choinka_id,))
    cursor.execute("DELETE FROM ceny_choinek WHERE choinka_id = %s", (choinka_id,))
    cursor.execute("DELETE FROM choinki WHERE id = %s", (choinka_id,))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Choinka usunięta!"}), 200

@app.route('/edit_choinka/<int:choinka_id>', methods=['PUT'])
def edit_choinka(choinka_id):
    """ Edytuje dane choinki w bazie danych """
    data = request.json
    nazwa = data.get("nazwa")
    kategoria_nadrzedna_id = data.get("kategoria_nadrzedna_id")
    kategoria_podrzedna_id = data.get("kategoria_podrzedna_id")
    opis = data.get("opis")
    miasto = data.get("miasto")
    bestseller = data.get("bestseller", False)
    informacja_1 = data.get("informacja_1", "")
    informacja_2 = data.get("informacja_2", "")
    informacja_3 = data.get("informacja_3", "")
    zdjecia = data.get("zdjecia", [])
    rozmiary = data.get("rozmiary", [])

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Edytowanie choinki
    cursor.execute(
        "UPDATE choinki SET nazwa = %s, kategoria_nadrzedna_id = %s, kategoria_podrzedna_id = %s, opis = %s, miasto = %s, bestseller = %s, informacja_1 = %s, informacja_2 = %s, informacja_3 = %s WHERE id = %s",
        (nazwa, kategoria_nadrzedna_id, kategoria_podrzedna_id, opis, miasto, bestseller, informacja_1, informacja_2, informacja_3, choinka_id)
    )

    # Usunięcie istniejących zdjęć
    cursor.execute("DELETE FROM zdjecia_choinki WHERE choinka_id = %s", (choinka_id,))
    # Dodanie nowych zdjęć
    for url in zdjecia:
        if url:
            cursor.execute(
                "INSERT INTO zdjecia_choinki (choinka_id, url) VALUES (%s, %s)",
                (choinka_id, url)
            )

    # Usunięcie istniejących cen i rozmiarów
    cursor.execute("DELETE FROM ceny_choinek WHERE choinka_id = %s", (choinka_id,))
    # Dodanie nowych rozmiarów, cen i ilości
    for rozmiar in rozmiary:
        zakres = rozmiar.get("zakres")
        cena = rozmiar.get("cena")
    ilosc = rozmiar.get("ilosc_dostepnych")
    if zakres and cena and ilosc:
        cursor.execute(
            "INSERT INTO rozmiary_choinek (zakres) VALUES (%s)",
            (zakres,)
        )
        rozmiar_id = cursor.lastrowid
        cursor.execute(
            "INSERT INTO ceny_choinek (choinka_id, rozmiar_id, cena, ilosc_dostepnych) VALUES (%s, %s, %s, %s)",
            (choinka_id, rozmiar_id, cena, ilosc)
        )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Choinka zaktualizowana!"}), 200

def get_produkty():
    """ Pobiera listę produktów z bazy danych """
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    query = """
    SELECT p.id, p.nazwa, p.opis, p.miasto, p.data_dodania, p.gwiazdki, p.bestseller, kn.nazwa AS kategoria_nadrzedna, 
           kp.nazwa AS kategoria_podrzedna, p.cena
    FROM produkty p
    LEFT JOIN kategoria_nadrzedna kn ON p.kategoria_nadrzedna_id = kn.id
    LEFT JOIN kategoria_podrzedna kp ON p.kategoria_podrzedna_id = kp.id;
    """
    
    cursor.execute(query)
    produkty = cursor.fetchall()
    
    cursor.close()
    conn.close()
    return produkty

@app.route('/produkty', methods=['GET'])
def produkty():
    return jsonify(get_produkty())

@app.route('/add_produkt', methods=['POST'])
def add_produkt():
    """ Dodaje nowy produkt do bazy danych """
    data = request.json
    nazwa = data.get("nazwa")
    kategoria_nadrzedna_id = data.get("kategoria_nadrzedna_id")
    kategoria_podrzedna_id = data.get("kategoria_podrzedna_id")
    opis = data.get("opis")
    miasto = data.get("miasto")
    bestseller = data.get("bestseller", False)
    cena = data.get("cena")
    ilosc_dostepnych = data.get("ilosc_dostepnych")

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Dodanie produktu
    cursor.execute(
        "INSERT INTO produkty (nazwa, kategoria_nadrzedna_id, kategoria_podrzedna_id, opis, miasto, bestseller, cena, ilosc_dostepnych) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (nazwa, kategoria_nadrzedna_id, kategoria_podrzedna_id, opis, miasto, bestseller, cena, ilosc_dostepnych)
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Produkt dodany!"}), 201

@app.route('/delete_produkt/<int:produkt_id>', methods=['DELETE'])
def delete_produkt(produkt_id):
    """ Usuwa produkt z bazy danych """
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    cursor.execute("DELETE FROM produkty WHERE id = %s", (produkt_id,))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Produkt usunięty!"}), 200

@app.route('/edit_produkt/<int:produkt_id>', methods=['PUT'])
def edit_produkt(produkt_id):
    """ Edytuje dane produktu w bazie danych """
    data = request.json
    nazwa = data.get("nazwa")
    kategoria_nadrzedna_id = data.get("kategoria_nadrzedna_id")
    kategoria_podrzedna_id = data.get("kategoria_podrzedna_id")
    opis = data.get("opis")
    miasto = data.get("miasto")
    bestseller = data.get("bestseller", False)
    cena = data.get("cena")

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE produkty SET nazwa = %s, kategoria_nadrzedna_id = %s, kategoria_podrzedna_id = %s, opis = %s, miasto = %s, bestseller = %s, cena = %s WHERE id = %s",
        (nazwa, kategoria_nadrzedna_id, kategoria_podrzedna_id, opis, miasto, bestseller, cena, produkt_id)
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Produkt zaktualizowany!"}), 200

@app.route('/choinka/<int:choinka_id>', methods=['GET'])
def get_choinka_by_id(choinka_id):
    """ Pobiera szczegóły choinki po ID """
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT c.id, c.nazwa, c.opis, c.miasto, c.data_dodania, c.gwiazdki, c.bestseller, 
           kn.nazwa AS kategoria_nadrzedna, kp.nazwa AS kategoria_podrzedna, 
           GROUP_CONCAT(DISTINCT z.url ORDER BY z.id ASC) AS zdjecia, 
           GROUP_CONCAT(DISTINCT r.zakres ORDER BY r.id ASC) AS rozmiary, 
           GROUP_CONCAT(DISTINCT p.cena ORDER BY r.id ASC) AS ceny,
           GROUP_CONCAT(DISTINCT p.ilosc_dostepnych ORDER BY r.id ASC) AS ilosci,
           GROUP_CONCAT(DISTINCT c.informacja_1 ORDER BY c.id ASC) AS informacja_1,
           GROUP_CONCAT(DISTINCT c.informacja_2 ORDER BY c.id ASC) AS informacja_2,
           GROUP_CONCAT(DISTINCT c.informacja_3 ORDER BY c.id ASC) AS informacja_3
    FROM choinki c
    LEFT JOIN kategoria_nadrzedna kn ON c.kategoria_nadrzedna_id = kn.id
    LEFT JOIN kategoria_podrzedna kp ON c.kategoria_podrzedna_id = kp.id
    LEFT JOIN zdjecia_choinki z ON c.id = z.choinka_id
    LEFT JOIN ceny_choinek p ON c.id = p.choinka_id
    LEFT JOIN rozmiary_choinek r ON p.rozmiar_id = r.id
    WHERE c.id = %s
    GROUP BY c.id;
    """

    cursor.execute(query, (choinka_id,))
    choinka = cursor.fetchone()

    if not choinka:
        return jsonify({"message": "Choinka nie została znaleziona"}), 404

    # Przetworzenie list (bo GROUP_CONCAT zwraca stringi)
    choinka["zdjecia"] = choinka["zdjecia"].split(",") if choinka["zdjecia"] else []
    choinka["rozmiary"] = choinka["rozmiary"].split(",") if choinka["rozmiary"] else []
    choinka["ceny"] = choinka["ceny"].split(",") if choinka["ceny"] else []
    choinka["ilosci"] = choinka["ilosci"].split(",") if choinka["ilosci"] else []
    choinka["informacja_1"] = choinka["informacja_1"].split(",") if choinka["informacja_1"] else []
    choinka["informacja_2"] = choinka["informacja_2"].split(",") if choinka["informacja_2"] else []
    choinka["informacja_3"] = choinka["informacja_3"].split(",") if choinka["informacja_3"] else []

    cursor.close()
    conn.close()
    
    return jsonify(choinka)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)