import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import React, { useMemo, useState } from 'react';
import './App.css';
import { BetaBanner, Code } from './components';
import styles from './components.module.scss';
import { convertIntStringToWeiString, generateIntegrationCode } from './helpers';
import { ReactComponent as RampLogo } from './ramp_logo_plain.svg';

const tokenName = process.env.REACT_APP_TOKEN_NAME;
const currentNetwork = process.env.REACT_APP_NETWORK_NAME;

const App: React.FC = () => {
  const [address, setAddress] = useState('0xe2E0256d6785d49eC7BadCD1D44aDBD3F6B0Ab58');

  const [amount, setAmount] = useState('1');

  const [asset, setAsset] = useState<string>('ETH');

  const handleSubmitButtonClick = () => {
    let weiAmount: string;

    try {
      weiAmount = convertIntStringToWeiString(amount);
    } catch (e) {
      alert('Supplied amount is not a valid number');
      return;
    }

    new RampInstantSDK({
      hostAppName: 'Maker DAO',
      hostLogoUrl: 'https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png',
      swapAmount: weiAmount,
      swapAsset: asset,
      url: process.env.REACT_APP_URL,
      userAddress: address,
    })
      .on('*', console.log)
      .show();
  };

  const sampleCode = useMemo(
    () =>
      generateIntegrationCode({
        swapAmount: convertIntStringToWeiString(amount || '0'),
        swapAsset: asset,
        userAddress: address,
      }),
    [amount, asset, address],
  );

  return (
    <div className="App">
      <BetaBanner />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Try Ramp Instant</h1>
          <RampLogo style={{ height: '50px', marginBottom: '30px' }} />

          <label className={styles.label}>
            Buyer's ETH address:
            <input
              className={styles.input}
              value={address}
              onChange={(e) => setAddress((e.target as HTMLInputElement).value)}
            />
          </label>

          <label className={styles.label}>
            Token / ETH amount:
            <input
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount((e.target as HTMLInputElement).value)}
            />
          </label>

          <label className={styles.label}>
            Network:
            <select
              disabled
              className={styles.input}
              onChange={() => {}}
            >
               <option value={currentNetwork}>{currentNetwork}</option>
            </select>
          </label>

          <div className={styles.label}>
            Asset:
            <div className={styles.assetRadioContainer}>
              <label className={styles.label} style={{ display: 'block' }} htmlFor="ethRadio">
                <input
                  type="radio"
                  className={styles.radio}
                  name="asset"
                  value="ETH"
                  onChange={() => setAsset('ETH')}
                  checked={asset === 'ETH'}
                  id="ethRadio"
                />
                {currentNetwork === 'mainnet' ? '' : currentNetwork+' '}ETH
              </label>
              <label className={styles.label} style={{ display: 'block' }} htmlFor="tokenRadio">
                <input
                  type="radio"
                  className={styles.radio}
                  name="asset"
                  value={tokenName}
                  onChange={() => setAsset(tokenName!)}
                  checked={asset === tokenName}
                  id="tokenRadio"
                />
                {tokenName} token
              </label>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleSubmitButtonClick}>
              Buy with Ramp Instant
            </button>
          </div>

          <footer style={{ marginTop: 'auto', width: '100%', textAlign: 'left', fontSize: '16px', lineHeight: '23px' }}>
            <span style={{ display: 'block' }}>
              Check out the npm package <a href="https://www.npmjs.com/package/@ramp-network/ramp-instant-sdk">here</a>.
            </span>
            <span>
              Join us on Discord <a href="https://discord.gg/zqvFPTB">here</a>.
            </span>
          </footer>
        </div>
        <Code code={sampleCode} />
      </div>
    </div>
  );
};

export default App;
