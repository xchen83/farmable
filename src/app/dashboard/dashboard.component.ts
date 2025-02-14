import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    RouterLink, 
    HeaderComponent,
    TagComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router) { }

  // Navigation method
  navigateToAddProduce() {
    this.router.navigate(['/add-produce']);
  }

  // Navigation method
  navigateToAddInventory() {
    this.router.navigate(['/add-inventory']);
  }

  // Data
  time: string = '12:15';

  // Notification data
  notifications = [
    {
      message: 'Carrots - pounds (5 lbs remaining)',
      type: 'low-in-stock'
    },
    {
      message: 'Order #12345 needs confirmation',
      type: 'normal'
    }
  ];

  // Inventory data
  inventoryItems = [
    {
      name: 'Fuji apple - pounds',
      remaining: '60 lbs'
    },
    {
      name: 'Carrot - pounds',
      remaining: '60 lbs'
    }
  ];

  // Product data
  products = [
    {
      name: 'Fuji apple - pounds',
      sku: 'OCCKFHTA',
      image: '/frame-2981.svg'
    },
    {
      name: 'Carrot - pounds',
      sku: 'FABOFHTD',
      image: '/image.svg'
    }
  ];
}
