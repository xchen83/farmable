// src/app/models/order.model.ts
export interface Product {
  product_id: number;
  productName: string;
  category: string;
  shelfLife?: number;
  shelfLifeUnit?: string;
  unlimitedShelfLife: boolean;
  packUnit: string;
  description?: string;
  productImage?: string;
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
  product?: Product;  // Include related product data
  
  // Additional properties that may come directly from backend joins
  productName?: string;  // For direct join with products table
  category?: string;     // For direct join with products table
  packUnit?: string;     // For direct join with products table
}

export interface Order {
  order_id: number;
  customer_id: number;
  order_date: string;
  required_date: string;
  total_amount: number;
  status: string;
  customer?: Customer;     // Include related customer data
  order_items?: OrderItem[]; // Include related order items
  
  // Additional properties that might come directly from backend
  customer_name?: string;
  customer_email?: string;
  phone?: string;
  transaction_count?: number;
}

export interface OrderResponse {
  success: boolean;
  data: Order[];
}