// src/app/order/order.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faShoppingCart, faChevronDown, faChevronUp, faSync } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '../services/order.service';
// Import the Order interface 
import { Order } from '../order/order.types';
import { interval, Subscription, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

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
  isLoading = true;
  error: string | null = null;
  
  // Auto-refresh state
  pollingEnabled: boolean = true;
  lastRefreshed: Date | null = null;
  refreshingNow: boolean = false;
  
  // FontAwesome icons
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faSync = faSync;

  // Polling variables
  private pollingSubscription: Subscription | null = null;
  private destroy$ = new Subject<void>();
  private pollingInterval = 3000; // 3 seconds polling by default

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
  ) {}

  ngOnInit(): void {
    console.log('OrderComponent initialized');
    this.loadOrders();
    
    // Start polling if enabled
    if (this.pollingEnabled) {
      this.startPolling();
    }

    // Add click event listener to close dropdowns when clicking outside
    document.addEventListener('click', this.closeDropdowns.bind(this));
  }

  ngOnDestroy(): void {
    // Stop polling when component is destroyed
    this.stopPolling();
    this.destroy$.next();
    this.destroy$.complete();

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

  // Toggle auto-refresh
  toggleAutoRefresh(): void {
    this.pollingEnabled = !this.pollingEnabled;
    
    if (this.pollingEnabled) {
      this.startPolling();
    } else {
      this.stopPolling();
    }
  }

  // Manual refresh
  refreshOrders(): void {
    if (this.refreshingNow) return; // Prevent multiple simultaneous refreshes
    
    this.refreshingNow = true;
    this.loadOrders(true);
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
    console.log('Applying filters and sorting', { 
      selectedStatus: this.selectedStatus, 
      selectedSort: this.selectedSort,
      ordersCount: this.orders.length 
    });
    
    // First apply status filter
    if (this.selectedStatus === 'all') {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(order =>
        order.status?.toLowerCase() === this.selectedStatus.toLowerCase()
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
          const aCount = a.customer?.transaction_count || 0;
          const bCount = b.customer?.transaction_count || 0;
          return bCount - aCount;
        });
        break;
      case 'transactions-low':
        this.filteredOrders.sort((a, b) => {
          const aCount = a.customer?.transaction_count || 0;
          const bCount = b.customer?.transaction_count || 0;
          return aCount - bCount;
        });
        break;
    }

    // Update filtered count
    this.filteredCount = this.filteredOrders.length;
    console.log(`Applied filters: ${this.filteredCount} orders remain`);
  }

  // Start polling for new orders
  private startPolling(): void {
    console.log('Starting order polling');
    this.pollingSubscription = interval(this.pollingInterval)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          console.log('Polling for new orders...');
          return this.orderService.getOrders();
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            // Only update if there are actual changes
            const oldOrdersJson = JSON.stringify(this.orders);
            const newOrdersJson = JSON.stringify(response.data);
            
            if (oldOrdersJson !== newOrdersJson) {
              console.log('Orders updated from polling');
              this.updateOrdersData(response.data);
              
              // Show notification or visual indicator that new orders arrived
              this.showNewOrdersNotification();
            } else {
              console.log('Polling completed - no changes detected');
            }
            
            this.lastRefreshed = new Date();
          }
        },
        error: (error) => {
          console.error('Error in polling orders:', error);
          // Keep existing data if there's an error
        }
      });
  }

  // Show notification for new orders (you can implement this)
  private showNewOrdersNotification(): void {
    // You could implement a toast notification here
    // For now we'll just log to console
    console.log('New orders received!');
  }

  // Stop polling - Called in ngOnDestroy
  private stopPolling(): void {
    if (this.pollingSubscription) {
      console.log('Stopping order polling');
      this.pollingSubscription.unsubscribe();
      this.pollingSubscription = null;
    }
  }

  // Load orders from the API
  private loadOrders(isManualRefresh: boolean = false): void {
    if (!isManualRefresh) {
      this.isLoading = true;
    }
    this.error = null;
  
    console.log('OrderComponent: Loading orders...');
  
    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.refreshingNow = false;
        this.lastRefreshed = new Date();
        
        console.log('OrderComponent: Received response:', response);
        
        if (response.success) {
          console.log('OrderComponent: Got successful response with', response.data?.length, 'orders');
          
          // Update orders data
          if (response.data) {
            this.updateOrdersData(response.data);
          } else {
            this.orders = [];
            this.applyFilters();
          }
        } else {
          console.error('OrderComponent: API returned error:', response);
          this.error = response.error || 'Failed to load orders. Please try again.';
        }
      },
      error: (error) => {
        console.error('OrderComponent: Error from API call:', error);
        this.isLoading = false;
        this.refreshingNow = false;
        this.error = 'Failed to connect to the server. Please check your connection.';
      }
    });
  }

  // Update orders data with proper formatting
  private updateOrdersData(data: Order[]): void {
    // Process the data to ensure all required properties
    this.orders = data.map(order => {
      // Ensure customer is properly set
      if (!order.customer && order.customer_name) {
        order.customer = {
          customer_id: order.customer_id,
          name: order.customer_name,
          email: order.customer_email || '',
          transaction_count: order.transaction_count || 0,
          total_spent: 0,
          created_at: ''
        };
      }
      
      return {
        ...order,
        order_items: order.order_items || []
      };
    });
    
    this.applyFilters();
    console.log('OrderComponent: After filtering:', this.filteredOrders.length, 'orders');
  }

  // Handle search input
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

  // Format currency for display
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  // Format date for display
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  // Format time for last refreshed display
  formatTime(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Get CSS class for status badges
  getStatusClass(status: string): string {
    switch (status?.toLowerCase() || '') {
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

  // Capitalize first letter of text
  capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  // Navigate to order details
  viewOrderDetails(order: Order): void {
    this.router.navigate(['/order/detail', order.order_id]);
  }

  // Contact buyer
  contactBuyer(order: Order): void {
    // Make sure customer object exists
    if (!order.customer) {
      // Create default customer object
      order.customer = {
        customer_id: 0,
        name: order.customer_name || 'Unknown Customer',
        email: order.customer_email || '',
        phone: '',
        total_spent: 0,
        transaction_count: 0,
        created_at: new Date().toISOString()
      };
      console.warn('Customer information missing for order:', order.order_id);
    }

    this.router.navigate(['/order/message'], {
      queryParams: {
        customerId: order.customer.customer_id,
        customerName: order.customer.name || 'Customer',
        orderId: order.order_id
      }
    });
  }
}