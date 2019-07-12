import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Content from "./components/Content/Content";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import {setUser} from "./store/actions";
import "./App.css";

const store = createStore(reducer);
console.log(store);

class App extends React.Component {

  componentDidMount(){
    let token = store.getState().token;
    console.log(store.getState());
    if (token) {
      fetch("/profile", {
        method: "GET",
        headers: { "Authorization": `${token}`}
      })
      .then(res=>res.json())
      .then(data=>{
        store.dispatch(setUser(data))
        console.log(data);
      })
      .catch(err=>console.log(err))
    }
  }

  render(){
    return (
      <div className="App">
        <Provider store={store}>
          <NavBar />
          <Content/>
        </Provider>
      </div>
    );
  }
}

export default App;
