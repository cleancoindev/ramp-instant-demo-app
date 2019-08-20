import Decimal from 'decimal.js-light';

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

export function convertIntStringToWeiString(amount: string): string {
  try {
    const multiplier = new Decimal(10).pow(18);
    return new Decimal(amount).times(multiplier).toString();
  } catch (e) {
    return '0';
  }
}

export function isAmountBelowSafeLimits(amount: string, isToken: boolean): boolean {
  const limit = new Decimal(!isToken ? '10000000000000000' : '2000000000000000000');

  return new Decimal(amount).lte(limit);
}