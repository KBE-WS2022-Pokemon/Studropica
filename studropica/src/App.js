import "./App.css";
import MainStartScreen from "./LandingPage/MainStartScreen";
import MainSecondScreen from "./LandingPage/MainSecondScreen";
import Footer from "./LandingPage/Footer";
import "@stripe/stripe-js";
import React, { Component } from "react";

import Cart from "./CartPage/Cart";
import StripeCheckout from "./CheckoutPage/StripeCheckout";
import Checkout from "./CheckoutPage/Checkout";


const App = () => {
  return (
    <div className="App">
      {/*<Product/>*/}
      {/*<Cart /> */}
      <Checkout/>
      {/*<MainStartScreen />
      <MainSecondScreen />
      <Footer />*/}
    </div>
  );
};

export default App;
