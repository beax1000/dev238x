export class ContactInfo {
    constructor(
        public name: string,
        public email: string,
        public subject: string,
        public message: string
    )
    {}

    static subjects: string[] = [
        'Where is my order?',
        'Problems with my order',
        'Returns and refunds',
        'Update an order',
        'Payment problems',
        'Invoice request',
        'Other questions on your order'
    ];
}