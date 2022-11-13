import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";


export class InputErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-email-input',
    templateUrl: './email-input.component.html'
})
export class EmailInputComponent implements OnInit {

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    matcher = new InputErrorStateMatcher();

    @Input() value: string = '';
    @Output() valueChange = new EventEmitter<string>();

    public inputValue: string = '';

    constructor() {
    }

    public getErrorMessage() {
        if (this.emailFormControl.hasError('required')) {
            return 'You must enter a value';
        }

        return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
    }

    ngOnInit(): void {
    }

    public _formSubmit(): void {
        this.valueChange.emit(this.inputValue);
    }


}
