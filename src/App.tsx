import React from "react";
import "./App.css";
import { initialize } from "@ramp-network/ramp-instant-sdk";

const App: React.FC = () => {
  return (
    <div className="App">
      <button onClick={() => initialize({
        hostAppName: 'Maker DAO',
        hostLogoUrl: 'https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png',
        swapAsset: 'ETH',
        swapAmount: '1500000000000000000',
        userAddress: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
        url: 'https://ri-widget-dev.firebaseapp.com/'
      }).show()}>Click me</button>
    </div>
  );
};

export default App;
