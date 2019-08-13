import React, { useState } from "react";
import "./App.css";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import { BetaBanner } from "./components";
import styles from "./components.module.scss";
import { Decimal } from "decimal.js-light";

function convertIntStringToWeiString(amount: string): string {
  const multiplier = new Decimal(10).pow(18);
  return new Decimal(amount).times(multiplier).toString();
}

const App: React.FC = () => {
  const [address, setAddress] = useState(
    "0xe2E0256d6785d49eC7BadCD1D44aDBD3F6B0Ab58",
  );

  const [amount, setAmount] = useState("1");

  const handleEthButtonClick = () => {
    let weiAmount: string;

    try {
      weiAmount = convertIntStringToWeiString(amount);
    } catch (e) {
      alert("Supplied amount is not a valid number");
      return;
    }

    new RampInstantSDK({
      hostAppName: "Maker DAO",
      hostLogoUrl:
        "https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png",
      swapAmount: weiAmount,
      swapAsset: "ETH",
      url: "http://localhost:8080/",
      userAddress: address,
    })
      .on("*", console.log)
      .show();
  };

  const handleDaiButtonClick = () => {
    let weiAmount: string;

    try {
      weiAmount = convertIntStringToWeiString(amount);
    } catch (e) {
      alert("Supplied amount is not a valid number");
      return;
    }

    new RampInstantSDK({
      hostAppName: "Maker DAO",
      hostLogoUrl:
        "https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png",
      swapAmount: weiAmount,
      swapAsset: "DUMMY",
      url: process.env.REACT_APP_URL,
      userAddress: address,
    })
      .on("*", console.log)
      .show();
  };

  return (
    <div className="App">
      <BetaBanner />
      <div className={styles.container}>
        <h1 className={styles.heading}>Ramp Instant Demo</h1>

        <label className={styles.label}>
          Buyer's ETH address
          <input
            className={styles.input}
            value={address}
            onChange={e => setAddress((e.target as HTMLInputElement).value)}
          />
        </label>

        <label className={styles.label}>
          Token / ETH amount
          <input
            className={styles.input}
            value={amount}
            onChange={e => setAmount((e.target as HTMLInputElement).value)}
          />
        </label>

        <div className={styles.buttonContainer}>
        <div className={styles.assetButtonContainer}>
            <button className={styles.button} onClick={handleEthButtonClick}>
              Buy ETH
            </button>

            <span>or view integration code</span>
          </div>

          <div className={styles.assetButtonContainer}>
            <button className={styles.button} onClick={handleDaiButtonClick}>
              Buy DAI
            </button>

            <span>or view integration code</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
