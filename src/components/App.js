import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import MainPage from "./pages/MainPage";

import UserContext from "./context/UserContext";

import "../assets/css/App.css";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ContactPage from "./pages/ContactPage";
import ProductPage from "./pages/ProductPage";
import CheckOutPage from "./pages/CheckOutPage";
import CartPage from "./pages/CartPage";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <UserContext.Provider value={{cart, setCart}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
