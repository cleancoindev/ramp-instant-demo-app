import React, { useState } from "react";
import "./App.css";
import { initialize } from "@ramp-network/ramp-instant-sdk";


const App: React.FC = () => {
  const [address, setAddress] = useState("0xe2E0256d6785d49eC7BadCD1D44aDBD3F6B0Ab58");
  const [amount, setAmount] = useState("10000000000000000"); // 10 ** 16 = 0.01 ETH

  const [addressCandidate, setAddressCandidate] = useState(address);
  const [amountCandidate, setAmountCandidate] = useState(amount);


  return (
    <div className="App">
      <input value={addressCandidate} onInput={e => setAddressCandidate((e.target as HTMLInputElement).value)} />
      <label>
      {" "} -> {address}
      </label>
      <br/>
      <input value={amountCandidate} onInput={e => setAmountCandidate((e.target as HTMLInputElement).value)} />
      {" "} -> {amount} wei
      <label>
      </label>

      <br/>
      <button
        onClick={() => {
          setAddress(addressCandidate)
          setAmount(amountCandidate)
        }
        }>
        Save custom config
      </button>
      <br />

      <button
        onClick={() =>
          initialize({
            hostAppName: "Maker DAO",
            hostLogoUrl:
              "https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png",
            swapAmount: amount,
            swapAsset: "ETH",
            url: process.env.REACT_APP_URL,
            userAddress: address
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
            swapAmount: amount,
            swapAsset: "DUMMY",
            url: process.env.REACT_APP_URL,
            userAddress: address
          }).show()
        }
      >
        Buy DAI tokens with Ramp Instant Widget
      </button>
    </div>
  );
};

export default App;
