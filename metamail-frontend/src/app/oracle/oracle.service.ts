import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OracleService {

    public static THRESHOLD: number = 2;
    private static API_BASE_URL_1: string = "http://localhost:8080";
    private static API_BASE_URL_2: string = "http://localhost:8081";
    private static API_BASE_URL_3: string = "http://localhost:8081";

    public static ORACLES: string[] = [
        OracleService.API_BASE_URL_1,
        OracleService.API_BASE_URL_2,
        OracleService.API_BASE_URL_3
    ]


    public static requestOracle(oracles: string[]): string {
        return oracles[Math.floor(Math.random() * oracles.length)];
    }



}
