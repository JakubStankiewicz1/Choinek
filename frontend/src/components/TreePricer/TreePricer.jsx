import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import axios from "axios";
import "./treePricer.css";

const TreePricer = () => {
  const [choinki, setChoinki] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/choinki")
      .then((response) => setChoinki(response.data))
      .catch((error) => console.error("Błąd pobierania danych:", error));
  }, []);

  return (
    <div className="treePricer">
      <div className="treePricerTitleEle">
        <Title text={"cennik choinek"} />
      </div>

      <div className="treePricerMapping">
        {choinki.length > 0 ? (
          choinki.map((choinka) => (
            <div key={choinka.id} className="TreePriceInfo">
              <div className="TreePriceInfoTitle">
                <h3>{choinka.nazwa}</h3>
              </div>
              <div className="TreePriceInfoDataContainer">
                {choinka.rozmiary.map((rozmiar, index) => (
                  <div key={index} className="TreePriceInfoDataResult">
                    <p className="TreePriceInfoDataResultSize">{rozmiar} cm</p>
                    <div className="TreePriceInfoHrElement" />
                    <p className="TreePriceInfoDataResultPrice">{choinka.ceny[index]} zł</p>
                  </div>
                ))}
                <button className="TreePriceInfoDataContainerButton">Zamów teraz</button>
              </div>
            </div>
          ))
        ) : (
          <p>Ładowanie danych...</p>
        )}
      </div>
    </div>
  );
};

export default TreePricer;