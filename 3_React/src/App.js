import React from "react";
import "./App.css";
import CityRandomizer from "./CityRandomizer/CityRandomizer";
import { createStore } from "redux";
import cityRandomizerApp from "./reduser";

const store = createStore(cityRandomizerApp);
console.log(store.getState());

function App() {
  return (
    <div className="App">
      <CityRandomizer />
    </div>
  );
}

export default App;
