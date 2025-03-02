import React, { useEffect, useState } from 'react';
import "./products.css";
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
        
        const allProducts = [
          ...choinkiResponse.data.map(choinka => ({
            ...choinka,
            ceny: choinka.ceny ? choinka.ceny : [],
            rozmiary: choinka.rozmiary ? choinka.rozmiary : [],
            ilosci: choinka.ilosci ? choinka.ilosci : [],
            zdjecia: choinka.zdjecia ? choinka.zdjecia : [],
          })),
          ...produktyResponse.data.map(produkt => ({
            ...produkt,
            ceny: [produkt.cena],
            rozmiary: [],
            ilosci: [0],
            zdjecia: [],
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
      const price = Math.min(...(product.ceny || [0]));
      const isInPriceRange = price >= priceRange[0] && price <= priceRange[1];
      const isInCategory = category ? product.kategoria_nadrzedna === category : true;
      const isAvailable = availability === "all" ? true : (availability === "available" ? (product.ilosci[0] || 0) > 0 : (product.ilosci[0] || 0) === 0);
      return isInPriceRange && isInCategory && isAvailable;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="products">
      <div className="filters">
        {/* <div className="filterSection">
          <label>Cena:</label>
          <input
            type="range"
            min="0" max="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
          <span>{priceRange[0]} PLN - {priceRange[1]} PLN</span>
        </div> */}
        <div className="filterSection">
          <label>Kategoria:</label>
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Wszystkie</option>
            <option value="Kategoria Nadrzędna 1">Choinki</option>
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
        <div className="filterSection">
          <label>Sortuj według:</label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="">Domyślnie</option>
            <option value="price-asc">Cena rosnąco</option>
            <option value="price-desc">Cena malejąco</option>
          </select>
        </div>
      </div>
      
      <div className="productContainer">
        {loading ? (
          <p>Ładowanie produktów...</p>
        ) : (
          <div className="productList">
            {filteredProducts.map(product => (
              <NavLink to={`/product/${product.id}`} key={product.id} className="productItem">
                <div className="productImageContainer">
                  {product.zdjecia.length > 0 ? (
                    <img src={product.zdjecia[0]} alt={product.nazwa} className="productImage" />
                  ) : (
                    <img src="default-image.jpg" alt="Domyślne zdjęcie" className="productImage" />
                  )}
                </div>
                <div className="productDetails">
                  <h3>{product.nazwa}</h3>
                  {
                    product.opis.length < 30 ?
                    <p>{product.opis}</p>
                    :<p>{product.opis.substring(0,30)}...</p>
                  }
             
             
                  <p>Cena od: {Math.min(...product.ceny)} PLN</p>
                  {/* <p>Dostępność: {product.ilosci[0] > 0 ? 'Dostępne' : 'Niedostępne'}</p> */}
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;