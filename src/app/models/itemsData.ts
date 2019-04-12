/* export interface ItemsData {
    category: string;
    subcategories: Array<{
        name: string;
        items: Array<{
            name: string;
            description: string;
            price: number;
            imagelink: string;
            rating: string;
            stock: string;
            category: string;
            subcategory: string;
        }>;
    }>;
} */

export interface Item {
    name: string;
    description: string;
    price: number;
    imagelink: string;
    rating: string;
    stock: string;
    category: string;
    subcategory: string;
}

export interface Subcategory {
    name: string;
    items: Item[];
}

export interface ItemData {
    category: string;
    subcategories: Subcategory[];
}

export interface ProductInfo {
    name: string;
    description: string;
    imagelink: string;
    category: string;
    subcategory: string;
}

export interface TopSevenProducts {
    product1: ProductInfo;
    product2: ProductInfo;
    product3: ProductInfo;
    product4: ProductInfo;
    product5: ProductInfo;
    product6: ProductInfo;
    product7: ProductInfo;
}