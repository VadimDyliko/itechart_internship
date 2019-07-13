import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Content from "./components/Content/Content";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./store/reducer";
import {setUser} from "./store/actions";
import "./App.css";

const store = createStore(reducer);

class App extends React.Component {

  componentDidMount() {
    fetch("/profile").then(res => res.json()).then(data => {
      console.log(data);
      store.dispatch(setUser(data))
    }).catch(err => console.log(err))
  }

  render() {
    return (<div className="App">
      <Provider store={store}>
        <NavBar/>
        <Content/>
      </Provider>
    </div>);
  }
}

export default App;
