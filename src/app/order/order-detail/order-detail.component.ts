// src/app/order/order-detail/order-detail.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem } from '../../models/order.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="detail-container">
    <!-- Loading state -->
    <div *ngIf="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading order details...</p>
    </div>

    <!-- Error state -->
    <div *ngIf="error" class="error-message">
      {{ error }}
      <button class="back-button" (click)="goBack()">Go Back</button>
    </div>

    <!-- Order details -->
    <div *ngIf="!isLoading && !error && order">
      <div class="header">
          <h1>{{(order.customer && order.customer.name) || restaurantName}}</h1>
          <button class="btn-contact-buyer" (click)="contactBuyer()">
              <span class="contact-icon">💬</span>
              Contact Buyer
          </button>
      </div>

      <div class="section-card">
          <div class="section-title">
              <h2>Order Detail (#{{order.order_id || orderId}})</h2>
          </div>
          <div class="section-content">
              <div class="info-row">
                  <span class="info-label">Placed on:</span>
                  <span class="info-value">{{formatDate(order.order_date)}}</span>
              </div>
              <div class="info-row">
                  <span class="info-label">Required by:</span>
                  <span class="info-value">{{formatDate(order.required_date)}}</span>
              </div>
              <div class="info-row">
                  <span class="info-label">Delivery method:</span>
                  <span class="info-value">{{deliveryMethod}}</span>
              </div>
              <div class="info-row">
                  <span class="info-label">Total order value:</span>
                  <span class="info-value">{{formatCurrency(order.total_amount)}}</span>
              </div>
              <div class="info-row">
                  <span class="info-label">Status:</span>
                  <span class="info-value status-badge" [ngClass]="getStatusClass(order.status)">
                    {{order.status}}
                  </span>
              </div>
          </div>
      </div>

      <div class="section-card">
          <div class="section-title">
              <h2>Customer Information</h2>
          </div>
          <div class="section-content">
              <div class="info-row">
                  <span class="info-label">Customer type:</span>
                  <span class="info-value">{{customerType}}</span>
              </div>
              <div class="info-row">
                  <span class="info-label">Previous transactions:</span>
                  <span class="info-value">{{order.customer && order.customer.transaction_count ? order.customer.transaction_count : 0}} completed</span>
              </div>
              <div class="info-row">
                  <span class="info-label">Email:</span>
                  <span class="info-value">{{order.customer && order.customer.email ? order.customer.email : 'N/A'}}</span>
              </div>
          </div>
      </div>

      <div class="section-card">
          <div class="section-title">
              <h2>Request Items</h2>
          </div>
          <div class="section-content no-padding">
              <table class="request-table" *ngFor="let item of orderItems">
                  <tr>
                      <th>Product</th>
                      <td>{{item.product ? item.product.productName : 'N/A'}}</td>
                  </tr>
                  <tr>
                      <th>Requested amount</th>
                      <td>{{item.requested_quantity}} {{item.product ? item.product.packUnit : ''}}</td>
                  </tr>
                  <tr>
                      <th>Fulfilled amount</th>
                      <td>{{item.fulfilled_quantity || 0}} {{item.product ? item.product.packUnit : ''}}</td>
                  </tr>
                  <tr>
                      <th>Remaining amount</th>
                      <td>{{item.remaining_quantity || 'N/A'}} {{item.product ? item.product.packUnit : ''}}</td>
                  </tr>
                  <tr>
                      <th>Fulfillment status</th>
                      <td>
                          <span class="status-icon" [class.status-success]="item.status === 'completed'" 
                                [class.status-fail]="item.status !== 'completed'">
                              {{item.status === 'completed' ? '✓' : '✕'}}
                          </span>
                      </td>
                  </tr>
                  <tr *ngIf="item.system_note">
                      <th>System note</th>
                      <td class="system-note">{{item.system_note}}</td>
                  </tr>
              </table>
          </div>
      </div>

      <div class="section-card" *ngIf="buyerNote">
          <div class="section-title">
              <h2>Notes from buyer</h2>
          </div>
          <div class="section-content">
              <p class="buyer-note">{{buyerNote}}</p>
          </div>
      </div>

      <div class="warning-message" *ngIf="systemWarning">
          {{systemWarning}}
      </div>

      <div class="action-buttons">
          <button class="btn-back" (click)="goBack()">Back to Orders</button>
          <button class="btn-contact" (click)="contactBuyer()">Contact Buyer</button>
          <button class="btn-accept" [disabled]="!canAcceptOrder" (click)="acceptOrder()">{{order.status === 'pending' ? 'Accept Order' : 'Update Order'}}</button>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .detail-container {
      padding: 20px;
      background-color: white;
      max-width: 800px;
      margin: 0 auto;
    }

    .loading-container {
      text-align: center;
      padding: 40px;
    }

    .loading-spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #22c55e;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
      color: #dc2626;
      padding: 16px;
      border: 1px solid #dc2626;
      border-radius: 4px;
      background-color: rgba(220, 38, 38, 0.1);
      margin: 20px 0;
      text-align: center;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .header h1 {
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .btn-contact-buyer {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      color: #22c55e;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-contact-buyer:hover {
      text-decoration: underline;
    }

    .section-card {
      margin-bottom: 16px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }

    .section-title {
      background-color: #f3f4f6;
      padding: 16px;
    }

    .section-title h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }

    .section-content {
      padding: 16px;
      background-color: white;
    }

    .section-content.no-padding {
      padding: 0;
    }

    .info-row {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .info-label {
      font-weight: 600;
      color: #111827;
      width: 160px;
    }

    .info-value {
      color: #374151;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
    }

    .request-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 0;
    }

    .request-table:not(:last-child) {
      margin-bottom: 16px;
    }

    .request-table th,
    .request-table td {
      padding: 12px;
      text-align: left;
      border: 1px solid #e5e7eb;
    }

    .request-table th {
      color: #6b7280;
      font-weight: normal;
      width: 40%;
      background-color: #f9fafb;
    }

    .request-table td {
      background-color: white;
    }

    .status-icon {
      font-size: 20px;
      font-weight: bold;
    }

    .status-success {
      color: #22c55e;
    }

    .status-fail {
      color: #dc2626;
    }

    .system-note {
      color: #dc2626;
    }

    .buyer-note {
      margin: 0;
      line-height: 1.5;
    }

    .warning-message {
      color: #dc2626;
      text-align: center;
      margin: 24px 0;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }

    .btn-back, .btn-contact, .btn-accept {
      padding: 12px;
      border-radius: 8px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      flex: 1;
    }

    .btn-back {
      background-color: #f3f4f6;
      color: #111827;
      border: 1px solid #e5e7eb;
    }

    .btn-back:hover {
      background-color: #e5e7eb;
    }

    .btn-contact {
      background-color: white;
      border: 1px solid #e5e7eb;
      color: #111827;
    }

    .btn-contact:hover {
      background-color: #f9fafb;
    }

    .btn-accept {
      background-color: #22c55e;
      color: white;
    }

    .btn-accept:hover {
      background-color: #16a34a;
    }

    .btn-accept:disabled {
      background-color: #d1d5db;
      cursor: not-allowed;
    }
  `]
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  // Default values for UI display while loading
  orderId: number = 0;
  restaurantName: string = 'Loading...';
  deliveryMethod: string = 'Delivery required';
  customerType: string = 'Restaurant';
  buyerNote: string = 'Hi Sarah, I need this order by Saturday. If delivery is not possible, I can arrange to pick it up from your farm. Please let me know. Thanks!';
  systemWarning: string | null = null;

  // API data 
  order: Order | null = null;
  orderItems: OrderItem[] = [];
  canAcceptOrder: boolean = false;
  isLoading: boolean = true;
  error: string | null = null;
  
  // Polling 
  private pollingSubscription: Subscription | null = null;
  private pollingInterval = 15000; // 15秒轮询一次

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderId = +orderId;
      this.loadOrderDetails(this.orderId);
      this.startPolling(this.orderId);
    } else {
      this.error = 'Order ID is missing';
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  // 开始轮询
  private startPolling(orderId: number): void {
    this.pollingSubscription = interval(this.pollingInterval)
      .pipe(
        switchMap(() => this.orderService.getOrderById(orderId))
      )
      .subscribe({
        next: (response) => {
          if (response.success && response.data && response.data.order) {
            // 检查订单是否有变化
            if (JSON.stringify(this.order) !== JSON.stringify(response.data.order) ||
                JSON.stringify(this.orderItems) !== JSON.stringify(response.data.items)) {
              console.log('Order details updated from polling');
              this.updateOrderData(response.data.order, response.data.items);
            }
          }
        },
        error: (error) => {
          console.error('Error in polling order details:', error);
          // 轮询出错不显示错误给用户，保持原数据
        }
      });
  }

  // 停止轮询
  private stopPolling(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
      this.pollingSubscription = null;
    }
  }

  loadOrderDetails(orderId: number) {
    this.isLoading = true;
    this.error = null;

    this.orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data && response.data.order) {
          this.updateOrderData(response.data.order, response.data.items);
        } else {
          this.error = 'Failed to load order details. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Failed to connect to the server. Please check your connection.';
        console.error('Error fetching order details:', error);
      }
    });
  }

  updateOrderData(order: Order, items: OrderItem[]) {
    this.order = order;
    this.orderItems = items || [];
    
    // 更新UI显示数据
    this.restaurantName = order.customer?.name || 'Customer';
    
    // 检查是否可以接受订单
    this.checkIfOrderCanBeAccepted();
    
    // 检查是否有警告信息
    this.checkForWarnings();
  }

  checkIfOrderCanBeAccepted() {
    if (!this.order) {
      this.canAcceptOrder = false;
      return;
    }
    
    // 如果订单已完成，则不能接受
    if (this.order.status === 'completed') {
      this.canAcceptOrder = false;
      return;
    }
    
    // 检查是否有不可用项目
    const hasUnavailableItems = this.orderItems.some(item => 
      item.status === 'cancelled' || 
      (item.remaining_quantity && item.remaining_quantity > 0)
    );
    
    // 如果没有不可用项目，则可以接受订单
    this.canAcceptOrder = !hasUnavailableItems;
  }

  checkForWarnings() {
    if (!this.order || !this.orderItems || this.orderItems.length === 0) {
      this.systemWarning = null;
      return;
    }
    
    // 检查是否有不可用项目
    const unavailableItems = this.orderItems.filter(item => 
      item.status === 'cancelled' || 
      (item.remaining_quantity && item.remaining_quantity > 0)
    );
    
    if (unavailableItems.length > 0) {
      this.systemWarning = "Order can't be fulfilled completely. Please contact the buyer.";
    } else {
      this.systemWarning = null;
    }
  }

  contactBuyer() {
    if (!this.order || !this.order.customer) {
      return;
    }
    
    this.router.navigate(['/order/message'], { 
      queryParams: { 
        customerId: this.order.customer.customer_id,
        customerName: this.order.customer.name,
        orderId: this.order.order_id
      }
    });
  }

  acceptOrder() {
    if (!this.canAcceptOrder || !this.order) {
      return;
    }
    
    // 设置加载状态
    this.isLoading = true;
    
    // 调用服务更新订单状态
    this.orderService.updateOrderStatus(this.order.order_id, 'accepted').subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          // 更新成功，重新加载订单详情
          this.loadOrderDetails(this.order!.order_id);
        } else {
          this.error = 'Failed to update order status. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Failed to connect to the server. Please check your connection.';
        console.error('Error updating order status:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/order']);
  }

  // 辅助方法
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}