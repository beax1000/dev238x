import { Component, OnInit } from '@angular/core';

import { ItemData, Item } from '../models/itemsData';
import { ItemsDataService } from '../services/items-data.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
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

  constructor(
    private itemsService: ItemsDataService, 
    private cartService: ShoppingCartService) { }

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

  // rubric26
  // Clicking on a subcategory should repopulate the grid of products
  // with items from the subcategory that was just clicked. 

  // rubric28
  // The section of the controls bar that displays the number of items
  // shown out of the total number of items in the selected category
  // should update whenever a new subcategory is selected or
  // whenever the "In Stock Only" switch is toggled. 
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
      // rubric27
      // Clicking on a subcategory should change the name of the selected
      // category in the controls bar
      this.selectedSubCatName = selectedSubCat.name;
      this.itemsInSubCatCount = selectedSubCat.items.length;
      let items = selectedSubCat.items.slice();
      if (this.onlyInStock)
        items = this.filterInStockOnly(items);
      this.itemsShownCount = items.length;
      this.items = this.performItemsSorting(items);
    }
  }

  // rubric28
  // The section of the controls bar that displays the number of items
  // shown out of the total number of items in the selected category
  // should update whenever a new subcategory is selected or
  // whenever the "In Stock Only" switch is toggled. 
  toggleInStockOnly(e) {
    this.onlyInStock = e.target.checked;
    if (this.onlyInStock) {
      this.items = this.filterInStockOnly(this.items);
    }
    else {
      let items: Item[] = this.itemsData[this.selectedCatIndex].subcategories[this.selectedSubCatIndex].items.slice();
      this.items = this.performItemsSorting(items);
    }
    this.itemsShownCount = this.items.length;
  }

  filterInStockOnly(itemsToFilter: Item[]):Item[] {
    var filteredItems: Item[] = [];
    for (let i:number=0; i < itemsToFilter.length; i++) {
      let item = itemsToFilter[i];
      let stock: number = Number(item.stock);
      if (Number.isNaN(stock)) stock = 0;
      // rubric29
      // If the "In Stock Only" toggle is checked, only items that are in
      // stock should be shown in the products grid. 
      if (stock > 0) filteredItems.push(item);
    }
    return filteredItems;
  }

  // rubric33
  // Changing the selected sorting method should reorder the
  // products in the grid
  manageItemsSorting(sortBy: string) {
    switch(sortBy) {
      case this.sortByNone:
        this.items = this.itemsData[this.selectedCatIndex].subcategories[this.selectedSubCatIndex].items.slice();
        if (this.onlyInStock)
          this.items = this.filterInStockOnly(this.items);
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

  // rubric30
  // Clicking on the "Add" button inside a grid cell should add 1 unit of
  // the associated product to the shopping cart
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
