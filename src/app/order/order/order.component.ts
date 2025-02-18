import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type OrderStatus = 'Pending Acceptance' | 'In Progress' | 'Completed' | 'Cancelled';
type SortOption = 'Frequent Buyer' | 'Latest Order' | 'Highest Value' | 'Lowest Value';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  statusOptions: OrderStatus[] = [
    'Pending Acceptance',
    'In Progress',
    'Completed',
    'Cancelled'
  ];

  sortOptions: SortOption[] = [
    'Frequent Buyer',
    'Latest Order',
    'Highest Value',
    'Lowest Value'
  ];

  selectedStatus: OrderStatus = 'Pending Acceptance';
  selectedSort: SortOption = 'Frequent Buyer';
  filteredCount = 1;
  orderId = '123';

  onStatusChange(status: OrderStatus) {
    this.selectedStatus = status;
    this.updateFilteredCount();
  }

  onSortChange(sortBy: SortOption) {
    this.selectedSort = sortBy;
  }

  private updateFilteredCount() {
    const mockCounts: Record<OrderStatus, number> = {
      'Pending Acceptance': 1,
      'In Progress': 3,
      'Completed': 5,
      'Cancelled': 2
    };
    this.filteredCount = mockCounts[this.selectedStatus];
  }
} 