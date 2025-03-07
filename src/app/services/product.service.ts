import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../types/product.types';

export interface ProductResponse {
  success: boolean;
  data: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://farmable-backend.xchen83.workers.dev/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductResponse>(this.apiUrl)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<ProductResponse>(this.apiUrl, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<ProductResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
