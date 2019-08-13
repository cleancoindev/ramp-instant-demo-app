import React, { useState, useMemo } from "react";
import "./App.css";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import { BetaBanner, Code } from "./components";
import styles from "./components.module.scss";
import { Decimal } from "decimal.js-light";
import { generateIntegrationCode } from './helpers';

function convertIntStringToWeiString(amount: string): string {
  try {
    const multiplier = new Decimal(10).pow(18);
    return new Decimal(amount).times(multiplier).toString();
  } catch (e) {
    return '0';
  }
}

const tokenName = process.env.REACT_APP_TOKEN_NAME;

const App: React.FC = () => {
  const [address, setAddress] = useState(
    "0xe2E0256d6785d49eC7BadCD1D44aDBD3F6B0Ab58",
  );

  const [amount, setAmount] = useState("1");

  const [asset, setAsset] = useState<string>("ETH");

  const handleSubmitButtonClick = () => {
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
      swapAsset: asset,
      // url: process.env.REACT_APP_URL,
      url: "https://ri-widget-dev.firebaseapp.com/",
      userAddress: address,
    })
      .on("*", console.log)
      .show();
  };

  const sampleCode = useMemo(() => generateIntegrationCode({
    swapAmount: convertIntStringToWeiString(amount || '0'),
    swapAsset: asset,
    userAddress: address,
  }), [amount, asset, address]);

  return (
    <div className="App">
      <BetaBanner />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Ramp Instant Demo</h1>

          <label className={styles.label}>
            Buyer's ETH address:
            <input
              className={styles.input}
              value={address}
              onChange={e => setAddress((e.target as HTMLInputElement).value)}
            />
          </label>

          <label className={styles.label}>
            Token / ETH amount:
            <input
              className={styles.input}
              value={amount}
              onChange={e => setAmount((e.target as HTMLInputElement).value)}
            />
          </label>

          <div className={styles.label}>
            Asset:
            <div className={styles.assetRadioContainer}>
              <label
                className={styles.label}
                style={{ display: "block" }}
                htmlFor="ethRadio"
              >
                <input
                  type="radio"
                  className={styles.radio}
                  name="asset"
                  value="ETH"
                  onChange={() => setAsset("ETH")}
                  checked={asset === "ETH"}
                  id="ethRadio"
                />
                ETH
              </label>
              <label
                className={styles.label}
                style={{ display: "block" }}
                htmlFor="tokenRadio"
              >
                <input
                  type="radio"
                  className={styles.radio}
                  name="asset"
                  value={tokenName}
                  onChange={() => setAsset(tokenName!)}
                  checked={asset === tokenName}
                  id="tokenRadio"
                />
                {tokenName}
              </label>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleSubmitButtonClick}>
              Buy with Ramp Instant
            </button>
          </div>
        </div>
        <Code code={sampleCode} />
      </div>
    </div>
  );
};

export default App;
