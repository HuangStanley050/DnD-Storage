import React from "react";
import logo from "./logo.svg";
import NavBar from "./components/NavBar";
import DragDrop from "./components/DragDrop";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <DragDrop />
    </div>
  );
}

export default App;
