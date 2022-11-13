import "./App.css";
// test.js
import Navigation from "./LandingPage/Navigation";
import MainStartScreen from "./LandingPage/MainStartScreen";
import MainSecondScreen from "./LandingPage/MainSecondScreen";
import Footer from "./LandingPage/Footer";

// here I render now only some div tag what i want to do instead is creating the same div tag in navbar and than I want to render navbar as an component in App.js
//

const App = () => {
  return (
    // render navbar component
    <div>
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
        <Footer/>
      </div>
    </div>
  );
};

export default App;
