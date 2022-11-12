import {Component} from '@angular/core';
import {WalletService} from "./wallet/wallet.service";
import {WalletSignService} from "./wallet/wallet-sign.service";
import {NGXLogger} from "ngx-logger";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'MetaMail-frontend';
    public inputEmail: string = "";

    myControl = new FormControl('');

    ngOnInit() {
        this.logger.debug("App initialized (｡◕‿◕｡)");
    }

    constructor(
        private logger: NGXLogger,
        private walletService: WalletService,
        private walletSignService: WalletSignService
    ) {
    }


    public handleBtnClick(): void {
        this.logger.log(this.inputEmail);
        this.walletSignService.signMessage(this.inputEmail)
            .catch(reason => this.logger.error(reason));
    }


}
