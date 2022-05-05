import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "../src/pages/Home";
import AddEdit from "../src/pages/AddEdit";
import About from "../src/pages/About";
import View from "../src/pages/View";
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={AddEdit} />
          <Route path="/update/:id" component={AddEdit} />
          <Route path="/view/:id" component={View} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
