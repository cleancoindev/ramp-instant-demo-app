interface ICodeGenProps {
  swapAmount: string;
  swapAsset: string;
  userAddress: string;
}

export function generateIntegrationCode(codeParams: ICodeGenProps): string {
  return `
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

new RampInstantSDK({
  hostAppName: 'Maker DAO',
  hostLogoUrl: 'https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png',
  swapAmount: '${codeParams.swapAmount}',
  swapAsset: '${codeParams.swapAsset}',
  userAddress: '${codeParams.userAddress}',
  url: '${process.env.REACT_APP_URL}', // only specify the url if you want to use testnet widget versions
})
  .on('*', console.log)
  .show();
  `.trim();
}
