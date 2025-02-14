import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product, ProductResponse } from '../types/product.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  constructor(private http: HttpClient) {
    console.log('ProductService initialized with URL:', this.apiUrl);
    this.testConnection();
  }

  private testConnection() {
    console.log('Testing API connection...');
    this.http.get(this.apiUrl, { headers: this.headers }).subscribe({
      next: (response) => console.log('API Test Success:', response),
      error: (error) => console.error('API Test Error:', error)
    });
  }

  // POST new product
  addProduct(product: Product): Observable<ProductResponse> {
    const sanitizedProduct = this.sanitizeProduct(product);
    console.log('Sending sanitized product:', sanitizedProduct);
    
    return this.http.post<ProductResponse>(
      this.apiUrl, 
      sanitizedProduct, 
      { headers: this.headers }
    ).pipe(
      tap(response => {
        console.log('Server response:', response);
        if (!response.success) {
          throw new Error(response.error || 'Failed to add product');
        }
      }),
      catchError(this.handleError)
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.headers }).pipe(
      tap(products => console.log('Products loaded:', products.length)),
      catchError(this.handleError)
    );
  }

  private sanitizeProduct(product: Product): Product {
    const sanitized = {
      ...product,
      description: product.description || '',
      productImage: product.productImage || '',
      shelfLife: product.unlimitedShelfLife ? null : product.shelfLife,
      shelfLifeUnit: product.unlimitedShelfLife ? null : product.shelfLifeUnit,
    };
    console.log('Sanitized product:', sanitized);
    return sanitized;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let message = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else if (typeof error.error === 'object' && error.error !== null) {
      message = error.error.message || error.error.error || error.statusText;
    }
    
    console.error('Error message:', message);
    return throwError(() => new Error(message));
  }

  deleteProduct(id: number): Observable<ProductResponse> {
    return this.http.delete<ProductResponse>(
      `${this.apiUrl}/${id}`,
      { headers: this.headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(id: number, product: Product): Observable<ProductResponse> {
    const sanitizedProduct = this.sanitizeProduct(product);
    return this.http.put<ProductResponse>(
      `${this.apiUrl}/${id}`, 
      sanitizedProduct,
      { headers: this.headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
}
