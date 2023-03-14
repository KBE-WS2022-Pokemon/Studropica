import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components Navbar
import Navigation from "./LandingPage/Navigation";

//components LandingPage
import App from "./App";
import MainStartScreen from "./LandingPage/MainStartScreen";
import MainSecondScreen from "./LandingPage/MainSecondScreen";
import Footer from "./LandingPage/Footer";

//components ShopPage
import Main from "./ShopPage/Main";

//components Checkout
import Checkout from "./CheckoutPage/Checkout";
import Shipping from "./CheckoutPage/Shipping";
import Cancel from "./CheckoutPage/Cancel";
import Success from "./CheckoutPage/Success";

//components ProductPage
import Product from "./ProductPage/Product";

//components CartPage
import Cart from "./CartPage/Cart";

//keycloak

    ReactDOM.render(
      <React.StrictMode>
        <Router>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/shop" element={<Main />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shipping" element={<Shipping />} />
          </Routes>
        </Router>
      </React.StrictMode>,
      document.getElementById("root")
    );
