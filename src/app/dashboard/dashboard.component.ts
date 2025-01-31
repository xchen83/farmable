import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router) { }

  // Navigation method
  navigateToAddProduce() {
    this.router.navigate(['/add-produce']);
  }

  // Data
  time: string = '12:15';

  notifications: { text: string; type: string }[] = [
    { text: 'Carrots - pounds (5 lbs remaining)', type: 'low-inventory' },
    { text: 'Order #12345 needs confirmation', type: 'order' },
  ];

  inventoryItems: { name: string; remaining: string }[] = [
    { name: 'Fuji apple - pounds', remaining: '60 lbs' },
    { name: 'Carrot - pounds', remaining: '60 lbs' },
  ];

  products: { name: string; sku: string; image: string }[] = [
    { name: 'Fuji apple - pounds', sku: 'OCCKFHTA', image: 'https://via.placeholder.com/50x50' },
    { name: 'Carrot - pounds', sku: 'FABOFHTD', image: 'https://via.placeholder.com/50x50' },
  ];
}
