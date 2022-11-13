import {Component} from '@angular/core';
import {WalletService} from "./wallet/wallet.service";
import {WalletSignService} from "./wallet/wallet-sign.service";
import {NGXLogger} from "ngx-logger";
import {EmailAuthenticatorService} from "./auth/email-authenticator.service";
import {DataSignature} from "./DataSignature";
import Web3 from "web3";
import {TransactionInputCommand} from "./ui/transaction-input/TransactionInputCommand";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {BannerContent} from "./ui/BannerContent";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        fadeInOnEnterAnimation({duration: 1200}),
        fadeOutOnLeaveAnimation({duration: 2000})
    ]
})
export class AppComponent {
    title = 'MetaMail-frontend';
    public inputEmail: string = "";
    public inputTransfer: TransactionInputCommand = {
        target: '',
        amount: 0
    };
    public bannerState: boolean = false;
    public bannerMessage: string = "";

    public errorBannerMessage: string = "";
    public errorBannerState: boolean = false;

    ngOnInit() {
        this.handleAuthRedirectQueryParams();
    }

    constructor(
        private logger: NGXLogger,
        private walletService: WalletService,
        private walletSignService: WalletSignService,
        private emailAuth: EmailAuthenticatorService,
        private bannerContent: BannerContent
    ) {
    }

    private handleAuthRedirectQueryParams(): void {
        //Handle redirect back from oauth flow
        let urlPath = location.href;
        let searchPattern = "?tx=";
        if (urlPath.includes(searchPattern, 0)) {
            let values = urlPath?.split('=');
            console.warn(values)
            this.bannerMessage = this.bannerContent.getEmailRegisteredValue(values[1])
            this.bannerState = true;
        }
    }

    public handleTokenTransfer(): void {
        this.logger.info(this.inputTransfer);

        this.walletSignService.getCurrentAccount().then((eth_accounts: any) => {

            this.logger.info(eth_accounts);

                this.walletSignService.readAccountByHash(Web3.utils.keccak256(this.inputTransfer.target))
                    .then(target_acc => {
                        //Send tx
                        this.logger.info("Found wallet address: " + target_acc);
                        this.walletSignService.initFundsTransfer(eth_accounts, target_acc, this.inputTransfer.amount)
                            .then(value => {
                                this.logger.info("TX: " + value);
                                this.bannerState = true;
                                this.bannerMessage = this.bannerContent.getEmailTransfer(target_acc);
                                return value;
                            }).catch(reason => {
                            this.logger.warn(reason)
                        })

                    }).catch(reason => {
                    this.logger.error("Email not found")
                    this.errorBannerState = true;
                    this.errorBannerMessage = BannerContent.EMAIL_NOT_FOUND;
                    return;
                })

        });


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

    public handleBannerClose(): void {
        this.bannerState = false;
        this.errorBannerState = false;
    }


}
