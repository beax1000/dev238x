// rubric57
// The user should see a form with text input fields for name and
// email, a dropdown list for subject, and a text area for a message.
// These fields should have placeholders to show what they
// represent
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