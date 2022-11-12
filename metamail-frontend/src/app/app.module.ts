import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {EmailInputComponent} from './ui/email-input/email-input.component';
import {HttpClientModule} from "@angular/common/http";
import {TransactionInputComponent} from "./ui/transaction-input/transaction-input.component";

@NgModule({
    declarations: [
        AppComponent,
        EmailInputComponent,
        TransactionInputComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        LoggerModule.forRoot({
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.OFF
        }),
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
