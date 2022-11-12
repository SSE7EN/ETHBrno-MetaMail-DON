import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { EmailInputComponent } from './ui/email-input/email-input.component';
import { FormSubmitBtnComponent } from './ui/form-submit-btn/form-submit-btn.component';

@NgModule({
    declarations: [
        AppComponent,
        EmailInputComponent,
        FormSubmitBtnComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
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
