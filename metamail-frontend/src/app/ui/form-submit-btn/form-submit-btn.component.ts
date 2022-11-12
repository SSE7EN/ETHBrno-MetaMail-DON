import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-submit-btn',
  templateUrl: './form-submit-btn.component.html',
  styleUrls: ['./form-submit-btn.component.css']
})
export class FormSubmitBtnComponent implements OnInit {

  public emailFormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
