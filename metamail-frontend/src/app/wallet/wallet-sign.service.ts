import {Injectable} from '@angular/core';
import Web3 from "web3";
import {WalletActionType} from "./wallet-action-type";

@Injectable({
    providedIn: 'root'
})
export class WalletSignService {

    constructor() {
    }

    async signMessage(message: string): Promise<string> {
        if (!window.ethereum) throw new Error("Metamask wallet not connected :/");

        // connect and get metamask account
        const accounts = await window.ethereum.request({method: WalletActionType.REQUEST_ACCOUNT});

        // message to sign
        console.log({message});

        // hash message
        const hashedMessage = Web3.utils.sha3(message);
        console.log({hashedMessage});


        // sign hashed message
        const [signerAccount] = accounts;
        const signature: Promise<string> = window.ethereum.request({
            method: WalletActionType.SIGN_DATA,
            params: [hashedMessage, signerAccount],
        });
        console.log({signature});

        return signature;

    }


}
