import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

//App component
import App from "./App";

//components LandingPage
import MainStartScreen from "./LandingPage/MainStartScreen";
import MainSecondScreen from "./LandingPage/MainSecondScreen";
import Footer from "./LandingPage/Footer";

//components ShopPage
import Main from "./ShopPage/Main";

//components Checkout
import Checkout from "./Checkout/Checkout";
import Cancel from "./Checkout/Cancel";
import Success from "./Checkout/Success";

import Login from "./Login";



const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" component={App} />
      <Route path="/" component={MainStartScreen} />
      <Route path="/" component={MainSecondScreen} />
      <Route path="/" component={Footer} />
      <Route path="/shop" component={Main} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/login" component={Login} />
    </Routes>
  );
};

export default Routing;
