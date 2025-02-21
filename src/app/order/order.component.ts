import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { OrderService, Order } from './order.service';

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

  // Added properties for filtering and sorting
  selectedStatus: string = 'all';
  selectedSort: string = 'newest';
  filteredCount: number = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.isLoading = true;
    this.error = null;

    this.orderService.getOrders().subscribe({
      next: (response) => {
        if (response.success) {
          this.orders = response.data;
          this.updateFilteredCount();
        }
        this.isLoading = false;
        console.log('Loaded orders:', this.orders);
      },
      error: (error) => {
        this.error = 'Failed to load orders';
        this.isLoading = false;
        console.error('Error fetching orders:', error);
      }
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    if (this.searchTerm.length > 0) {
      this.orderService.searchOrders(this.searchTerm).subscribe({
        next: (response) => {
          if (response.success) {
            this.orders = response.data;
            this.updateFilteredCount();
          }
        },
        error: (error) => {
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

  onViewOrder(order: Order): void {
    console.log('View order:', order);
    // Implement view logic later
  }
} 