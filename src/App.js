import React from "react";
import logo from "./logo.svg";

import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Landing from "./components/Landing";
import DragDrop from "./components/DragDrop";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/store" component={DragDrop} />
      </Switch>
    </>
  );
}

export default App;
