import React from "react";
import SingIn from "./components/SingIn/SingIn";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import "./App.css";

const store = createStore(reducer);
//console.log(store.getStore());

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SingIn />
      </Provider>
    </div>
  );
}

export default App;
