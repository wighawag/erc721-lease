# Lease Contract

The contract in this repo allow anyone to rent their NFT token. the contract act as a registry for lease.

With lease, token owner retain ownership. This allow the onwer to continue trading its token, while users are able to use their token in every place that support such registry.
The obvious use case is off-chain reading for nft display, etc...
But this could be potentially used on-chain too for various use cases.

Note that each registration is itself an NFT token representing a lease. They can itself be sub-leased.

This allow the owner to

- retain ownership while renting its tokens
- give ownership for loan (for example) but lease the token to itself before hand to continue renting the token

This allow users to

- use token
- sub-rent the token
- sell renting right

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
