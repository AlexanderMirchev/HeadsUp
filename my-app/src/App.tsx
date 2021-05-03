import React from "react";
import "./App.css";
import GameScreen from "./GameScreen";

function App() {
  // window.screen.orientation.lock("landscape-primary");

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <GameScreen />
    </div>
  );
}

export default App;
