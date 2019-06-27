import React from "react";
import "./App.css";
import { initialize } from "@ramp-network/ramp-instant-sdk";

const App: React.FC = () => {
  return (
    <div className="App">
      <button
        onClick={() =>
          initialize({
            url: process.env.REACT_APP_URL,
            hostAppName: "Test Dharma",
            userAddress: "0xe2E0256d6785d49eC7BadCD1D44aDBD3F6B0Ab58",
            swapAmount: "10",
            swapAsset: "ETH",
            hostLogoUrl: "http://localhost:8080/logo.png"
          }).show()
        }
      >
        Click me
      </button>
    </div>
  );
};

export default App;
