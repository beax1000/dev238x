import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ItemData, Item } from '../models/itemsData';
import { ItemsDataService } from '../services/itemsDataService';
import { ShoppingCartService } from '../services/shoppingCartService';
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

  constructor(private itemsService: ItemsDataService, private cartService: ShoppingCartService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productName = this.route.snapshot.queryParamMap.get('name');
    if (this.productName != null && this.productName !== '') {
      this.itemsService.getItemsData().subscribe(itemsData => {
        let products: { [key: string]: Item } = this.itemsService.getProducts(itemsData);
        this.item = products[this.productName];
      });
    }
  }

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
