// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// 从order.types导入Order接口
import { Order, OrderResponse } from '../order/order.types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // API基础URL
  private apiUrl = 'https://farmable-backend.xchen83.workers.dev/api'; // 替换为你的实际API地址

  constructor(private http: HttpClient) { }

  /**
   * 获取所有订单
   */
  getOrders(): Observable<{success: boolean, data: Order[]}> {
    return this.http.get<{success: boolean, data: Order[]}>(`${this.apiUrl}/orders`)
      .pipe(
        map(response => {
          // 确保每个订单对象都有customer属性和order_items属性
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
        catchError(this.handleError<{success: boolean, data: Order[]}>('getOrders', {success: false, data: []}))
      );
  }

  /**
   * 根据ID获取订单详情
   */
  getOrderById(orderId: number): Observable<{success: boolean, data: any}> {
    return this.http.get<{success: boolean, data: any}>(`${this.apiUrl}/orders/${orderId}`)
      .pipe(
        map(response => {
          // 确保订单对象有customer属性
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
        catchError(this.handleError<{success: boolean, data: any}>('getOrderById', {success: false, data: null}))
      );
  }

  /**
   * 更新订单状态
   */
  updateOrderStatus(orderId: number, status: string): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${this.apiUrl}/orders/${orderId}/status`, { status })
      .pipe(
        catchError(this.handleError<{success: boolean}>('updateOrderStatus', {success: false}))
      );
  }

  /**
   * 发送消息给买家
   */
  sendMessageToBuyer(orderId: number, customerId: number, message: string): Observable<{success: boolean}> {
    const data = {
      orderId,
      customerId,
      message
    };
    return this.http.post<{success: boolean}>(`${this.apiUrl}/messages`, data)
      .pipe(
        catchError(this.handleError<{success: boolean}>('sendMessageToBuyer', {success: false}))
      );
  }

  /**
   * 搜索订单
   */
  searchOrders(searchTerm: string): Observable<{success: boolean, data: Order[]}> {
    return this.http.get<{success: boolean, data: Order[]}>(`${this.apiUrl}/orders/search?q=${searchTerm}`)
      .pipe(
        map(response => {
          // 确保每个订单对象都有customer属性
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
        catchError(this.handleError<{success: boolean, data: Order[]}>('searchOrders', {success: false, data: []}))
      );
  }

  /**
   * 错误处理
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // 返回空结果，让应用继续运行
      return of(result as T);
    };
  }
}