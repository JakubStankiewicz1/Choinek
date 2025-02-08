import React from "react";
import "./orderInfo.css";
import Title from "../Title/Title";
import assets from "../../assets/assets";

const OrderInfo = () => {
  return (
    <div className="orderInfo">
      <div className="orderInfoContainer">
        <div className="orderInfoContainerTitle">
          <Title text={"zamów choinkę online"} />
        </div>

        <div className="orderInfoContainerPart">
          <div className="orderInfoContainerLeftPart">
            <div className="orderInfoContainerLeftPartTop">
              <p className="orderInfoContainerLeftPartTopText1">Jesteśmy do Państwa dyspozycji:</p>
              <p className="orderInfoContainerLeftPartTopText2">+48 123 456 789</p>
              <p className="orderInfoContainerLeftPartTopText3">kontakt@choinek.pl</p>
            </div>

            <div className="orderInfoContainerLeftPartBottom">
              <div className="orderInfoContainerLeftPartBottomText1">Zapraszamy w godz. 08:00-22:00</div>
              <div className="orderInfoContainerLeftPartBottomText2">
                Każde zamówienie potwiedzane i uzgadniane jest telefonicznie. Dlatego też pamiętaj, by podać prawidłowy numer telefonu. W przypadku
                błędnych danych kontaktowych zamówienie nie będzie realizowane.
              </div>
              <div className="orderInfoContainerLeftPartBottomText3">Płatność gotówką przy odbiorze lub online.</div>
            </div>
          </div>

          <div className="orderInfoContainerRightPart">
            <div className="orderInfoContainerRightPartContainer">
              <div className="orderInfoContainerRightPartNavLinkElement">
                <img src={assets.drzewkaOzdobne} alt="" className="orderInfoContainerRightPartNavLinkElementImg" />
                <p className="orderInfoContainerRightPartNavLinkElementText">Drzewka ozdobne</p>
              </div>
              <div className="orderInfoContainerRightPartNavLinkElement">
                <img src={assets.choinki} alt="" className="orderInfoContainerRightPartNavLinkElementImg" />
                <p className="orderInfoContainerRightPartNavLinkElementText">Choinki</p>
              </div>
              <div className="orderInfoContainerRightPartNavLinkElement">
                <img src={assets.inne} alt="" className="orderInfoContainerRightPartNavLinkElementImg" />
                <p className="orderInfoContainerRightPartNavLinkElementText">Inne</p>
              </div>
              <div className="orderInfoContainerRightPartNavLinkElement">
                <img src={assets.kwiaty} alt="" className="orderInfoContainerRightPartNavLinkElementImg" />
                <p className="orderInfoContainerRightPartNavLinkElementText">Kwiaty</p>
              </div>
              <div className="orderInfoContainerRightPartNavLinkElement">
                <img src={assets.lampkiChoinkowe} alt="" className="orderInfoContainerRightPartNavLinkElementImg" />
                <p className="orderInfoContainerRightPartNavLinkElementText">Lampki choinkowe</p>
              </div>
              <div className="orderInfoContainerRightPartNavLinkElement">
                <img src={assets.stojaki} alt="" className="orderInfoContainerRightPartNavLinkElementImg" />
                <p className="orderInfoContainerRightPartNavLinkElementText">Stojaki</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
