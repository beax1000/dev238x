import { Component, OnInit } from '@angular/core';


import { ItemsDataService } from '../services/itemsDataService';
import { ItemData, ProductInfo, TopSevenProducts } from '../models/itemsData';
//import * as $ from 'jquery';
//import 'popper.js';
//import 'bootstrap';
//import 'bootstrap/js/dist/carousel';

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
  //marked: boolean = false;

  constructor(private itemsService: ItemsDataService) {
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
      console.log(this.topProducts);
      console.log(this.itemsData[0]);
    });
  }

  ngOnInit() {
    $('.carousel').carousel('cycle');

    $('.carousel').on('slid.bs.carousel', function () {
      var toStopShow: boolean = $('#toggleShow').attr("stop-show") == "true" ? true : false;
      if (toStopShow) {
        //$('.carousel').carousel('dispose');
        $('.carousel').attr('data-interval', "false");
        $('.carousel').carousel('pause');
        
      }
      else {
        $('.carousel').attr('data-interval', 3000);
        $('.carousel').carousel('cycle');
      }

    });

    /* $('.carousel').on('slide.bs.carousel', function () {
      var toStopShow: boolean = $('#toggleShow').attr("stop-show") == "true" ? true : false;
      if (toStopShow) {
        //$('.carousel').carousel('dispose');
        $('.carousel').attr('data-interval', "false");
        $('.carousel').carousel('pause');
        
      }

    }); */

    $('.carousel').on('mouseleave', function() {
      var toStopShow: boolean = $('#toggleShow').attr("stop-show") == "true" ? true : false;
      if (toStopShow) {
        $('.carousel').carousel('dispose');
        /* $('.carousel').attr('data-interval', "false");
        $('.carousel').carousel('pause'); */
        
      }
    });
  }

  toggleShow(e) {
    var marked: boolean = e.target.checked;
    $('#toggleShow').attr('stop-show', marked ? "true" : "false");
    if (marked) {
      //$('.carousel').carousel('pause');
      $('.carousel').attr('data-interval', "false");
      $('.carousel').carousel('pause');

      
    }
    else {

      //$('.carousel').carousel('cycle');
      /* $('.carousel').carousel({
        interval: 3000
      }); */


      $('.carousel').attr('data-interval', 3000);
      $('.carousel').carousel('cycle');
    }
  }
}
