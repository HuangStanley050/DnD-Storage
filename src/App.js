import React from "react";

import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Landing from "./components/Landing";
import DashBoard from "./components/DashBoard";
import DragDrop from "./components/DragDrop";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        div
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/store" component={DragDrop} />
        <Route path="/dashboard" component={DashBoard} />
      </Switch>
    </>
  );
}

export default App;
