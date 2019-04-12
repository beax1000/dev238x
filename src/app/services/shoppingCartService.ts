import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartData';

@Injectable()
export class ShoppingCartService {
    taxRate: number = 0.1;  // fixed tax rate: 10%
    shipCost: number = 0;   // no shipping cost (FREE)
    cart: {[key:string]:CartItem} = {};
    subtotal: number = 0;
    tax: number = 0;

    addToCart(item: CartItem) {
        if (this.cart.hasOwnProperty(item.productName)) 
            this.cart[item.productName].quantity += item.quantity;
        else 
            this.cart[item.productName] = item;
        this.updateSubTotal();
    }

    updateSubTotal() {
        this.subtotal = 0.0;
        for (let productName in this.cart) 
            this.subtotal += this.cart[productName].cost;
        this.tax = this.subtotal * this.taxRate;
    }
}