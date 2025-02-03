import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, PRODUCT_CATEGORIES } from '../../types/product.types';

@Component({
  selector: 'app-add-produce',
  templateUrl: './add-produce.component.html',
  styleUrls: ['./add-produce.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AddProduceComponent {
  categories = PRODUCT_CATEGORIES;

  formData: Product = {
    productName: '',
    category: '',
    shelfLife: 7,
    shelfLifeUnit: 'Days',
    unlimitedShelfLife: false,
    packUnit: '',
    description: null,
    productImage: null
  };

  loading = false;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  submitForm(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    this.productService.addProduct(this.formData).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private isFormValid(): boolean {
    if (!this.formData.productName || !this.formData.category || !this.formData.packUnit) {
      this.errorMessage = 'Please fill out all required fields.';
      return false;
    }
    return true;
  }

  private handleSuccess(): void {
    this.loading = false;
    this.router.navigate(['/product'], {
      queryParams: { refresh: Date.now().toString() }
    });
  }

  private handleError(error: Error): void {
    console.error('Error adding product:', error);
    this.loading = false;
    this.errorMessage = 'Failed to add product. Please try again.';
  }
}
