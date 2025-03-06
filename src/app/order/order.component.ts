// src/app/order/order.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
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
export class OrderComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  isLoading = false;
  error: string | null = null;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;

  // 轮询变量
  private pollingSubscription: Subscription | null = null;
  private pollingInterval = 30000; // 30秒轮询一次

  // Filtering and sorting properties
  selectedStatus: string = 'all';
  selectedSort: string = 'newest';
  filteredCount: number = 0;

  // Dropdown visibility
  showStatusDropdown: boolean = false;
  showSortDropdown: boolean = false;

  // Auto-accept toggle
  autoAcceptEnabled: boolean = false;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.startPolling();
    // 启用实时更新轮询
    this.startPolling();

    // Add click event listener to close dropdowns when clicking outside
    document.addEventListener('click', this.closeDropdowns.bind(this));
  }

  ngOnDestroy(): void {
    // 组件销毁时停止轮询
    this.stopPolling();

    // Remove event listener
    document.removeEventListener('click', this.closeDropdowns.bind(this));
  }

  // Close dropdowns when clicking outside
  closeDropdowns(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.showStatusDropdown = false;
      this.showSortDropdown = false;
    }
  }

  // Toggle status dropdown
  toggleStatusDropdown(event: Event): void {
    event.stopPropagation();
    this.showStatusDropdown = !this.showStatusDropdown;
    this.showSortDropdown = false;
  }

  // Toggle sort dropdown
  toggleSortDropdown(event: Event): void {
    event.stopPropagation();
    this.showSortDropdown = !this.showSortDropdown;
    this.showStatusDropdown = false;
  }

  // Filter orders by status
  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
    this.showStatusDropdown = false;
  }

  // Sort orders
  sortOrders(sortOption: string): void {
    this.selectedSort = sortOption;
    this.applyFilters();
    this.showSortDropdown = false;
  }

  // Apply filters and sorting
  applyFilters(): void {
    // First apply status filter
    if (this.selectedStatus === 'all') {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(order =>
        order.status.toLowerCase() === this.selectedStatus.toLowerCase()
      );
    }

    // Then apply sorting
    switch (this.selectedSort) {
      case 'newest':
        this.filteredOrders.sort((a, b) =>
          new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
        );
        break;
      case 'oldest':
        this.filteredOrders.sort((a, b) =>
          new Date(a.order_date).getTime() - new Date(b.order_date).getTime()
        );
        break;
      case 'transactions-high':
        this.filteredOrders.sort((a, b) => {
          const aCount = a.customer && a.customer.transaction_count ? a.customer.transaction_count : 0;
          const bCount = b.customer && b.customer.transaction_count ? b.customer.transaction_count : 0;
          return bCount - aCount;
        });
        break;
      case 'transactions-low':
        this.filteredOrders.sort((a, b) => {
          const aCount = a.customer && a.customer.transaction_count ? a.customer.transaction_count : 0;
          const bCount = b.customer && b.customer.transaction_count ? b.customer.transaction_count : 0;
          return aCount - bCount;
        });
        break;
    }

    // Update filtered count
    this.filteredCount = this.filteredOrders.length;
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
            // Only updates if there are actual changes
            if (JSON.stringify(this.orders) !== JSON.stringify(response.data)) {
              console.log('Orders updated from polling');
              this.orders = response.data;
              this.applyFilters();
            }
          }
        },
        error: (error) => {
          console.error('Error in polling orders:', error);
          // Keeps existing data if there's an error
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
          this.applyFilters();
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
            this.applyFilters();
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

  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  viewOrderDetails(order: Order): void {
    this.router.navigate(['/order/detail', order.order_id]);
  }

  contactBuyer(order: Order): void {
    if (!order.customer) {
      this.error = 'Customer information is missing';
      return;
    }

    this.router.navigate(['/order/message'], {
      queryParams: {
        customerId: order.customer.customer_id,
        customerName: order.customer.name,
        orderId: order.order_id
      }
    });
  }
}