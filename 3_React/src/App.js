import React from "react";
import "./App.css";
import CityRandomizer from "./CityRandomizer/CityRandomizer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import cityRandomizerApp from "./reduser";

const store = createStore(cityRandomizerApp);
console.log(store.getState());

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CityRandomizer />
      </Provider>
    </div>
  );
}

export default App;
