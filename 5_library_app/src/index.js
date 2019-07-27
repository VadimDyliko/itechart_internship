import React from "react";
import {render} from "react-dom";
import "./index.css";
import App from "./containers/App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root"));
