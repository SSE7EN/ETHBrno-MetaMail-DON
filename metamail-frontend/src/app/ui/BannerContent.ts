import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BannerContent {

    public static EMAIL_REGISTERED = "Your email was successfully added. Transaction hash: {#txHash}";

    public static EMAIL_TRANSFER = "Transaction sent. Receiver {#receiver}";

    public static EMAIL_NOT_FOUND = "Given email does not exist";

    public getEmailRegisteredValue(value: any): string{
        return BannerContent.EMAIL_REGISTERED.replace("{#txHash}", value);
    }

    public getEmailTransfer(value: any): string{
        return BannerContent.EMAIL_TRANSFER.replace("{#receiver}", value);
    }

}