import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CustomerService, Customer } from './customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  searchTerm: string = '';
  isLoading = false;
  error: string | null = null;

  // Font Awesome icons
  faSearch = faSearch;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.error = null;

    this.customerService.getCustomers().subscribe({
      next: (response) => {
        if (response.success) {
          this.customers = response.data;
          console.log('Loaded customers:', this.customers);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load customers';
        this.isLoading = false;
        console.error('Error fetching customers:', error);
      }
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    if (this.searchTerm.length > 0) {
      this.customerService.searchCustomers(this.searchTerm).subscribe({
        next: (response) => {
          if (response.success) {
            this.customers = response.data;
          }
        },
        error: (error) => {
          console.error('Error searching customers:', error);
        }
      });
    } else {
      this.loadCustomers();
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

  editCustomer(customer: Customer): void {
    // Implement edit functionality
    console.log('Edit customer:', customer);
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.customer_id !== id);
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
          this.error = 'Failed to delete customer';
        }
      });
    }
  }

  async createCustomer(name: string, email: string, phone?: string): Promise<void> {
    try {
      const response = await this.customerService.createCustomer({ name, email, phone }).toPromise();
      if (response?.success) {
        this.loadCustomers(); // Reload the list after creating
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      this.error = 'Failed to create customer';
    }
  }
} 