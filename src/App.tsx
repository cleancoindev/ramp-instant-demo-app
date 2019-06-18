import React from 'react';
import './App.css';
import { initialize } from '@ramp-network/ramp-instant-sdk';

const App: React.FC = () => {
  return (
    <div className="App">
      <button onClick={() => initialize({ hostAppName: 'Test Dharma', swapAmount: '10', swapAsset: 'ETH', hostLogoUrl: 'http://localhost:8080/logo.png' }).show()}>Click me</button>
    </div>
  );
}

export default App;
