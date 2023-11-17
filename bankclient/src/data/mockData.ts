// mockData.ts

export interface Transaction {
    merchant: string;
    category: string;
    amount: number;
}

export const transactions: Transaction[] = [
    { merchant: 'Central Burger', category: 'Cafe and Restaurant', amount: -189.36 },
    { merchant: 'The Market', category: 'Groceries', amount: +92.50 },
    { merchant: 'Tech Shop', category: 'Electronics', amount: -599.99 },
    { merchant: 'Bookstore', category: 'Books', amount: -30.00 },
    { merchant: 'Fitness Center', category: 'Gym', amount: -45.00 },
    { merchant: 'Clothing Store', category: 'Apparel', amount: -75.50 },
    { merchant: 'Gas Station', category: 'Fuel', amount: -40.00 },
    { merchant: 'Online Services', category: 'Subscription', amount: -9.99 },
    { merchant: 'Supermarket', category: 'Groceries', amount: -120.75 },
    { merchant: 'Coffee Shop', category: 'Cafe and Restaurant', amount: -5.50 },
    { merchant: 'Hardware Store', category: 'Home Improvement', amount: -85.00 },
    { merchant: 'Movie Theater', category: 'Entertainment', amount: -15.00 },
    { merchant: 'Health Clinic', category: 'Medical', amount: -120.00 },
    { merchant: 'Travel Agency', category: 'Travel', amount: -500.00 },
    { merchant: 'Home Decor', category: 'Home Goods', amount: -50.00 },
    { merchant: 'Car Repair', category: 'Automotive', amount: -200.00 },
    { merchant: 'Gift Shop', category: 'Gifts', amount: -20.00 },
    { merchant: 'Mobile Carrier', category: 'Utilities', amount: -60.00 },
    { merchant: 'Pet Store', category: 'Pets', amount: -35.50 },
    { merchant: 'Dentist', category: 'Medical', amount: -150.00 },
    { merchant: 'Electronics Store', category: 'Electronics', amount: -120.00 },
    { merchant: 'Home Insurance', category: 'Insurance', amount: -200.00 },
    { merchant: 'Grocery Delivery', category: 'Groceries', amount: -10.00 },
    { merchant: 'Furniture Store', category: 'Home Goods', amount: -300.00 },
    { merchant: 'Music Streaming', category: 'Subscription', amount: -14.99 },
    { merchant: 'Fast Food', category: 'Cafe and Restaurant', amount: -8.50 },
    { merchant: 'Fitness Apparel', category: 'Apparel', amount: -40.00 },
    { merchant: 'Internet Service', category: 'Utilities', amount: -70.00 },
    { merchant: 'Pharmacy', category: 'Medical', amount: -25.50 },
    { merchant: 'Hair Salon', category: 'Personal Care', amount: -50.00 },
    // Add more transactions as needed
];
