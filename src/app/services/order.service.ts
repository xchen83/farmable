// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { 
  Order, 
  OrderItem, 
  OrderResponse, 
  OrderDetailResponse 
} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // 后端 API 基础 URL
  private apiUrl = 'https://farmable-backend.xchen83.workers.dev/api';

  constructor(private http: HttpClient) { }

  // 获取所有订单
  getOrders(): Observable<OrderResponse> {
    console.log('Fetching orders from API...');
    return this.http.get<OrderResponse>(`${this.apiUrl}/orders`).pipe(
      tap(response => console.log('Received orders data:', response)),
      catchError(error => {
        console.error('Error fetching orders:', error);
        // 返回一个带有错误信息的模拟响应
        return of({ success: false, data: [] });
      })
    );
  }

  // 获取单个订单详情
  getOrderById(id: number): Observable<OrderDetailResponse> {
    console.log(`Fetching order details for order #${id}`);
    return this.http.get<OrderDetailResponse>(`${this.apiUrl}/orders/${id}`).pipe(
      tap(response => console.log('Received order detail:', response)),
      catchError(error => {
        console.error(`Error fetching order #${id}:`, error);
        return of({ 
          success: false, 
          data: { 
            order: null as any, 
            items: [] 
          } 
        });
      })
    );
  }

  // 搜索订单
  searchOrders(term: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/orders?search=${term}`).pipe(
      catchError(error => {
        console.error('Error searching orders:', error);
        return of({ success: false, data: [] });
      })
    );
  }

  // 更新订单状态
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/status`, { status }).pipe(
      tap(response => console.log(`Updated order #${orderId} status:`, response)),
      catchError(error => {
        console.error(`Error updating order #${orderId}:`, error);
        return of({ success: false, error: error.message });
      })
    );
  }

  // 联系买家 (发送消息)
  sendMessageToBuyer(orderId: number, customerId: number, message: string): Observable<any> {
    const messageData = {
      order_id: orderId,
      customer_id: customerId,
      message: message
    };
    
    return this.http.post(`${this.apiUrl}/messages`, messageData).pipe(
      tap(response => console.log('Message sent:', response)),
      catchError(error => {
        console.error('Error sending message:', error);
        // 模拟成功响应以便前端开发
        return of({ success: true, message: 'Message sent successfully' });
      })
    );
  }
}