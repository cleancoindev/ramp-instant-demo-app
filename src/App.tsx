import React from "react";
import "./App.css";
import { initialize } from "@ramp-network/ramp-instant-sdk";

const App: React.FC = () => {
  return (
    <div className="App">
      <button
        onClick={() =>
          initialize({
            hostAppName: "Maker DAO",
            hostLogoUrl:
              "https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png",
            swapAmount: "100000000000000000", // 10 ** 17
            swapAsset: "ETH",
            url: process.env.REACT_APP_URL,
            userAddress: "0xe2E0256d6785d49eC7BadCD1D44aDBD3F6B0Ab58"
          }).show()
        }
      >
        Buy ETH tokens with Ramp Instant Widget
      </button>

      <button
        onClick={() =>
          initialize({
            hostAppName: "Maker DAO",
            hostLogoUrl:
              "https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png",
            swapAmount: "100000000000000000", // 10 ** 17
            swapAsset: "0xDAI...",
            url: process.env.REACT_APP_URL,
            userAddress: "0xe2E0256d6785d49eC7BadCD1D44aDBD3F6B0Ab58"
          }).show()
        }
      >
        Buy DAI tokens with Ramp Instant Widget
      </button>
    </div>
  );
};

export default App;
