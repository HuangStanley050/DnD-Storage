import React from "react";

import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Landing from "./components/Landing";
import DashBoard from "./components/DashBoard";
import DragDrop from "./components/DragDrop";
import Data from "./components/Data";

function App() {
  return (
    <main>
      <NavBar />
      <Switch>
        div
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/store" component={DragDrop} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
        <PrivateRoute
          path="/dashboard/data/:type"
          render={props => <Data {...props} />}
        />
      </Switch>
    </main>
  );
}

export default App;
