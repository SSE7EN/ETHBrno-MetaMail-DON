import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataSignature} from "../DataSignature";
import {NGXLogger} from "ngx-logger";

@Injectable({
    providedIn: 'root'
})
export class EmailAuthenticatorService {

    private static API_BASE_URL: string = "http://localhost:8080";
    private static AUTH_ENDPOINT: string = "/registration/{#sig}";

    constructor(
        private http: HttpClient,
        private logger: NGXLogger
    ) {
    }

    public requestAccessToken(signature: DataSignature): void {
        window.location.href = this.prepareURL(signature.data as string);
        // this.http.get(this.prepareURL(signature.data as string)).subscribe(value => {
        //     this.logger.info("Trying to obtain auth token from google");
        // })
    }

    private prepareURL(payloadData: string): string {
        return EmailAuthenticatorService.API_BASE_URL
            + EmailAuthenticatorService.AUTH_ENDPOINT.replace('{#sig}', payloadData);
    }


}
