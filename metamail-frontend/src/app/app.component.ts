import {Component} from '@angular/core';
import {WalletService} from "./wallet/wallet.service";
import {WalletSignService} from "./wallet/wallet-sign.service";
import {NGXLogger} from "ngx-logger";
import {EmailAuthenticatorService} from "./oracle/email-authenticator.service";
import {DataSignature} from "./DataSignature";
import Web3 from "web3";
import {TransactionInputCommand} from "./ui/transaction-input/TransactionInputCommand";
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from "angular-animations";
import {BannerContent} from "./ui/BannerContent";
import {OracleService} from "./oracle/oracle.service";

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
        //let searchPattern = "?tx=";
        // if (urlPath.includes(searchPattern, 0)) {
        //     let values = urlPath?.split('=');
        //     console.warn(values)
        //     this.bannerMessage = this.bannerContent.getEmailRegisteredValue(values[1])
        //     this.bannerState = true;
        // } else if(urlPath.includes("next", 0)){
        //     console.log(this.getOraclesCalled());
        //     if(this.getOraclesCalled() < OracleService.THRESHOLD) {
        //         try{
        //             this.incrementOraclesCalled();
        //             this.processOracle();
        //         } catch (e) {
        //             this.decrementOraclesCalled();
        //             this.logger.info("Tx error or rejected");
        //             this.logger.error(e);
        //         }
        //     }
        // }
        if(urlPath.includes("next", 0)){
            console.log(this.getOraclesCalled());
            if(this.getOraclesCalled() < OracleService.THRESHOLD) {
                try{
                    this.incrementOraclesCalled();
                    this.processOracle();
                } catch (e) {
                    this.decrementOraclesCalled();
                    this.logger.info("Tx error or rejected");
                    this.logger.error(e);
                }
            }
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
            this.initializeRegistrationState(value);
            this.incrementOraclesCalled();
            this.processOracle();

        }).catch(reason => {
            this.decrementOraclesCalled();
            this.logger.info("Tx error or rejected");
            this.logger.error(reason);
        })
    }

    public handleBannerClose(): void {
        this.bannerState = false;
        this.errorBannerState = false;
    }

    private initializeRegistrationState(value: string): void{
        this.setOracles(OracleService.ORACLES);
        this.setSignature(value);
        this.setOraclesCalled(0);
    }

    private processOracle(): void{
        const oracle = OracleService.requestOracle(this.getOracles());
        this.updateOracles(oracle);
        this.emailAuth.requestAccessToken(oracle, { data: this.getSignature() } as DataSignature)
    }

    private getOracles():string[] {
        return JSON.parse(localStorage.getItem('ORACLES') || '{}');
    }

    private setOracles(oracles: string[]):void {
        localStorage.setItem('ORACLES', JSON.stringify(oracles));

    }

    private setOraclesCalled(called: number):void {
        localStorage.setItem('ORACLES_CALLED', JSON.stringify(called));
    }

    private updateOracles(called: string):void {
        let oracles: string[] = this.getOracles();
        const index: number = oracles.indexOf(called);
        oracles.splice(index, 1);
        this.setOracles(oracles);
    }

    private incrementOraclesCalled():void {
        let called: number = this.getOraclesCalled();
        called++;
        this.setOraclesCalled(called);
    }

    private decrementOraclesCalled():void {
        let called: number = this.getOraclesCalled();
        called--;
        this.setOraclesCalled(called);
    }

    private getSignature():string {
        return localStorage.getItem('SIGNATURE') || '';
    }

    private setSignature(signature: string): void {
        localStorage.setItem('SIGNATURE', JSON.stringify(signature));
    }

    private getOraclesCalled():number {
        return Number.parseInt(localStorage.getItem('ORACLES_CALLED') || '0') ;
    }


}
