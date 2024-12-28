import React from "react";
import "./OrderInfo.css";
import Title from "../Title/Title";
import { categories } from "../../assets/assets";
import CategoryItem from "../CategoryItem/CategoryItem";

const OrderInfo = () => {
  return (
    <div className="orderInfo">
      <div className="orderInfoTitle">
        <Title text="zamów choinkę online" />
      </div>

      {/* Bottom Side */}
      <div className="orderInfoDataContainer">
        {/* Left Side */}
        <div className="orderInfoDataContainerLeft">
          <p classname="orderInfoDataContainerLeftText1">
            Jesteśmy do Państwa dyspozycji:
          </p>

          <div className="porderInfoDataContainerLeftPhone">
            +48 123 456 789
          </div>

          <div className="orderInfoDataContainerLeftEmail">
            kontakt@choinek.pl
          </div>

          <p className="orderInfoDataContainerLeftText2">
            Zapraszamy w godz. 08:00-22:00
          </p>
          <p className="orderInfoDataContainerLeftText3">
            Każde zamówienie potwiedzane i uzgadniane jest telefonicznie.
            Dlatego też pamiętaj, by podać prawidłowy numer telefonu. W
            przypadku błędnych danych kontaktowych zamówienie nie będzie
            realizowane.
          </p>
          <p className="orderInfoDataContainerLeftText4">
            Płatność gotówką przy odbiorze lub online.
          </p>
        </div>

        {/* Right Side */}
        <div className="orderInfoDataContainerRight">
          {/* Mapping Categories */}
          {categories.map((item, index) => (
            <CategoryItem key={index} name={item.name} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
