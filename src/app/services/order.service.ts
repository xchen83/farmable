// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Order, OrderResponse } from '../order/order.types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // API base URL - Make sure this matches your backend structure
  private apiUrl = 'https://farmable-backend.xchen83.workers.dev/api';

  constructor(private http: HttpClient) { }

  /**
   * Get all orders
   */
  getOrders(): Observable<{success: boolean, data: Order[]}> {
    console.log('Fetching orders from API:', `${this.apiUrl}/orders`);
    return this.http.get<{success: boolean, data: Order[]}>(`${this.apiUrl}/orders`)
      .pipe(
        tap(response => console.log('API Response:', response)),
        map(response => {
          // Ensure each order object has customer and order_items properties
          if (response.success && response.data) {
            response.data = response.data.map(order => ({
              ...order,
              customer: order.customer || { 
                customer_id: 0,
                name: 'Unknown Customer',
                email: '',
                phone: '',
                total_spent: 0,
                transaction_count: 0,
                created_at: new Date().toISOString()
              },
              order_items: order.order_items || []
            }));
          }
          return response;
        }),
        catchError(error => {
          console.error('API Error Details:', error);
          return this.handleError<{success: boolean, data: Order[]}>('getOrders', {success: false, data: []})(error);
        })
      );
  }

  /**
   * Get order by ID
   */
  getOrderById(orderId: number): Observable<{success: boolean, data: any}> {
    console.log('Fetching order details from API:', `${this.apiUrl}/orders/${orderId}`);
    return this.http.get<{success: boolean, data: any}>(`${this.apiUrl}/orders/${orderId}`)
      .pipe(
        tap(response => console.log('Order Details Response:', response)),
        map(response => {
          // Ensure order object has customer property
          if (response.success && response.data && response.data.order) {
            response.data.order.customer = response.data.order.customer || { 
              customer_id: 0,
              name: 'Unknown Customer',
              email: '',
              phone: '',
              total_spent: 0,
              transaction_count: 0,
              created_at: new Date().toISOString()
            };
          }
          return response;
        }),
        catchError(error => {
          console.error('Error fetching order details:', error);
          return this.handleError<{success: boolean, data: any}>('getOrderById', {success: false, data: null})(error);
        })
      );
  }

  /**
   * Update order status
   */
  updateOrderStatus(orderId: number, status: string): Observable<{success: boolean}> {
    console.log('Updating order status:', orderId, status);
    return this.http.put<{success: boolean}>(`${this.apiUrl}/orders/${orderId}/status`, { status })
      .pipe(
        tap(response => console.log('Update status response:', response)),
        catchError(error => {
          console.error('Error updating order status:', error);
          return this.handleError<{success: boolean}>('updateOrderStatus', {success: false})(error);
        })
      );
  }

  /**
   * Send message to buyer
   */
  sendMessageToBuyer(orderId: number, customerId: number, message: string): Observable<{success: boolean}> {
    const data = {
      orderId,
      customerId,
      message
    };
    console.log('Sending message to buyer:', data);
    return this.http.post<{success: boolean}>(`${this.apiUrl}/messages`, data)
      .pipe(
        tap(response => console.log('Message sent response:', response)),
        catchError(error => {
          console.error('Error sending message:', error);
          return this.handleError<{success: boolean}>('sendMessageToBuyer', {success: false})(error);
        })
      );
  }

  /**
   * Search orders
   */
  searchOrders(searchTerm: string): Observable<{success: boolean, data: Order[]}> {
    console.log('Searching orders:', searchTerm);
    return this.http.get<{success: boolean, data: Order[]}>(`${this.apiUrl}/orders/search?q=${searchTerm}`)
      .pipe(
        tap(response => console.log('Search response:', response)),
        map(response => {
          // Ensure each order object has customer property
          if (response.success && response.data) {
            response.data = response.data.map(order => ({
              ...order,
              customer: order.customer || { 
                customer_id: 0,
                name: 'Unknown Customer',
                email: '',
                phone: '',
                total_spent: 0,
                transaction_count: 0,
                created_at: new Date().toISOString()
              },
              order_items: order.order_items || []
            }));
          }
          return response;
        }),
        catchError(error => {
          console.error('Error searching orders:', error);
          return this.handleError<{success: boolean, data: Order[]}>('searchOrders', {success: false, data: []})(error);
        })
      );
  }

  /**
   * Error handler
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // Return empty result to allow app to continue
      return of(result as T);
    };
  }
}