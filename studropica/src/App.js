import "./App.css";
import MainStartScreen from "./LandingPage/MainStartScreen";
import MainSecondScreen from "./LandingPage/MainSecondScreen";
import Footer from "./LandingPage/Footer";
import "@stripe/stripe-js";
import React, { Component } from "react";


const App = () => {
  return (
    <div className="App">
      <MainStartScreen />
      <MainSecondScreen />
      <Footer />
    </div>
  );
};

export default App;
