import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import store from "../store";


import Header from "./LayoutComponents/Header";
import Login from "./AuthComponents/Login";
import Register from "./AuthComponents/Register";
import Home from "./LayoutComponents/Home";
import Footer from "./LayoutComponents/Footer";


function App() {
  return (
    <Provider store = {store}>
      <Router>
        <div className="container">
          <Header />
          <div className="container-fluid">
          <Route exact path="/" component ={Home} />
          <Route exact path="/login" component ={Login} />
          <Route exact path="/register" component ={Register} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
