// rubric47
// The user should a table displaying the product image, name, unit
// price, quantity as an input field, total cost, and a remove button
// for each product in the shopping cart
export class CartItem {
    private _cost: number;
    
    constructor(
        public productName: string,
        public productDesc: string,
        public imagelink: string,
        public price: number,
        public quantity: number
    ) { }

    get cost():number {
        return this.quantity*this.price;
    }
}

// rubric48
// The user should see a form labeled “Enter Shipping Details” that
// has text input fields for the users name, address, city, and phone
// number. These input fields should have placeholders that show
// what they represent. 
export class ShippingDetails {
    constructor(
        public name: string,
        public address: string,
        public city: string,
        public phoneNumber: string
    )
    {}
}