import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  @Output() customerInfo = new EventEmitter();
  infoForm!: FormGroup;
  name: string = '';
  address: string = '';
  creditCard: string = '';
  isValid = false;

  constructor (private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      creditCard: ['', [Validators.required]]
    })
  }

  insertCard(card: any) {
    if (JSON.stringify(card).length === 16) {
      this.creditCard = card;
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  get formName() {
    return this.infoForm.get('name');
  }

  get formAddress() {
    return this.infoForm.get('address');
  }

  get formCard() {
    return this.infoForm.get('creditCard');
  }

  onSubmit() {
    this.customerInfo.emit(this.infoForm.value);
  }
}
