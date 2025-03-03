// src/app/order/order.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model'; // 修复导入路径
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  searchTerm: string = '';
  orders: Order[] = [];
  isLoading = false;
  error: string | null = null;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;

  // 轮询变量
  private pollingSubscription: Subscription | null = null;
  private pollingInterval = 30000; // 30秒轮询一次

  // Added properties for filtering and sorting
  selectedStatus: string = 'all';
  selectedSort: string = 'newest';
  filteredCount: number = 0;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    // 启用实时更新轮询
    this.startPolling();
  }

  ngOnDestroy(): void {
    // 组件销毁时停止轮询
    this.stopPolling();
  }

  // 开始轮询
  private startPolling(): void {
    this.pollingSubscription = interval(this.pollingInterval)
      .pipe(
        switchMap(() => this.orderService.getOrders())
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            // 检查订单是否有变化
            if (JSON.stringify(this.orders) !== JSON.stringify(response.data)) {
              console.log('Orders updated from polling');
              this.orders = response.data;
              this.updateFilteredCount();
            }
          }
        },
        error: (error) => {
          console.error('Error in polling orders:', error);
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

  private loadOrders(): void {
    this.isLoading = true;
    this.error = null;

    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.orders = response.data;
          this.updateFilteredCount();
          console.log('Loaded orders:', this.orders);
        } else {
          this.error = 'Failed to load orders. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Failed to connect to the server. Please check your connection.';
        console.error('Error fetching orders:', error);
      }
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    if (this.searchTerm.length > 0) {
      this.isLoading = true;
      this.orderService.searchOrders(this.searchTerm).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.orders = response.data;
            this.updateFilteredCount();
          } else {
            this.error = 'Search failed. Please try again.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.error = 'Error searching orders.';
          console.error('Error searching orders:', error);
        }
      });
    } else {
      this.loadOrders();
    }
  }

  updateFilteredCount(): void {
    this.filteredCount = this.orders.length;
  }

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
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  viewOrderDetails(order: Order): void {
    this.router.navigate(['/order/detail', order.order_id]);
  }

  contactBuyer(order: Order): void {
    this.router.navigate(['/order/message'], { 
      queryParams: { 
        customerId: order.customer.customer_id,
        customerName: order.customer.name,
        orderId: order.order_id
      }
    });
  }
}