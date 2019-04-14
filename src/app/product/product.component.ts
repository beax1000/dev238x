import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ItemData, Item } from '../models/itemsData';
import { PreviousRouteService } from '../services/previous-route.service'; 
import { ItemsDataService } from '../services/items-data.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem } from '../models/cartData';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productName: string;
  item: Item;
  qtyToBuy: number = 1;
  prevRoute: string;

  constructor(
    private prevRouteService: PreviousRouteService, 
    private itemsService: ItemsDataService, 
    private cartService: ShoppingCartService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    // rubric46
    // The product page is accessible at
    // http://localhost:8080/#/product?name=productname
    this.productName = this.route.snapshot.queryParamMap.get('name');
    // rubric45
    // Clicking the "Back" button should take the user back to where
    // they came from, whether it was the Shopping page or the
    // Product Page. 
    this.prevRoute = this.prevRouteService.previousUrl;
    if (this.productName != null && this.productName !== '') {
      this.itemsService.getItemsData().subscribe(itemsData => {
        let products: { [key: string]: Item } = this.itemsService.getProducts(itemsData);
        this.item = products[this.productName];
      });
    }
  }

  // rubric44
  // Clicking the "Add" button should add the number of units
  // specified in the "Qty" input field of the selected product to the
  // shopping cart
  addProductToCart() {
    var ci: CartItem = new CartItem(
      this.item.name,
      this.item.description,
      this.item.imagelink,
      this.item.price,
      this.qtyToBuy
    );
    this.cartService.addToCart(ci);
  }
}
