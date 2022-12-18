// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IMailMap.sol";

contract MailMap is IMailMap {

    mapping(bytes32 => address) private registeredAddresses;
    mapping(address => bytes32) private registeredEmails;
    address private oracleAddress;

    constructor(
        address  newOracleAddress
    ) {
        oracleAddress = newOracleAddress;
    }

    modifier onlyOracle() {
        require(msg.sender == oracleAddress);
        _;
    }

    function registerEmail(bytes32 emailHash, address evmAddress) onlyOracle external override {
        registeredAddresses[emailHash] = evmAddress;
        registeredEmails[evmAddress] = emailHash;
    }

    function getWalletAddress(bytes32 emailHash) external view override returns(address) {
        require(registeredAddresses[emailHash] != address(0), "Email is not registered");
        return registeredAddresses[emailHash];
    }

    function removeUser() external override {
        bytes32 email = registeredEmails[msg.sender];
        delete registeredAddresses[email];
        delete registeredEmails[msg.sender];
    }

}
