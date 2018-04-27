import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css']
})
export class CustomerPaymentComponent implements OnInit {

  rForm: FormGroup;
  public flag: Boolean = false;

  ngOnInit() {
  }

  constructor(private fb: FormBuilder) {
    console.log("Constructor Called");
    this.rForm = fb.group({
      'cardNumber': [null, Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])],
      'expiryMonth': [null, Validators.compose([Validators.required, Validators.maxLength(2), Validators.minLength(1)])],
      'expiryYear': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2)])],
      'cvCode': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])],
    });
  }

  radioClick(para) {
    this.flag = para;
    if (this.flag) {
      this.rForm.get('cardNumber').disable();
      this.rForm.get('expiryMonth').disable();
      this.rForm.get('expiryYear').disable();
      this.rForm.get('cvCode').disable();
      console.log("Disabling Form");
    }
    else {
      this.rForm.get('cardNumber').enable();
      this.rForm.get('expiryMonth').enable();
      this.rForm.get('expiryYear').enable();
      this.rForm.get('cvCode').enable();
      console.log("Enabling Form");
    }
  }

  makePayment() {
    swal(
      'Thank You!',
      'Your order has been placed',
      'success'
    )
  }

  payment(data) {

  }


}
