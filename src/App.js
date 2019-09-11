import React from "react";

import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
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
        <PrivateRoute path="/store" component={DragDrop} />
        <PrivateRoute path="/dashboard" component={DashBoard} />
      </Switch>
    </>
  );
}

export default App;
