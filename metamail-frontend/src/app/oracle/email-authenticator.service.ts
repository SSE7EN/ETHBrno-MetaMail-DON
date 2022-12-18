import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataSignature} from "../DataSignature";
import {NGXLogger} from "ngx-logger";

@Injectable({
    providedIn: 'root'
})
export class EmailAuthenticatorService {

    private static API_BASE_URL: string = "http://localhost:8080";
    private static API_BASE_URL_1: string = "http://localhost:8080";
    private static API_BASE_URL_2: string = "http://localhost:8081";
    private static API_BASE_URL_3: string = "http://localhost:8081";
    private static AUTH_ENDPOINT: string = "/registration/{#sig}";

    public static APIS: string[] = [
        EmailAuthenticatorService.API_BASE_URL_1,
        EmailAuthenticatorService.API_BASE_URL_2,
        EmailAuthenticatorService.API_BASE_URL_3
    ]

    constructor(
        private http: HttpClient,
        private logger: NGXLogger
    ) {
    }


    public requestAccessToken(api: string, signature: DataSignature): void {
        console.log(signature.data as string);
        window.location.href = this.prepareURL(api, (signature.data as string).replace(/"/g, ''));
    }

    private prepareURL(api: string, payloadData: string): string {
        return api
            + EmailAuthenticatorService.AUTH_ENDPOINT.replace('{#sig}', payloadData);
    }


}
