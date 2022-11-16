import "./App.css";
import Navigation from "./LandingPage/Navigation";
import MainStartScreen from "./LandingPage/MainStartScreen";
import MainSecondScreen from "./LandingPage/MainSecondScreen";
import Footer from "./LandingPage/Footer";
import Main from "./ShopPage/Main";

const App = () => {
  return (
    /*<div>
      <div>
        <Navigation />
      </div>
      <div id="fullPage">
        <MainStartScreen />
      </div>
      <div>
        <MainSecondScreen />
      </div>
      <div id="fullPage">
        <Footer />
      </div>
    </div>*/
    <div>

      <Main />
    </div>
  );
};

export default App;
