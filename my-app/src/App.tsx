import React from "react";
import "./App.css";
import { Game } from "./game-components/Game";

// TODO: change app name
// TODO: add HTTPS to run script
function App() {
  // window.screen.orientation.lock("landscape-primary");

  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
