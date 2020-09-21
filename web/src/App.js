import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./global.css";
import axios from "axios";
import Header from "./pages/header/Header";
import DevelopersList from "./pages/developers/DevelopersList";
import DevelopersForm from "./pages/developers/DevelopersForm";
import Home from "./pages/home/Home";

axios.defaults.baseURL = "http://localhost:3001";

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/developers">
            <DevelopersList />
          </Route>
          <Route exact path="/developers/:id">
            <DevelopersForm />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
