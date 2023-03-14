import "./App.css";
import MainStartScreen from "./LandingPage/MainStartScreen";
import MainSecondScreen from "./LandingPage/MainSecondScreen";
import Footer from "./LandingPage/Footer";
import "@stripe/stripe-js";
import React, { Component } from "react";
import { ProductContext } from "./Context/ProductContext";

//todo can be removed later. just for checking the components
import Cart from "./CartPage/Cart";
import Checkout from "./CheckoutPage/Checkout";
import Shipping from "./CheckoutPage/Shipping";
import { useState } from "react";


import { getUser, login, logout } from "./auth_helper";
const App = () => {
  return (
    <div className="App">
      {/*<Product/>*/}
      {/*<Cart />*/}
      {/*<Checkout/>*/}
      {/*<Shipping/>*/}
      <MainStartScreen />
      <MainSecondScreen />
      <Footer />
    </div>
  );
};

export default App;
