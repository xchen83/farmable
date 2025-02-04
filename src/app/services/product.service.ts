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
    this.http.get(this.apiUrl).subscribe({
      next: (response) => console.log('API Test Success:', response),
      error: (error) => console.error('API Test Error:', error)
    });
  }

  // POST new product
  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.apiUrl, product).pipe(
      tap(response => console.log('Product added:', response)),
      catchError(error => {
        console.error('Error adding product:', error);
        return throwError(() => error);
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.headers }).pipe(
      tap(products => console.log('Products loaded:', products.length)),
      catchError(this.handleError)
    );
  }

  private sanitizeProduct(product: Product): Product {
    return {
      ...product,
      description: product.description || null,
      productImage: product.productImage || null,
      shelfLife: product.unlimitedShelfLife ? null : product.shelfLife,
      shelfLifeUnit: product.unlimitedShelfLife ? null : product.shelfLifeUnit,
    };
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || 'An error occurred';
    console.error('API Error:', error);
    return throwError(() => new Error(message));
  }

  deleteProduct(id: number): Observable<ProductResponse> {
    return this.http.delete<ProductResponse>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, this.sanitizeProduct(product));
  }
}
