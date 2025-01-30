import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  constructor(private router: Router) { }

  navigateToAddProduce() {
    this.router.navigate(['/add-produce']);
  }

//data
  time = '12:15';
  notifications = [
    { text: 'Carrots - pounds (5 lbs remaining)', type: 'low-inventory' },
    { text: 'Order #12345 needs confirmation', type: 'order' },
  ];

  inventoryItems = [
    { name: 'Fuji apple - pounds', remaining: '60 lbs' },
    { name: 'Carrot - pounds', remaining: '60 lbs' },
  ];

  products = [
    { name: 'Fuji apple - pounds', sku: 'OCCKFHTA', image: 'https://via.placeholder.com/50x50' },
    { name: 'Carrot - pounds', sku: 'FABOFHTD', image: 'https://via.placeholder.com/50x50' },
  ];

}