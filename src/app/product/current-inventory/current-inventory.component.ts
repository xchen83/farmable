import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product.types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

interface InventoryRecord {
  amount: string;
  type: string;
  detail: string;
  date: string;
}

interface InventoryItem {
  name: string;
  listingStatus: 'Active' | 'Draft';
  records: InventoryRecord[];
  category: string;
  listPrice: string;
  expiration: string;
  salesUnit: string;
  quality?: string;
  outOfStockNotice?: string;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-current-inventory',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './current-inventory.component.html',
  styleUrls: ['./current-inventory.component.css']
})
export class CurrentInventoryComponent {
  faPlus = faPlus;
  inventoryItems: InventoryItem[] = [
    {
      name: 'Fuji Apple',
      listingStatus: 'Active',
      records: [
        {
          amount: '45 lbs remaining',
          type: 'Spoilage',
          detail: '22 lbs expired',
          date: 'Now'
        },
        {
          amount: '25 lbs',
          type: 'Farmers\' Market',
          detail: 'Sold 5 lbs',
          date: '10 days ago'
        },
        {
          amount: '30 lbs',
          type: 'Inventory Restock',
          detail: 'Added 45 lbs',
          date: '12 days ago'
        },
        {
          amount: '45 lbs',
          type: 'Inventory Restock',
          detail: 'Added 45 lbs',
          date: '14 days ago'
        }
      ],
      category: 'Fruits',
      listPrice: '$0.99 / lb',
      expiration: 'In 23 days',
      salesUnit: 'Pound',
      quality: 'Grade A',
      outOfStockNotice: 'On',
      description: '✅ Naturally Sweet & Crisp – No need for added sugar!',
      images: ['assets/img/apple-1.png', 'assets/img/apple-tree.png']
    },
    {
      name: 'Shiitake Mushroom',
      listingStatus: 'Draft',
      records: [],
      category: 'Fruits',
      listPrice: '',
      expiration: '23 days',
      salesUnit: 'Pound',
      quality: '',
      outOfStockNotice: 'Off',
      description: 'Our Shiitake Mushrooms are cultivated with care to bring you their...',
      images: ['assets/img/mushroom.png']
    }
  ];

  // Add properties for real products
  realProducts: Product[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private router: Router) {
    this.loadRealProducts();
  }

  loadRealProducts() {
    this.loading = true;
    this.errorMessage = null;

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.realProducts = products;
        this.loading = false;
        console.log('Real products loaded:', products);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  navigateToAddProduce(): void {
    this.router.navigate(['/add-produce']);
  }
} 