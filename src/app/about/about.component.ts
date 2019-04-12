import { Component, OnInit } from '@angular/core';

import { ItemsDataService } from '../services/itemsDataService';
import { ItemData, ProductInfo, TopSevenProducts } from '../models/itemsData';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  itemsData: ItemData[];

  nTopProducts: number; // number of top products to select
  topProducts: ProductInfo[]; // top nTopProducts products in catalog

  constructor(private itemsService: ItemsDataService) { 
    this.nTopProducts = 7;  
    this.itemsService.getItemsData().subscribe(itemsData => {
      this.itemsData = itemsData;
      this.topProducts = this.itemsService.getTopProducts(this.nTopProducts, this.itemsData);
    });
  }

  ngOnInit() {
  }

}
