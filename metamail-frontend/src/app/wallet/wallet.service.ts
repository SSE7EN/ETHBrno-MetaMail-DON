import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import Web3Modal from "web3modal";
import {chains} from "@web3modal/ethereum";
import Web3 from "web3";

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    private web3js: any;
    private provider: any;
    private accounts: any;
    private web3Modal: any;

    private accountStatusSource = new Subject<any>();

    constructor() {
        const providerOptions = {};

        this.web3Modal = new Web3Modal({
            network: chains.goerli.network, // optional
            cacheProvider: true, // optional
            providerOptions, // required
            theme: {
                background: "rgb(39, 49, 56)",
                main: "rgb(199, 199, 199)",
                secondary: "rgb(136, 136, 136)",
                border: "rgba(195, 195, 195, 0.14)",
                hover: "rgb(16, 26, 32)"
            }
        });
    }



    async connectAccount() {
        this.web3Modal.clearCachedProvider();

        this.provider = await this.web3Modal.connect(); // set provider
        this.web3js = new Web3(this.provider); // create web3 instance
        this.accounts = await this.web3js.eth.getAccounts();
        this.accountStatusSource.next(this.accounts)
    }

}
