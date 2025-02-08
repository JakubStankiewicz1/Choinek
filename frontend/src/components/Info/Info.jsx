import React from 'react';
import "./info.css";
import Title from "../Title/Title";

const Info = () => {
  return (
    <div className="info">

        <div className="infoContainer">
            <div className="infoContainerTitle">
                <Title text={"Choinki Warszawa"} />
            </div>

            <div className="infoContainerMiddleText">

                <p className="infoContainerMiddleTextTitle">
                    Zamówienia choinek przyjmujemy do 05.01 do godz. 11:00 z wyłączeniem przerwy świątecznej i sylwestrowo-noworocznej.
                </p>

                <p>
                    Godzina dostawy ustalona jest z klintem indywidualnie. Dowóz możliwy jest w ciągu 48h od momentu zamówienia.
                </p>

                <p>
                    Koszt dostawy choinki na terenie Warszaway 50 zł, poza miastem (max. 20 km) 60 zł.
                </p>

                <p>
                    Koszt obsadzenia choinki to 40 zł, utylizacja 140 zł. Usługi można zaznaczyć przy wyborze wysokości choinki.
                </p>

                <p>
                    Wystawiamy faktury. Formy płatności do wyboru w formularzu - płatność gotówką przy odbiorze, płatność PayU, a także płatność przelewem na podstawie faktury proforma.
                </p>

            </div>

            <div className="infoContainerBottomText">
                <p>W trakcie składania zamówienia masz możliwość podania sugerowanego terminu dostawy – do wyboru dowolne czterogodzinne przedziały od godz. 8 do godziny 22, w soboty od godz. 9 do godziny 21. Każde zamówienie potwierdzamy telefonicznie. Dlatego też pamiętaj, by podać prawidłowy numer telefonu. W przypadku błędnych danych kontaktowych zamówienie nie będzie realizowane.</p>
            </div>

        </div>

    </div>
  )
}

export default Info