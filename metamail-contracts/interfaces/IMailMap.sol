pragma solidity ^0.8.0;

interface IMailMap {

    function registerEmail(bytes32 emailHash, address evmAddress) external;

    function getWalletAddress(bytes32 emailHash) external view returns(address);

    function removeUser() external;
}
