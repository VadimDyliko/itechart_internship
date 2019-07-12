import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Content from "./components/Content/Content";
import Profile from "./components/Profile/Profile";
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
        <NavBar />
        <Content/>
        <Profile/>
      </Provider>
    </div>
  );
}

export default App;
