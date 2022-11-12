import {Injectable} from '@angular/core';
import Web3 from "web3";

@Injectable({
    providedIn: 'root'
})
export class WalletSignService {

    constructor() {
    }

    async signMessage(message: string) {
        if (!window.ethereum) return alert("Please Install Metamask");

        // connect and get metamask account
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});

        // message to sign
        // const message = "hello";
        console.log({message});

        // hash message
        const hashedMessage = Web3.utils.sha3(message);
        console.log({hashedMessage});


        // sign hashed message
        const [first] = accounts;


        const signature = await window.ethereum.request({
            method: "personal_sign",
            params: [hashedMessage, first],
        });
        console.log({signature});

        // split signature
        const r = signature.slice(0, 66);
        const s = "0x" + signature.slice(66, 130);
        const v = parseInt(signature.slice(130, 132), 16);
        console.log({r, s, v});
    }


}
