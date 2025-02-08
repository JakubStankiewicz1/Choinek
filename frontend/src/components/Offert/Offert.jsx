import React from "react";
import Title from "../Title/Title";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./offert.css";

const Offert = () => {
    const [choinki, setChoinki] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/choinki")
            .then(response => setChoinki(response.data))
            .catch(error => console.error("Błąd pobierania danych:", error));
    }, []);

    return (
        <div className="offert">
            <div className="offertContainer">
                <Title text={"Choinki Warszawa - oferta"} />

                <div className="offertContainerProductsContainer">
                    {choinki.length > 0 ? (
                        choinki.map((choinka) =>
                            choinka ? (
                                <ProductItem
                                    key={choinka.id}
                                    id={choinka.id}
                                    name={choinka.nazwa}
                                    images={choinka.zdjecia}
                                    lists={[
                                        `${choinka.informacja_1.join(", ")}`,
                                        `${choinka.informacja_2.join(", ")}`,
                                        `${choinka.informacja_3.join(", ")}`
                                    ]}
                                    className="offertContainerProductContainerElement"
                                />
                            ) : null
                        )
                    ) : (
                        <p>Ładowanie danych...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Offert;