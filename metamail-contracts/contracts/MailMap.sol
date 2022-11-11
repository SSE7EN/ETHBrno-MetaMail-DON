// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract MailMap {

    mapping(bytes32 => address) registeredAddresses;
    address oracleAddress;

    constructor(
        address  _oracleAddress
    ) {
        oracleAddress = _oracleAddress;
    }

    event AuthorizeEmailRegistrationRequest(address sender);

    modifier onlyOracle() {
        require(msg.sender == oracleAddress);
        _;
    }

    function requestEmailRegistration() external {
        emit AuthorizeEmailRegistrationRequest(msg.sender);
    }

    function registerEmail(bytes32 emailHash, address walletAddress) onlyOracle external {
        registeredAddresses[emailHash] = walletAddress;
    }

    function getWalletAddress(bytes32 emailHash) external view returns(address) {
        return registeredAddresses[emailHash];
    }

}
