import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // Farm information
  farmName: string = 'Hearth Farm';
  currentDate: string = '';
  
  // Section visibility state
  inventoryExpanded: boolean = true;
  orderExpanded: boolean = true;
  
  // Order requests
  orderRequests = [
    {
      restaurant: 'Grange Restaurant',
      quantity: '15 lbs',
      product: 'Fuji Apple',
      timeAgo: '8 hrs ago'
    }
  ];

  // Add this property to your component
  showEmptyState: boolean = true; // Set to true to see the empty state

  constructor(private router: Router) {
    // Set current date in format: Thursday, February 20, 2025
    this.setCurrentDate();
  }

  setCurrentDate() {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    this.currentDate = new Date().toLocaleDateString('en-US', options);
  }

  // Navigation methods
  navigateToAddProduce() {
    this.router.navigate(['/add-produce']);
  }

  navigateToAddInventory() {
    this.router.navigate(['/add-inventory']);
  }
  
  // Toggle section expansion
  toggleInventorySection() {
    this.inventoryExpanded = !this.inventoryExpanded;
  }
  
  toggleOrderSection() {
    this.orderExpanded = !this.orderExpanded;
  }
  
  // View order request details
  viewRequest() {
    // Will implement navigation to order request details
    console.log('Viewing request');
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

  getIconSrc(iconType: string): string {
    // Create base64 encoded icons as a fallback
    if (iconType === 'inventory') {
      // This is a green house icon similar to the one in your design
      return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzRDQUY1MCIgZD0iTTEwLDJWNC4yNkwxMiw2TDE0LDQuMjZWMkgxME0xMiwxNkw2LDEwSDhWN0gxNlYxMEgxOEwxMiwxNloiLz48L3N2Zz4=';
    } else if (iconType === 'order') {
      // This is a green list/menu icon similar to the one in your design
      return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzRDQUY1MCIgZD0iTTMsNUgyMVY3SDNWNVogTTMsOUgyMVYxMUgzVjlaIE0zLDEzSDIxVjE1SDNWMTNaIE0zLDE3SDIxVjE5SDNWMTdaIi8+PC9zdmc+';
    }
    return '';
  }
}
