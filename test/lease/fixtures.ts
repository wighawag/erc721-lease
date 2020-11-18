import {Contract} from 'ethers';
import {ethers, deployments} from 'hardhat';

export type User = {
  address: string;
  Lease: Contract;
  TestToken: Contract;
};

async function createUsers(Lease: Contract, TestToken: Contract) {
  const users: User[] = [];
  const unnamed = await ethers.getUnnamedSigners();
  for (const signer of unnamed) {
    Lease = Lease.connect(signer);
    TestToken = TestToken.connect(signer);
    const user: User = {
      address: await signer.getAddress(),
      Lease,
      TestToken,
    };
    users.push(user);
  }
  return users;
}

export const setup = deployments.createFixture(async () => {
  await deployments.fixture(['Lease']);
  const Lease = await ethers.getContract('Lease');
  const TestTokenFactory = await ethers.getContractFactory('TestToken');
  const TestToken = await TestTokenFactory.deploy();
  const users = await createUsers(Lease, TestToken);
  return {
    users,
    Lease,
    TestToken,
  };
});
