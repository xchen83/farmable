import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Product interface
export interface Product {
  product_id: number;
  productName: string;
  category: string;
  packUnit: string;
}

// OrderItem interface
export interface OrderItem {
  order_item_id: number;
  product_id: number;
  requested_quantity: number;
  fulfilled_quantity?: number;
  remaining_quantity?: number;
  unit_price: number;
  status: string;
  system_note?: string;
  product: Product;
}

// Customer interface
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

// Main Order interface
export interface Order {
  order_id: number;
  order_date: string;
  required_date: string;
  total_amount: number;
  status: string;
  customer: Customer;
  order_items: OrderItem[];
}

// Order List Item interface (for /list endpoint)
export interface OrderListItem {
  order_id: number;
  order_date: string;
  required_date: string;
  order_status: string;
  total_amount: number;
  customer_name: string;
  transaction_count: number;
  items: {
    productName: string;
    requested_quantity: number;
    fulfilled_quantity?: number;
    remaining_quantity?: number;
    status: string;
    system_note?: string;
    packUnit: string;
  }[];
}

export interface OrderResponse {
  success: boolean;
  data: Order[];
}

export interface OrderListResponse {
  success: boolean;
  data: OrderListItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://farmable-backend.xchen83.workers.dev/api';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/orders`);
  }

  getOrderList(): Observable<OrderListResponse> {
    return this.http.get<OrderListResponse>(`${this.apiUrl}/orders/list`);
  }

  searchOrders(term: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/orders?search=${term}`);
  }
}
