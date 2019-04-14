import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';

import { ItemsDataService } from '../services/items-data.service';
import { ItemData, ProductInfo, TopSevenProducts } from '../models/itemsData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemsData: ItemData[];

  nTopProducts: number; // number of top products to select
  topProducts: TopSevenProducts; // top seven products in catalog

  toggleShowCheck: boolean = false;
  // rubric10
  // If the "Toggle Slide Show" switch is checked, the product carousel should automatically 
  // move forward one slide every 3 seconds 
  slideInterval: number = 3000; // corousel's slide interval in milliseconds
  slider: Subscription;

  constructor(
    private itemsService: ItemsDataService) {
    this.nTopProducts = 7;  // we select 7 top products
    this.itemsService.getItemsData().subscribe(itemsData => {
      this.itemsData = itemsData;
      var topProducts: ProductInfo[] = this.itemsService.getTopProducts(this.nTopProducts, this.itemsData);
      this.topProducts = {
        product1: topProducts[0],
        product2: topProducts[1],
        product3: topProducts[2],
        product4: topProducts[3],
        product5: topProducts[4],
        product6: topProducts[5],
        product7: topProducts[6]
      };
    });
  }

  ngOnInit() {
    $('.carousel').attr('data-interval', "false");
    $('.carousel').attr('data-ride', 'false');
  }

  toggleShow(e) {
    var marked: boolean = e.target.checked;
    if (!marked) {
      if (this.slider) {
        this.slider.unsubscribe();
      }
    }
    else {
      // rubric10
      // If the "Toggle Slide Show" switch is checked, the product carousel should automatically 
      // move forward one slide every 3 seconds 
      this.slider = interval(this.slideInterval).subscribe(x => {
        $('.carousel').carousel('next');
      });
      
    }
  }
}
