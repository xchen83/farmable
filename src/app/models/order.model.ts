// src/app/models/order.model.ts
// 修改这个文件使它与 order.types.ts 兼容

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
  product?: Product;  // 改为可选字段
}

export interface Order {
  order_id: number;
  customer_id: number;
  order_date: string;
  required_date: string;
  total_amount: number;
  status: string;
  customer?: Customer;     // 改为可选字段
  order_items?: OrderItem[]; // 改为可选字段
}

export interface OrderResponse {
  success: boolean;
  data: Order[];
}