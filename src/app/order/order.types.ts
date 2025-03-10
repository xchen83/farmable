export interface Product {
    product_id: number;
    productName: string;
    category: string;
    shelfLife?: number | null;
    shelfLifeUnit?: string | null;
    unlimitedShelfLife: boolean;
    packUnit: string;
    description?: string | null;
    productImage?: string | null;
}

export interface Customer {
    customer_id: number;
    name: string;
    email: string;
    phone?: string;
    total_spent: number;
    transaction_count: number;
    last_transaction_date?: string;
    created_at: string;
}

export interface OrderItem {
    order_item_id: number;
    order_id: number;
    product_id: number;
    requested_quantity: number;
    fulfilled_quantity?: number;
    remaining_quantity?: number;
    unit_price: number;
    status: string;
    system_note?: string;
    product?: Product;      // Include related product data
    
    // For backward compatibility - sometimes these come directly
    productName?: string;   // Product name from join
    category?: string;      // Product category from join
    packUnit?: string;      // Product packUnit from join
}

export interface Order {
    order_id: number;
    customer_id: number;
    order_date: string;
    required_date: string;
    total_amount: number;
    status: string;
    
    // Customer data can be nested or flattened
    customer?: Customer;      // Nested customer object
    customer_name?: string;   // Flattened customer name
    customer_email?: string;  // Flattened customer email
    transaction_count?: number; // Flattened transaction count
    
    order_items?: OrderItem[]; // Include related order items
}

export interface OrderResponse {
    success: boolean;
    data: Order[];
    error?: string;
}