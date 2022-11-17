import "./App.css";
import Navigation from "./LandingPage/Navigation";
import MainStartScreen from "./LandingPage/MainStartScreen";
import MainSecondScreen from "./LandingPage/MainSecondScreen";
import Footer from "./LandingPage/Footer";
import Main from "./ShopPage/Main";
import CheckoutForm from "./Checkout/stripe";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


//on click of shop or the two shop all buttons the shop site gets displayed

//on click on the shop button the websites routes to the shop page

//to understand this takes me to much time so i first will implement the checkout 

/*const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainStartScreen />} />
          <Route path="/shop" element={<Main />} />
        </Routes>
        <MainSecondScreen />
        <Footer />
      </div>
    </Router>
  );
}*/

const App = () => {
  return (
    <div>
      <CheckoutForm/>
    </div>
  );
}



export default App;

