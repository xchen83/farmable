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

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<ProductResponse> {
    const sanitizedProduct = this.sanitizeProduct(product);

    return this.http.post<ProductResponse>(
      this.apiUrl,
      sanitizedProduct,
      { headers: this.headers }
    ).pipe(
      tap(response => console.log('Product added:', response)),
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
}
