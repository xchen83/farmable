// src/app/models/order.model.ts

// 产品接口
export interface Product {
    product_id: number;
    productName: string;
    category: string;
    packUnit: string;
  }
  
  // 订单项接口
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
    product: Product;
  }
  
  // 客户接口
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
  
  // 订单接口
  export interface Order {
    order_id: number;
    order_date: string;
    required_date: string;
    total_amount: number;
    status: string;
    customer: Customer;
    order_items: OrderItem[];
  }
  
  export interface OrderResponse {
    success: boolean;
    data: Order[];
  }
  
  export interface OrderDetailResponse {
    success: boolean;
    data: {
      order: Order;
      items: OrderItem[];
    };
  }