import { Component, OnInit } from '@angular/core';

import { ItemData, Item } from '../models/itemsData';
import { ItemsDataService } from '../services/itemsDataService';
//import { strictEqual } from 'assert';
import { ShoppingCartService } from '../services/shoppingCartService';
import { CartItem } from '../models/cartData';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  itemsData: ItemData[];
  selectedCatIndex: number;
  selectedSubCatIndex: number;
  selectedCatName: string;
  selectedSubCatName: string;
  itemsShownCount: number;
  itemsInSubCatCount: number;
  items: Item[];
  sortBy: string;
  sortByText: string;
  onlyInStock: boolean;
  private sortByNone: string = "none";
  private sortByPrice: string = "price";
  private sortByAlpha: string = "alpha";
  private sortByRating: string = "rating";

  constructor(private itemsService: ItemsDataService, private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.itemsService.getItemsData().subscribe(itemsData => {
      this.itemsData = itemsData;
      this.sortBy = this.sortByNone;
      this.sortByText = "None";
      this.onlyInStock = false;
      this.updateSelection(0, 0);
    });
  }

  selectCat(iCat: number) {
    this.updateSelection(iCat, 0);
  }

  selectSubCat(iCat: number, iSubCat: number) {
    this.updateSelection(iCat, iSubCat);
  }

  private updateSelection(iCat: number, iSubCat: number) {
    if (this.itemsData) {
      this.selectedCatIndex = iCat;
      let selectedCat = this.itemsData[this.selectedCatIndex];
      this.selectedCatName = selectedCat.category;
      this.selectedSubCatIndex = iSubCat;
      let selectedSubCat = selectedCat.subcategories[this.selectedSubCatIndex];
      this.selectedSubCatName = selectedSubCat.name;
      this.itemsInSubCatCount = selectedSubCat.items.length;
      let items = selectedSubCat.items;
      if (this.onlyInStock)
        items = this.filterInStockOnly(items);
      this.itemsShownCount = items.length;
      this.items = this.performItemsSorting(items);
    }
  }

  toggleInStockOnly(e) {
    this.onlyInStock = e.target.checked;
    //console.log(marked);
    if (this.onlyInStock) {
      this.items = this.filterInStockOnly(this.items);
      this.itemsShownCount = this.items.length;
    }
    else {
      let items: Item[] = this.itemsData[this.selectedCatIndex].subcategories[this.selectedSubCatIndex].items;
      this.items = this.performItemsSorting(items);
    }
  }

  filterInStockOnly(itemsToFilter: Item[]):Item[] {
    var filteredItems: Item[] = [];
    for (let i:number=0; i < itemsToFilter.length; i++) {
      let item = itemsToFilter[i];
      //console.log(item.stock);
      let stock: number = Number(item.stock);
      if (Number.isNaN(stock)) stock = 0;
      if (stock > 0) filteredItems.push(item);
    }
    return filteredItems;
  }

  manageItemsSorting(sortBy: string) {
    switch(sortBy) {
      case this.sortByNone:
        this.sortByText = "None";
        break;
      case this.sortByPrice:
        this.sortByText = "Price";
        break;
      case this.sortByAlpha:
        this.sortByText = "Alphabetical";
        break;
      case this.sortByRating:
        this.sortByText = "Rating";
        break;
    }
    this.sortBy = sortBy;
    this.items = this.performItemsSorting(this.items);
  }

  performItemsSorting(itemsToSort: Item[]): Item[] {
    var sortedItems: Item[] = [];
    switch(this.sortBy) {
      case this.sortByNone:
        sortedItems = itemsToSort;
        break;
      case this.sortByPrice:
        sortedItems = itemsToSort.sort((i1, i2) => i1.price - i2.price);
        break;
      case this.sortByAlpha:
        sortedItems = itemsToSort.sort((i1, i2) => {
          if (i1.name > i2.name) return 1;
          if (i1.name < i2.name) return -1;
          return 0;
        });
        break;
      case this.sortByRating:
        sortedItems = itemsToSort.sort((i1, i2) => {
          if (i1.rating > i2.rating) return 1;
          if (i1.rating < i2.rating) return -1;
          return 0;
        });
        break;
    }
    return sortedItems;
  }

  addProductToCart(item: Item) {
    var ci: CartItem = new CartItem(
      item.name,
      item.description,
      item.imagelink,
      item.price,
      1
    );
    this.cartService.addToCart(ci);
  }

}
