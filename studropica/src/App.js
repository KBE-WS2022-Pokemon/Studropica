import "./App.css";
// test.js
import Navigation from "./Navigation";

// here I render now only some div tag what i want to do instead is creating the same div tag in navbar and than I want to render navbar as an component in App.js
//


const App = () => {
  return (
    // render navbar component
    <div>
      <Navigation />
    </div>
  );
};

export default App;
