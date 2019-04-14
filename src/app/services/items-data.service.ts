import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { map, catchError, publishReplay, refCount } from 'rxjs/operators';

import { ItemData, Item, ProductInfo } from '../models/itemsData';
import { RandomUtilsService } from '../services/random-utils.service';

@Injectable()
export class ItemsDataService {
    private itemsData: Observable<ItemData[]> | null = null;
    private topProducts: ProductInfo[] | null = null;
    private products: { [key: string]: Item } | null = null;

    constructor(private http: Http, private randomService: RandomUtilsService) {

    }

    public getItemsData(): Observable<ItemData[]> {
        // rubric81
        // Data was accessed using the Azure Web API and not a local file
        if (this.itemsData === null) {
            this.itemsData = this.http.get(' https://webmppcapstone.blob.core.windows.net/data/itemsdata.json')
                .pipe(
                    map(items => {
                        return items.json() as ItemData[];
                    }),
                    publishReplay<ItemData[]>(1),
                    refCount(),
                    catchError(err => this.handleError(err))
                );
        }
        return this.itemsData;
    }

    public getTopProducts(nTopProducts: number, itemsData: ItemData[]): ProductInfo[] {
        if (this.topProducts === null || this.topProducts.length !== nTopProducts) {
            // maintain the list of selected products to avoid the same product is added multiple times
            let addedProducts: {[key:string]: Item} = {};
            this.topProducts = new Array(nTopProducts);
            // randomly choose nTopProducts top products to show in our carousel
            var iProd: number = 0;
            var nAttempt: number = 1;   // attempt number
            var nMaxAttempts: number = 100;   // max number of attempts to retrieve products
            var nCats: number = itemsData.length;  // number of total categories in our product catalog
            while (iProd < nTopProducts && nAttempt <= nMaxAttempts) {
                // randomly choose a category
                let iCat: number = this.randomService.randomInt(0, nCats - 1);
                let cat = itemsData[iCat];
                // randomly choose a subcategory
                let iSubCat = this.randomService.randomInt(0, cat.subcategories.length - 1);
                let subCat = cat.subcategories[iSubCat];
                if (subCat != null) {
                    // randomly choose an item
                    let iItem = this.randomService.randomInt(0, subCat.items.length - 1);

                    let item = subCat.items[iItem];

                    if (item != null && (!addedProducts.hasOwnProperty(item.name))) {
                        this.topProducts[iProd] = {
                            name: item.name,
                            description: item.description,
                            imagelink: item.imagelink,
                            category: item.category,
                            subcategory: item.subcategory
                        };
                        addedProducts[item.name] = item;
                        iProd++;
                    }
                }
                nAttempt++;
            }
        }
        return this.topProducts;
    }

    public getProducts(itemsData: ItemData[]): { [key: string]: Item } {
        if (this.products === null) {
            this.products = {};
            for (let iCat: number=0; iCat < itemsData.length; iCat++) {
                for (let iSubCat: number=0; iSubCat < itemsData[iCat].subcategories.length; iSubCat++) {
                    this.normalizeArray<Item>(itemsData[iCat].subcategories[iSubCat].items, 'name', this.products);
                }
            }
        }
        return this.products;
    }

    private normalizeArray<T>(array: Array<T>, indexKey: keyof T, dictionary: { [key: string]: T }) {
        for (let i = 0; i < array.length; i++) {
            const key = (array[i][indexKey] as unknown) as string;
            dictionary[key] = array[i]
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
