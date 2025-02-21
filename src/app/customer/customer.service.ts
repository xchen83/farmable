import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Export the interfaces
export interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone?: string;
  total_spent: number;
  transaction_count: number;
  last_transaction_date?: string;
  created_at: string;
}

export interface CustomerResponse {
  success: boolean;
  data: Customer[];
}

export interface CreateCustomerResponse {
  success: boolean;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://farmable-backend.xchen83.workers.dev/api';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.apiUrl}/customers`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  searchCustomers(term: string): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.apiUrl}?search=${term}`);
  }

  createCustomer(customer: { name: string; email: string; phone?: string }): Observable<CreateCustomerResponse> {
    return this.http.post<CreateCustomerResponse>(`${this.apiUrl}/customers`, customer);
  }

  updateCustomer(id: number, customer: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

// Export everything from this file
export * from './customer.service';
