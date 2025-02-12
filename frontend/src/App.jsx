import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Products from "./pages/Products/Products";
import Faq from "./pages/Faq/Faq";
import OurRealizations from "./pages/OurRealizations/OurRealizations";
import Product from "./pages/Product/Product";

function App() {
  return (
    <div>
      {/* <Home /> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="faq" element={<Faq />} />
        <Route path="our-realizations" element={<OurRealizations />} />
        <Route path={`/product/:id`} element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
