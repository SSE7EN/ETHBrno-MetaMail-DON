import {Component} from '@angular/core';
import {WalletService} from "./wallet/wallet.service";
import {WalletSignService} from "./wallet/wallet-sign.service";
import {NGXLogger} from "ngx-logger";
import {EmailAuthenticatorService} from "./auth/email-authenticator.service";
import {DataSignature} from "./DataSignature";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'MetaMail-frontend';
    public inputEmail: string = "";

    ngOnInit() {
        this.logger.debug("App initialized (｡◕‿◕｡)");
    }

    constructor(
        private logger: NGXLogger,
        private walletService: WalletService,
        private walletSignService: WalletSignService,
        private emailAuth: EmailAuthenticatorService
    ) {
    }


    public handleBtnClick(): void {
        this.logger.log("Data entered: " + this.inputEmail);
        this.walletSignService.signMessage(this.inputEmail).then(value => {
            this.logger.info("Message signed")
            this.logger.log(value);
            return value;
        }).then(value => {
            //Send http request
            this.logger.log("Sending request to auth");
            this.emailAuth.requestAccessToken({data: value} as DataSignature)
        }).catch(reason => {
            this.logger.info("Tx error or rejected");
            this.logger.error(reason);
        })
    }


    //wyslac na back podpis 0x + base 64 plus acces token w auth header

}
