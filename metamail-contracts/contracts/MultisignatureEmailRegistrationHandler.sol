pragma solidity ^0.8.17;

import "../interfaces/IMailMap.sol";

contract MultiSignatureEmailRegistrationHandler {
    mapping(address => bool) private isValidOracle;
    mapping(bytes32 => uint256) private signaturesMap;
    mapping(address => uint8) private oracleIndex;
    address private admin;
    IMailMap private mailMap;
    uint256 private threshold;
    bytes constant HASH_PREFIX = "\x19Ethereum Signed Message:\n32";
    uint8 private nextOracleIndex;


    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier onlyOracle() {
        require(isValidOracle[msg.sender]);
        _;
    }

    constructor(address[] memory oracles){
        admin = msg.sender;
        threshold = oracles.length;
        for (uint i=0; i < threshold; i++) {
            isValidOracle[oracles[i]] = true;
            oracleIndex[oracles[i]] = nextOracleIndex;
            nextOracleIndex++;
        }
    }

    function setMailMap(IMailMap newMailMap) public onlyAdmin {
        mailMap = newMailMap;
    }

    function signRegistration(bytes32 emailHash, uint8 v, bytes32 r, bytes32 s) public onlyOracle {
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(HASH_PREFIX, emailHash));
        address signer = ecrecover(prefixedHashMessage, v, r, s);
        bytes32 hash = getRegistrationHash(signer, emailHash);
        uint8 signaturesCount = insertSignature(hash);

        if(signaturesCount >= threshold) {
            mailMap.registerEmail(emailHash, signer);
        }

    }

    function getRegistrationHash(address signer, bytes32 emailHash) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(signer, emailHash));
    }

    function insertSignature(bytes32 hash) private returns(uint8) {
        signaturesMap[hash] = signaturesMap[hash] | oracleIndex[msg.sender];
        return getSignaturesCount(hash);
    }

    function getSignaturesCount(bytes32 hash) private view returns(uint8) {
        uint256 sigMap = signaturesMap[hash];
        uint8 count = 0;
        for(uint i = 0; i < 256; i++){
            if(isBitSet(sigMap, uint8(i))) {
                count++;
            }
        }
        return count;
    }

    function isBitSet(uint256 sig, uint8 pos) internal pure returns (bool){
        return (bytes32(sig) & bytes32(uint256(pos))) == bytes32(uint256(pos));
    }

}
