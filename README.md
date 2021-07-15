# Lease Contract

The contract in this repo allow anyone to rent their NFT token. the contract act as a registry for lease.

With lease, token owner retain ownership. This allow the onwer to continue trading its token, while users are able to use their token in every place that support such registry.
The obvious use case is off-chain reading for nft display, etc...
But this could be potentially used on-chain too for various use cases.

Note that each registration is itself an NFT token representing a lease. They can itself be sub-leased.

This allow the owner to

- retain ownership while renting its tokens
- give ownership for loan (for example) but lease the token to itself before hand to continue renting the token
- have full liberty for lease terms: this is handled through external smart contracts.

This allow users to

- use token
- sub-rent the token
- sell renting right

## Potential Issues

One potential issue is that unless such standard is adopted across marketplaces, marketplaces would not be able to tell potential buyer than the NFT is currently leased. It could potentially even be leased forever (the contract is fully generic, lease's terms are handled through external smart contract)

But if marketplace support it, they could display the current lease and with further standard, terms like duration, etc... could be displayed.


## requirements :

### node

This project requires [node.js](https://nodejs.org/) (tested on v12+)

## intall dependencies :

```bash
yarn install
```

# Development

The following command will test your contracts

```bash
yarn test
```
