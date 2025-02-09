import React, { useEffect, useState } from 'react';
import "./products.css";
import Navbar from '../../components/Navbar/Navbar';
import Title from '../../components/Title/Title';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const choinkiResponse = await axios.get("http://127.0.0.1:5000/choinki");
        const produktyResponse = await axios.get("http://127.0.0.1:5000/produkty");
        
        // Połącz dane choinek i produktów
        const allProducts = [
          ...choinkiResponse.data.map(choinka => ({
            ...choinka,
            ceny: choinka.ceny ? choinka.ceny : [], // Upewnij się, że ceny są zdefiniowane
            rozmiary: choinka.rozmiary ? choinka.rozmiary : [], // Upewnij się, że rozmiary są zdefiniowane
            ilosci: choinka.ilosci ? choinka.ilosci : [], // Upewnij się, że ilości są zdefiniowane
            zdjecia: choinka.zdjecia ? choinka.zdjecia : [], // Upewnij się, że zdjęcia są zdefiniowane
          })),
          ...produktyResponse.data.map(produkt => ({
            ...produkt,
            ceny: [produkt.cena], // Upewnij się, że ceny są w formie tablicy
            rozmiary: [], // Produkty mogą nie mieć rozmiarów
            ilosci: [0], // Ustaw domyślną ilość
            zdjecia: [], // Produkty mogą nie mieć zdjęć
          }))
        ];
        
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    let sortedProducts = [...filteredProducts];
    if (e.target.value === "price-asc") {
      sortedProducts.sort((a, b) => Math.min(...a.ceny) - Math.min(...b.ceny));
    } else if (e.target.value === "price-desc") {
      sortedProducts.sort((a, b) => Math.min(...b.ceny) - Math.min(...a.ceny));
    }
    setFilteredProducts(sortedProducts);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.split(',').map(Number);
    setPriceRange(value);
    filterProducts(value, category, availability);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    filterProducts(priceRange, e.target.value, availability);
  };

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
    filterProducts(priceRange, category, e.target.value);
  };

  const filterProducts = (priceRange, category, availability) => {
    let filtered = products.filter(product => {
      const price = Math.min(...(product.ceny || [0])); // Użyj domyślnej wartości 0, jeśli ceny są undefined
      const isInPriceRange = price >= priceRange[0] && price <= priceRange[1];
      const isInCategory = category ? product.kategoria_nadrzedna === category : true;
      const isAvailable = availability === "all" ? true : (availability === "available" ? (product.ilosci[0] || 0) > 0 : (product.ilosci[0] || 0) === 0);
      return isInPriceRange && isInCategory && isAvailable;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="products">
      {/* <Navbar /> */}
      <div className="productContainer">
        <div className="productContainerLeftPart">
          <div className="productContainerLeftPartTop">
            <p className="productContainerLeftPartTopText">Filtry</p>
          </div>
          <div className="productContainerLeftPartMiddle">
            <div className="filterSection">
              <label>Cena:</label>
              <input
                type="range"
                min="0" max="1000"
                value={priceRange[0]}
                onChange={handlePriceChange}
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={handlePriceChange}
              />
            </div>
            <div className="filterSection">
              <label>Kategoria:</label>
              <select value={category} onChange={handleCategoryChange}>
                <option value="">Wszystkie</option>
                <option value="Kategoria Nadrzędna 1">Kategoria Nadrzędna 1</option>
                <option value="Kategoria Nadrzędna 2">Kategoria Nadrzędna 2</option>
              </select>
            </div>
            <div className="filterSection">
              <label>Dostępność:</label>
              <select value={availability} onChange={handleAvailabilityChange}>
                <option value="all">Wszystkie</option>
                <option value="available">Dostępne</option>
                <option value="unavailable">Niedostępne</option>
              </select>
            </div>
          </div>
        </div>
        <div className="productContainerRightPart">
          {loading ? (
            <p>Ładowanie produktów...</p>
          ) : (
            <div className="productContainerRightPartProductsContainer">
              {filteredProducts.map(product => (
                <NavLink to={`/products/${product.id}`} key={product.id} className="productContainerRightPartProductsContainerElement">
                  <div className="productItemImageContainer">
                    {product.zdjecia.length > 0 ? (
                      <img src={product.zdjecia[0]} alt={product.nazwa} />
                    ) : (
                      <img src="default-image.jpg" alt="Domyślne zdjęcie" />
                    )}
                  </div>
                  <div className="productItemTextContainer">
                    <h3 className="productItemTextContainerText">{product.nazwa}</h3>
                    <p className="productItemInfo">{product.opis}</p>
                    <p className="productItemInfo">Cena: {Math.min(...product.ceny)} PLN</p>
                    <p className="productItemInfo">Dostępność: {product.ilosci[0] > 0 ? 'Dostępne' : 'Niedostępne'}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;