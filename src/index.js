import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./state/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//DEV -BORRAR
import Cart from "./components/carrito/Cart";
import Home from "./components/Home/Home"

const app = (
  <Provider store={store}>
    <BrowserRouter>
    <Home/>
   
      {/* <App /> */}
    </BrowserRouter>
  </Provider>
);

const target = document.getElementById("root");

ReactDOM.render(app, target);
