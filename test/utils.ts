import {ContractReceipt} from 'ethers';

export function waitFor(
  p: Promise<{wait: () => ContractReceipt}>
): Promise<ContractReceipt> {
  return p.then((v) => v.wait());
}
