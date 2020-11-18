// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

import "../base/ERC721Base.sol";

contract TestToken is ERC721Base {
    function mint(address to, uint256 id) external {
        require(_ownerOf(id) == address(0), "ALREADY_EXISTS");
        _mint(to, id);
    }
}
