// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Order } from '../order/order.types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // API base URL - Ensure this matches your backend structure exactly
  private apiUrl = 'https://farmable-backend.xchen83.workers.dev/api';
  
  // Keep track of the last fetch time to optimize requests
  private lastFetchTime: Date | null = null;
  
  // BehaviorSubject to allow components to subscribe to order updates
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();
  
  // Flag to track if initial data has been loaded
  private initialDataLoaded = false;

  constructor(private http: HttpClient) {
    console.log('OrderService initialized with API URL:', this.apiUrl);
  }

  /**
   * Get all orders
   */
  getOrders(): Observable<{success: boolean, data: Order[], error?: string}> {
    console.log('Fetching orders from API:', `${this.apiUrl}/orders`);
    
    return this.http.get<{success: boolean, data: Order[]}>(`${this.apiUrl}/orders`)
      .pipe(
        tap(response => {
          console.log('API Response:', response);
          this.lastFetchTime = new Date();
          
          // Ensure customer and order_items are properly formatted
          if (response.success && response.data) {
            const formattedOrders = this.formatOrdersData(response.data);
            
            // Update the BehaviorSubject to notify subscribers
            this.ordersSubject.next(formattedOrders);
            this.initialDataLoaded = true;
          }
        }),
        catchError(error => {
          console.error('API Error Details:', error);
          // Return a default response instead of throwing error
          return of({success: false, data: [], error: error.message});
        })
      );
  }

  /**
   * Format orders data to ensure consistent structure
   */
  private formatOrdersData(orders: Order[]): Order[] {
    return orders.map(order => {
      // Make sure customer object is properly formatted
      if (order.customer_name && !order.customer) {
        order.customer = {
          customer_id: order.customer_id,
          name: order.customer_name,
          email: order.customer_email || '',
          transaction_count: order.transaction_count || 0,
          total_spent: 0,
          created_at: ''
        };
      }
      
      // Make sure order_items is initialized
      if (!order.order_items) {
        order.order_items = [];
      }
      
      return order;
    });
  }

  /**
   * Get order by ID
   */
  getOrderById(orderId: number): Observable<{success: boolean, data: any, error?: string}> {
    console.log('Fetching order details from API:', `${this.apiUrl}/orders/${orderId}`);
    return this.http.get<{success: boolean, data: any}>(`${this.apiUrl}/orders/${orderId}`)
      .pipe(
        tap(response => {
          console.log('Order Details Response:', response);
          
          // Ensure data formatting is correct
          if (response.success && response.data) {
            if (response.data.order && response.data.order.customer_name && !response.data.order.customer) {
              response.data.order.customer = {
                customer_id: response.data.order.customer_id,
                name: response.data.order.customer_name,
                email: response.data.order.customer_email || '',
                transaction_count: response.data.order.transaction_count || 0,
                total_spent: 0,
                created_at: ''
              };
            }
          }
        }),
        catchError(error => {
          console.error('Error fetching order details:', error);
          return of({success: false, data: null, error: error.message});
        })
      );
  }

  /**
   * Update order status
   */
  updateOrderStatus(orderId: number, status: string): Observable<{success: boolean, error?: string}> {
    console.log('Updating order status:', orderId, status);
    return this.http.put<{success: boolean}>(`${this.apiUrl}/orders/${orderId}/status`, { status })
      .pipe(
        tap(response => {
          console.log('Update status response:', response);
          // If status update was successful, refresh orders to update cached data
          if (response.success) {
            this.getOrders().subscribe(); // Silently update the orders cache
          }
        }),
        catchError(error => {
          console.error('Error updating order status:', error);
          return of({success: false, error: error.message});
        })
      );
  }

  /**
   * Create a new order
   */
  createOrder(orderData: any): Observable<{success: boolean, id?: number, error?: string}> {
    console.log('Creating order with data:', orderData);
    return this.http.post<{success: boolean, id?: number}>(`${this.apiUrl}/orders`, orderData)
      .pipe(
        tap(response => {
          console.log('Create order response:', response);
          // If order was created successfully, refresh orders to include the new one
          if (response.success) {
            this.getOrders().subscribe(); // Silently update the orders cache
          }
        }),
        catchError(error => {
          console.error('Error creating order:', error);
          return of({success: false, error: error.message});
        })
      );
  }

  /**
   * Send message to buyer - this endpoint may not exist in your backend yet
   */
  sendMessageToBuyer(orderId: number, customerId: number, message: string): Observable<{success: boolean, message?: string, error?: string}> {
    // This is a mock implementation since your backend may not have this endpoint
    console.log('Mock: Sending message to buyer:', {orderId, customerId, message});
    
    // Return a success response - replace with actual API call when available
    return of({
      success: true, 
      message: 'Message sent successfully (simulated)'
    }).pipe(
      tap(response => console.log('Send message response:', response))
    );
  }

  /**
   * Search orders - this endpoint may not exist in your backend yet
   */
  searchOrders(searchTerm: string): Observable<{success: boolean, data: Order[], error?: string}> {
    // This is a workaround that fetches all orders and filters them client-side
    console.log('Searching orders:', searchTerm);
    return this.getOrders().pipe(
      map(response => {
        if (response.success && response.data) {
          // Filter orders client-side
          const filteredOrders = response.data.filter(order => 
            (order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            order.order_id.toString().includes(searchTerm) ||
            order.order_items?.some(item => 
              item.product?.productName?.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
          
          return {
            success: true,
            data: filteredOrders
          };
        }
        return response;
      })
    );
  }

  /**
   * Check for new orders
   * Returns true if there are new orders compared to the previously cached orders
   */
  checkForNewOrders(): Observable<boolean> {
    return this.http.get<{success: boolean, data: Order[]}>(`${this.apiUrl}/orders`)
      .pipe(
        map(response => {
          if (!response.success || !response.data || !this.initialDataLoaded) {
            return false;
          }
          
          // Compare the current orders with cached orders
          const currentOrders = this.ordersSubject.getValue();
          const newOrderIds = new Set(response.data.map(order => order.order_id));
          const cachedOrderIds = new Set(currentOrders.map(order => order.order_id));
          
          // Check if there are new orders
          for (const id of newOrderIds) {
            if (!cachedOrderIds.has(id)) {
              console.log('New order detected:', id);
              return true;
            }
          }
          
          return false;
        }),
        catchError(error => {
          console.error('Error checking for new orders:', error);
          return of(false);
        })
      );
  }
}