import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem, ShippingDetails } from '../models/cartData';
import { AppValidators } from '../validators/app-validators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy  {
  form: FormGroup;
  formControls = {};
  model: ShippingDetails = new ShippingDetails('', '', '', '');
  modelKeys: string[] = Object.keys(this.model);
  phoneNumberFieldName: string = "phoneNumber";
  checkoutAttempted: boolean = false;
  checkoutExecuted: boolean = false;

  constructor(private cartService: ShoppingCartService) {
    // rubric52
    // The form should show validation errors if the form isn’t filled out
    // correctly and the checkout button is pressed

    // rubric80
    // Used jQuery or Angular for data binding

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

  ngOnDestroy() {
    if (this.checkoutExecuted) {
      this.cartService.clearCart();
    }
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

  get total(): number {
    return this.cartService.total;
  }

  checkOut = () => {
    this.modelKeys.forEach( (elem) => {
      this.model[elem] = this.form.value[elem];
    });
    // rubric52
    // The form should show validation errors if the form isn’t filled out
    // correctly and the checkout button is pressed
    this.checkoutAttempted = true;
    // rubric51
    // The checkout button should create an alert based on the users
    // shipping details and total cost
    this.checkoutExecuted = !this.form.invalid;
  }

  // rubric53
  // The cost details section should update if any items are removed
  // from the shopping cart of if any of the item quantities are
  // updated

  // rubric55
  // The cost column in the table should update if the quantity input
  // field is changed
  updateSubTotal() {
    this.cartService.updateSubTotal();
  }

  // rubric53
  // The cost details section should update if any items are removed
  // from the shopping cart of if any of the item quantities are
  // updated

  // rubric54
  // The remove button should remove an item from the shopping
  // cart
  removeFromCart(key: string) {
    delete this.cart[key];
    this.cartService.updateSubTotal();
  }


}
