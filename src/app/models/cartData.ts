export class CartItem {
    //private _qty: number;
    private _cost: number;
    
    constructor(
        public productName: string,
        public productDesc: string,
        public imagelink: string,
        public price: number,
        public quantity: number
    ) {
        //this._qty = quantity;
        
    }

    /* get quantity() {
        return this._qty;
    }

    set quantity(qty: number) {
        this._qty = qty;
    } */

    get cost():number {
        return this.quantity*this.price;
    }
}

export class ShippingDetails {
    constructor(
        public name: string,
        public address: string,
        public city: string,
        public phoneNumber: string
    )
    {}
}