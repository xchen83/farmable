import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'added-product',
  templateUrl: './added-product.component.html',
  styleUrls: ['./added-product.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AddedProductComponent implements OnInit {
  products: any[] = [];
  loading = true;
  errorMessage: string | null = null;

  // Inject Router and ProductService into the component
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
}