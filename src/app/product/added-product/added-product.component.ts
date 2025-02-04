import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, PRODUCT_CATEGORIES } from '../../types/product.types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// Define an interface for products with editing state
interface EditableProduct extends Product {
  isEditing?: boolean;
  originalData?: Product;
}

@Component({
  selector: 'app-added-product',
  templateUrl: './added-product.component.html',
  styleUrls: ['./added-product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class AddedProductComponent {
  products: EditableProduct[] = [];
  categories = PRODUCT_CATEGORIES;
  loading = true;
  errorMessage: string | null = null;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadProducts();
  }

  ngOnInit() {
    // Listen for query param changes to refresh the list
    this.route.queryParams.subscribe(params => {
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    this.errorMessage = null;

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
        console.log('Products loaded:', products);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  // Navigation method
  navigateToAddProduce() {
    this.router.navigate(['/add-produce']);
  }

  deleteProduct(id: number | undefined): void {
    if (!id) {
      console.error('Cannot delete product without ID');
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          // Remove product from local array
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product');
        }
      });
    }
  }

  startEdit(product: EditableProduct): void {
    // Create a backup of the original data
    product.originalData = { ...product };
    product.isEditing = true;
  }

  cancelEdit(product: EditableProduct): void {
    // Restore the original data
    if (product.originalData) {
      Object.assign(product, product.originalData);
    }
    product.isEditing = false;
  }

  saveEdit(product: EditableProduct): void {
    if (!product.id) return;

    this.productService.updateProduct(product.id, product).subscribe({
      next: (response) => {
        if (response.data) {
          Object.assign(product, response.data);
        }
        product.isEditing = false;
        alert('Product updated successfully');
      },
      error: (error) => {
        console.error('Error updating product:', error);
        alert('Failed to update product');
        this.cancelEdit(product);
      }
    });
  }
}