import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBoxArchive, faClipboardList, faChevronDown, faChevronUp, faAppleWhole, faTriangleExclamation, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'chart.js/auto';

interface InventoryRecord {
  amount: string;
  type: string;
  detail: string;
  date: string;
}

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  faBoxArchive = faBoxArchive;
  faClipboardList = faClipboardList;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faTriangleExclamation = faTriangleExclamation;
  faCircleInfo = faCircleInfo;

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
  showEmptyState: boolean = false; // Set to false to show the inventory content

  constructor(private router: Router) {
    // Set current date in format: Thursday, February 20, 2025
    this.setCurrentDate();
  }

  // Helper method to get product quantity
  getProductQuantity(productName: string): string {
    const item = this.inventoryItems.find(item => item.name === productName);
    return item ? item.remaining : 'Out of stock';
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
    this.router.navigate(['/product/inventory']);
  }

  navigateToOrder() {
    this.router.navigate(['/order']);
  }

  navigateToSignIn() {
    this.router.navigate(['/sign-in']);
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

  inventoryItems: { name: string; remaining: string; records: InventoryRecord[] }[] = [
    {
      name: 'Fuji apple - pounds',
      remaining: '60 lbs',
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
        }
      ]
    },
    {
      name: 'Carrot - pounds',
      remaining: '60 lbs',
      records: [
        {
          amount: '60 lbs',
          type: 'Inventory Restock',
          detail: 'Initial stock',
          date: '5 days ago'
        }
      ]
    },
  ];

  products: { name: string; sku: string; image: string }[] = [
    {
      name: 'Fuji apple - pounds',
      sku: 'OCCKFHTA',
      image: 'apple-1.png'
    },
    {
      name: 'Mashroom - pounds',
      sku: 'FABOFHTD',
      image: 'mushroom.png'
    },
  ];

  // Method to handle image loading errors
  handleImageError(event: any) {
    event.target.src = 'assets/img/default-product.png';
  }

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

  // Get stock status for color coding
  getStockStatus(productName: string): 'low' | 'medium' | 'good' {
    const item = this.inventoryItems.find(item => item.name === productName);
    if (!item) return 'low';

    const quantity = parseInt(item.remaining);
    if (quantity <= 20) return 'low';
    if (quantity <= 40) return 'medium';
    return 'good';
  }

  // Get stock percentage for progress bar
  getStockPercentage(productName: string): number {
    const item = this.inventoryItems.find(item => item.name === productName);
    if (!item) return 0;

    const quantity = parseInt(item.remaining);
    return Math.min((quantity / 100) * 100, 100); // Assuming 100 is max capacity
  }

  // Get product image
  getProductImage(productName: string): string {
    const product = this.products.find(p => p.name === productName);
    return product ? product.image : 'default-product.png';
  }

  // Get inventory records for a product
  getInventoryRecords(productName: string): any[] {
    const item = this.inventoryItems.find(item => item.name === productName);
    return item?.records || [];
  }

  ngOnInit() {
    // Initialize component
  }

  ngAfterViewInit() {
    this.createInventoryChart();
  }

  createInventoryChart() {
    // Fixed months for x-axis
    const xValues = ['Jan', 'Feb', 'Mar',];

    // Updated inventory levels with the specified values
    const yValues = [45, 15, 5];

    const ctx = document.getElementById('inventoryChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: xValues,
          datasets: [{
            label: 'Inventory Level',
            data: yValues,
            fill: true,
            backgroundColor: 'rgba(132, 204, 22, 0.2)', // Lime-500 with transparency
            borderColor: 'rgb(101, 163, 13)', // Lime-600
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgb(101, 163, 13)', // Lime-600
            pointBorderWidth: 2,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
              position: 'top' as const,
              labels: {
                font: {
                  size: 14
                },
                boxWidth: 10,
                padding: 8
              }
            },
            title: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              border: {
                display: false
              },
              ticks: {
                color: 'rgb(107, 114, 128)',
                font: {
                  size: 14
                },
                stepSize: 15
              }
            },
            x: {
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                color: 'rgb(107, 114, 128)',
                font: {
                  size: 14
                }
              }
            }
          },
          elements: {
            line: {
              borderJoinStyle: 'round'
            }
          }
        }
      });
    }
  }
}
