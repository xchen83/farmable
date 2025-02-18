import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './current-inventory.component.html',
  styleUrls: ['./current-inventory.component.css']
})
export class CurrentInventoryComponent {
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
      images: ['apple.jpg', 'apple-tree.jpg']
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
      images: ['mushroom.jpg']
    }
  ];
} 