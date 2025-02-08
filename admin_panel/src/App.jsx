import { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [formData, setFormData] = useState({
    nazwa: "",
    kategoria_nadrzedna_id: "",
    kategoria_podrzedna_id: "",
    opis: "",
    miasto: "",
    bestseller: false,
    cena: "",
    ilosc_dostepnych: "", // Dodaj pole ilości dostępnych
    informacja_1: "",
    informacja_2: "",
    informacja_3: "",
    zdjecia: [""],
    rozmiary: [{ zakres: "", cena: "", ilosc_dostepnych: "" }],
  });

  const [choinki, setChoinki] = useState([]);
  const [produkty, setProdukty] = useState([]);
  const [editData, setEditData] = useState(null);
  const [token, setToken] = useState(null);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const fetchChoinki = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/choinki");
      setChoinki(response.data);
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    }
  };

  const fetchProdukty = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/produkty");
      setProdukty(response.data);
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    }
  };

  useEffect(() => {
    fetchChoinki();
    fetchProdukty();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleZdjecieChange = (index, e) => {
    const newZdjecia = [...formData.zdjecia];
    newZdjecia[index] = e.target.value;
    setFormData({ ...formData, zdjecia: newZdjecia });
  };

  const handleRozmiarChange = (index, e) => {
    const { name, value } = e.target;
    const newRozmiary = [...formData.rozmiary];
    newRozmiary[index][name] = value;
    setFormData({ ...formData, rozmiary: newRozmiary });
  };

  const addZdjecie = () => {
    setFormData({ ...formData, zdjecia: [...formData.zdjecia, ""] });
  };

  const addRozmiar = () => {
    setFormData({ ...formData, rozmiary: [...formData.rozmiary, { zakres: "", cena: "", ilosc_dostepnych: "" }] });
  };

  const handleSubmitChoinka = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/add_choinka", formData, {
        headers: { "x-access-token": token },
      });
      alert("Choinka dodana!");
      fetchChoinki(); // Odśwież listę choinek
      setFormData({
        nazwa: "",
        kategoria_nadrzedna_id: "",
        kategoria_podrzedna_id: "",
        opis: "",
        miasto: "",
        bestseller: false,
        informacja_1: "",
        informacja_2: "",
        informacja_3: "",
        zdjecia: [""],
        rozmiary: [{ zakres: "", cena: "", ilosc_dostepnych: "" }],
      });
    } catch (error) {
      console.error("Błąd dodawania choinki:", error);
    }
  };

  const handleSubmitProdukt = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/add_produkt", formData, {
        headers: { "x-access-token": token },
      });
      alert("Produkt dodany!");
      fetchProdukty(); // Odśwież listę produktów
      setFormData({
        nazwa: "",
        kategoria_nadrzedna_id: "",
        kategoria_podrzedna_id: "",
        opis: "",
        miasto: "",
        bestseller: false,
        cena: "",
        ilosc_dostepnych: "", // Resetuj pole ilości dostępnych
        informacja_1: "",
        informacja_2: "",
        informacja_3: "",
        zdjecia: [""],
        rozmiary: [{ zakres: "", cena: "", ilosc_dostepnych: "" }],
      });
    } catch (error) {
      console.error("Błąd dodawania produktu:", error);
    }
  };

  const deleteChoinka = async (choinkaId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/delete_choinka/${choinkaId}`, {
        headers: { "x-access-token": token },
      });
      alert("Choinka usunięta!");
      fetchChoinki(); // Odśwież listę choinek
    } catch (error) {
      console.error("Błąd usuwania choinki:", error);
    }
  };

  const deleteProdukt = async (produktId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/delete_produkt/${produktId}`, {
        headers: { "x-access-token": token },
      });
      alert("Produkt usunięty!");
      fetchProdukty(); // Odśwież listę produktów
    } catch (error) {
      console.error("Błąd usuwania produktu:", error);
    }
  };

  const handleEdit = (item, type) => {
    setEditData({ ...item, type });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData.type === "choinka") {
        const updatedRozmiary = editData.rozmiary.map((rozmiar, index) => ({
          zakres: rozmiar.zakres,
          cena: rozmiar.cena,
          ilosc_dostepnych: rozmiar.ilosc_dostepnych,
        }));

        await axios.put(
          `http://127.0.0.1:5000/edit_choinka/${editData.id}`,
          {
            ...editData,
            rozmiary: updatedRozmiary,
          },
          {
            headers: { "x-access-token": token },
          }
        );
        alert("Choinka zaktualizowana!");
        fetchChoinki(); // Odśwież listę choinek
      } else {
        await axios.put(`http://127.0.0.1:5000/edit_produkt/${editData.id}`, editData, {
          headers: { "x-access-token": token },
        });
        alert("Produkt zaktualizowany!");
        fetchProdukty(); // Odśwież listę produktów
      }
      setEditData(null);
    } catch (error) {
      console.error("Błąd aktualizacji:", error);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", loginData);
      setToken(response.data.token);
      alert("Zalogowano pomyślnie!");
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <div>
      {!token ? (
        <form onSubmit={handleLoginSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleLoginChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} required />
          <button type="submit">Zaloguj się</button>
        </form>
      ) : (
        <div>
          <h1>Panel Administratora</h1>
          <form onSubmit={handleSubmitChoinka} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
            <h2>Dodaj Choinkę</h2>
            <input type="text" name="nazwa" placeholder="Nazwa" onChange={handleChange} required />
            <input type="number" name="kategoria_nadrzedna_id" placeholder="ID Kategorii Nadrzędnej" onChange={handleChange} required />
            <input type="number" name="kategoria_podrzedna_id" placeholder="ID Kategorii Podrzędnej" onChange={handleChange} required />
            <textarea name="opis" placeholder="Opis" onChange={handleChange} required />
            <input type="text" name="miasto" placeholder="Miasto" onChange={handleChange} required />
            <label>
              <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange} />
              Bestseller
            </label>

            <h3>Informacje dodatkowe:</h3>
            <input type="text" name="informacja_1" placeholder="Informacja 1" onChange={handleChange} />
            <input type="text" name="informacja_2" placeholder="Informacja 2" onChange={handleChange} />
            <input type="text" name="informacja_3" placeholder="Informacja 3" onChange={handleChange} />

            <h3>Zdjęcia:</h3>
            {formData.zdjecia.map((url, index) => (
              <input key={index} type="text" placeholder="URL zdjęcia" value={url} onChange={(e) => handleZdjecieChange(index, e)} />
            ))}
            <button type="button" onClick={addZdjecie}>
              Dodaj zdjęcie
            </button>

            <h3>Rozmiary, ceny i ilości:</h3>
            {formData.rozmiary.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="zakres"
                  placeholder="Zakres rozmiaru"
                  value={item.zakres}
                  onChange={(e) => handleRozmiarChange(index, e)}
                  required
                />
                <input type="number" name="cena" placeholder="Cena" value={item.cena} onChange={(e) => handleRozmiarChange(index, e)} required />
                <input
                  type="number"
                  name="ilosc_dostepnych"
                  placeholder="Ilość dostępnych"
                  value={item.ilosc_dostepnych}
                  onChange={(e) => handleRozmiarChange(index, e)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addRozmiar}>
              Dodaj rozmiar, cenę i ilość
            </button>

            <button type="submit">Dodaj Choinkę</button>
          </form>

          <form onSubmit={handleSubmitProdukt} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
            <h2>Dodaj Produkt</h2>
            <input type="text" name="nazwa" placeholder="Nazwa" onChange={handleChange} required />
            <input type="number" name="kategoria_nadrzedna_id" placeholder="ID Kategorii Nadrzędnej" onChange={handleChange} required />
            <input type="number" name="kategoria_podrzedna_id" placeholder="ID Kategorii Podrzędnej" onChange={handleChange} required />
            <textarea name="opis" placeholder="Opis" onChange={handleChange} required />
            <input type="text" name="miasto" placeholder="Miasto" onChange={handleChange} required />
            <label>
              <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange} />
              Bestseller
            </label>
            <input type="number" name="cena" placeholder="Cena" onChange={handleChange} required />
            <input type="number" name="ilosc_dostepnych" placeholder="Ilość dostępnych" onChange={handleChange} required />{" "}
            {/* Dodaj pole ilości dostępnych */}
            <h3>Zdjęcia:</h3>
            {formData.zdjecia.map((url, index) => (
              <input key={index} type="text" placeholder="URL zdjęcia" value={url} onChange={(e) => handleZdjecieChange(index, e)} />
            ))}
            <button type="button" onClick={addZdjecie}>
              Dodaj zdjęcie
            </button>
            <button type="submit">Dodaj Produkt</button>
          </form>

          <h2>Lista Choinek</h2>
          <ul>
            {choinki.map((choinka) => (
              <li key={choinka.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
                <h2>{choinka.nazwa}</h2>
                <p>
                  <strong>Kategoria:</strong> {choinka.kategoria_nadrzedna} - {choinka.kategoria_podrzedna}
                </p>
                <p>
                  <strong>Opis:</strong> {choinka.opis}
                </p>
                <p>
                  <strong>Miasto:</strong> {choinka.miasto}
                </p>
                <p>
                  <strong>Data dodania:</strong> {new Date(choinka.data_dodania).toLocaleDateString()}
                </p>
                <p>
                  <strong>Gwiazdki:</strong> {choinka.gwiazdki}
                </p>
                <p>
                  <strong>Bestseller:</strong> {choinka.bestseller ? "Tak" : "Nie"}
                </p>

                <h3>Informacje dodatkowe:</h3>
                <p>
                  <strong>Informacja 1:</strong> {choinka.informacja_1}
                </p>
                <p>
                  <strong>Informacja 2:</strong> {choinka.informacja_2}
                </p>
                <p>
                  <strong>Informacja 3:</strong> {choinka.informacja_3}
                </p>

                <h3>Rozmiary, ceny i ilości:</h3>
                <ul>
                  {choinka.rozmiary.map((rozmiar, index) => (
                    <li key={index}>
                      {rozmiar} cm - <strong>{choinka.ceny[index]} PLN</strong> - <strong>{choinka.ilosci[index]} szt.</strong>
                    </li>
                  ))}
                </ul>

                {choinka.zdjecia.length > 0 && (
                  <div>
                    <h3>Zdjęcia:</h3>
                    {choinka.zdjecia.map((url, index) => (
                      <img key={index} src={url} alt={choinka.nazwa} width="200" style={{ marginRight: "10px" }} />
                    ))}
                  </div>
                )}

                <button onClick={() => handleEdit(choinka, "choinka")}>Edytuj Choinkę</button>
                <button onClick={() => deleteChoinka(choinka.id)}>Usuń Choinkę</button>
              </li>
            ))}
          </ul>

          <h2>Lista Produktów</h2>
          <ul>
            {produkty.map((produkt) => (
              <li key={produkt.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
                <h2>{produkt.nazwa}</h2>
                <p>
                  <strong>Kategoria:</strong> {produkt.kategoria_nadrzedna} - {produkt.kategoria_podrzedna}
                </p>
                <p>
                  <strong>Opis:</strong> {produkt.opis}
                </p>
                <p>
                  <strong>Miasto:</strong> {produkt.miasto}
                </p>
                <p>
                  <strong>Data dodania:</strong> {new Date(produkt.data_dodania).toLocaleDateString()}
                </p>
                <p>
                  <strong>Gwiazdki:</strong> {produkt.gwiazdki}
                </p>
                <p>
                  <strong>Bestseller:</strong> {produkt.bestseller ? "Tak" : "Nie"}
                </p>
                <p>
                  <strong>Cena:</strong> {produkt.cena} PLN
                </p>

                {/* {produkt.zdjecia.length > 0 && (
                  <div>
                    <h3>Zdjęcia:</h3>
                    {produkt.zdjecia.map((url, index) => (
                      <img key={index} src={url} alt={produkt.nazwa} width="200" style={{ marginRight: "10px" }} />
                    ))}
                  </div>
                )} */}

                <button onClick={() => handleEdit(produkt, "produkt")}>Edytuj Produkt</button>
                <button onClick={() => deleteProdukt(produkt.id)}>Usuń Produkt</button>
              </li>
            ))}
          </ul>

          {editData && (
            <div>
              <h2>Edytuj {editData.type === "choinka" ? "Choinkę" : "Produkt"}</h2>
              <form onSubmit={handleEditSubmit}>
                <input type="text" name="nazwa" value={editData.nazwa} onChange={handleEditChange} required />
                <input type="number" name="kategoria_nadrzedna_id" value={editData.kategoria_nadrzedna_id} onChange={handleEditChange} required />
                <input type="number" name="kategoria_podrzedna_id" value={editData.kategoria_podrzedna_id} onChange={handleEditChange} required />
                <textarea name="opis" value={editData.opis} onChange={handleEditChange} required />
                <input type="text" name="miasto" value={editData.miasto} onChange={handleEditChange} required />
                <label>
                  <input type="checkbox" name="bestseller" checked={editData.bestseller} onChange={handleEditChange} />
                  Bestseller
                </label>
                {editData.type === "choinka" ? (
                  <>
                    <input type="text" name="informacja_1" value={editData.informacja_1} onChange={handleEditChange} placeholder="Informacja 1" />
                    <input type="text" name="informacja_2" value={editData.informacja_2} onChange={handleEditChange} placeholder="Informacja 2" />
                    <input type="text" name="informacja_3" value={editData.informacja_3} onChange={handleEditChange} placeholder="Informacja 3" />
                  </>
                ) : (
                  <input type="number" name="cena" value={editData.cena} onChange={handleEditChange} placeholder="Cena" required />
                )}
                <button type="submit">Zaktualizuj {editData.type === "choinka" ? "Choinkę" : "Produkt"}</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
