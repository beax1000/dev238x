import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ShoppingCartService } from '../services/shoppingCartService';
import { CartItem, ShippingDetails } from '../models/cartData';
import { AppValidators } from '../validators/app-validators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  form: FormGroup;
  formControls = {};
  model: ShippingDetails = new ShippingDetails('', '', '', '');
  modelKeys: string[] = Object.keys(this.model);
  phoneNumberFieldName: string = "phoneNumber";

  constructor(private cartService: ShoppingCartService) {
    this.modelKeys.forEach( (key) => {
      let validators = [];
      // we want to make all fields required
      validators.push(Validators.required);
      // no special chars on all fields
      //validators.push(this.noSpecialChars);
      validators.push(AppValidators.noSpecialChars);
      
      if (key === this.phoneNumberFieldName) {
        // we want to limit to 10 characters max length of phone number
        validators.push(Validators.maxLength(10));
        // we limit phone number to digits only
        //validators.push(this.onlyDigits);
        validators.push(AppValidators.onlyDigits);
      }
      
      this.formControls[key] = new FormControl(this.model[key], validators);
    });
    this.form = new FormGroup(this.formControls);
  }

  ngOnInit() {
  }

  get cartKeys(): string[] {
    return Object.keys(this.cartService.cart);
  }

  get cart(): {[key:string]:CartItem} {
    return this.cartService.cart;
  }

  get subTotal(): number {
    return this.cartService.subtotal;
  }

  get shippingCost(): number {
    return this.cartService.shipCost;
  }

  get taxRate(): number {
    return this.cartService.taxRate;
  }

  get tax(): number {
    return this.cartService.tax;
  }

  sendShippingInfo = () => {
    this.modelKeys.forEach( (elem) => {
      this.model[elem] = this.form.value[elem];
    });
  }

  /* noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value) ? {
        validateEmail: {
        valid: false
        }
    } : null;
  }

  onlyDigits(c: FormControl) {
    let REGEXP = new RegExp(/^\d+$/);

    return REGEXP.test(c.value) ? null : {
      validatePhone: {
        valid: false
      }
    };
  } */

  updateSubTotal() {
    this.cartService.updateSubTotal();
  }

  removeFromCart(key: string) {
    delete this.cart[key];
    this.cartService.updateSubTotal();
  }
}
