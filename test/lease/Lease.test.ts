import {expect} from '../chai-setup';
import {setup, User} from './fixtures';
import {constants, Contract, ContractReceipt} from 'ethers';
import {waitFor} from '../utils';

async function createLeaseChain(
  users: User[],
  TestToken: Contract,
  Lease: Contract,
  depth: number
) {
  const receipt: ContractReceipt = await waitFor(
    users[0].Lease.create(
      TestToken.address,
      1,
      users[1].address,
      constants.AddressZero
    )
  );

  let prevTokenId;
  if (receipt.events) {
    prevTokenId = receipt.events[0].args?.tokenId;
  } else {
    throw new Error(`no tokenId`);
  }

  for (let i = 0; i < depth; i++) {
    const receipt: ContractReceipt = await waitFor(
      users[i + 1].Lease.create(
        Lease.address,
        prevTokenId,
        users[i + 2].address,
        constants.AddressZero
      )
    );

    if (receipt.events) {
      prevTokenId = receipt.events[0].args?.tokenId;
    } else {
      throw new Error(`no tokenId`);
    }
  }
  return prevTokenId;
}

describe('Lease', function () {
  it('should create lease', async function () {
    const {users, TestToken} = await setup();
    await waitFor(users[0].TestToken.mint(users[0].address, 1));
    await waitFor(
      users[0].Lease.create(
        TestToken.address,
        1,
        users[1].address,
        constants.AddressZero
      )
    );
  });

  it('fails at create lease 8 deep', async function () {
    const {users, TestToken, Lease} = await setup();
    await waitFor(users[0].TestToken.mint(users[0].address, 1));

    const prevTokenId = await createLeaseChain(users, TestToken, Lease, 7);

    await expect(
      users[8].Lease.create(
        Lease.address,
        prevTokenId,
        users[9].address,
        constants.AddressZero
      )
    ).to.revertedWith('INVALID_LEASE_MAX_DEPTH_8');
  });

  it('destroy chain', async function () {
    const {users, TestToken, Lease} = await setup();
    await waitFor(users[0].TestToken.mint(users[0].address, 1));

    const prevTokenId = await createLeaseChain(users, TestToken, Lease, 7);

    await users[0].Lease.destroy(TestToken.address, 1);

    const leased = await Lease.isLeased(TestToken.address, prevTokenId);
    expect(leased).to.be.false;
  });
});
