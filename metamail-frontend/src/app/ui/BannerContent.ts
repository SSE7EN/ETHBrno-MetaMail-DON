import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BannerContent {

    public static EMAIL_REGISTERED = "Your email was successfully added. Transaction hash: {#txHash}";

    public static EMAIL_TRANSFER = "Transaction sent. Receiver {#receiver}";

    public getEmailRegisteredValue(value: any): string{
        return BannerContent.EMAIL_REGISTERED.replace("{#txHash}", value);
    }

    public getEmailTransfer(value: any): string{
        return BannerContent.EMAIL_TRANSFER.replace("{#receiver}", value);
    }

}