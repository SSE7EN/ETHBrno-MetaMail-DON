export class ContractProperties {

    public static CONTRACT_ADDRESS = "0xB958209288546aac3D34565977651172f0f958e3";

    public static ABI = [{
        "inputs": [{"internalType": "address", "name": "_oracleAddress", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "inputs": [{"internalType": "bytes32", "name": "emailHash", "type": "bytes32"}],
        "name": "getWalletAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "bytes32", "name": "_emailHash", "type": "bytes32"}, {
            "internalType": "uint8",
            "name": "_v",
            "type": "uint8"
        }, {"internalType": "bytes32", "name": "_r", "type": "bytes32"}, {
            "internalType": "bytes32",
            "name": "_s",
            "type": "bytes32"
        }], "name": "registerEmail", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {"inputs": [], "name": "removeUser", "outputs": [], "stateMutability": "nonpayable", "type": "function"}];



}
