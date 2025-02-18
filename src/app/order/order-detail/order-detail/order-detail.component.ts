import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface RequestItem {
  product: string;
  requestedAmount: string;
  inventoryAfterOrder: string;
  fulfillmentStatus: boolean;
  systemNote?: string;
}

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId: string = '17282382';
  restaurantName: string = 'Grange Restaurant';
  orderDate: string = '2/1/2025';
  requiredDate: string = '2/8/2025';
  deliveryMethod: string = 'Delivery required';
  totalValue: string = '$162.00';
  customerType: string = 'Restaurant';
  previousTransactions: string = '15 completed';
  
  requestItems: RequestItem[] = [
    {
      product: 'Fuji Apple',
      requestedAmount: '20 lbs',
      inventoryAfterOrder: '40 lbs',
      fulfillmentStatus: false,
      systemNote: '5 lbs missing'
    },
    {
      product: 'Shiitake Mushroom',
      requestedAmount: '15 lbs',
      inventoryAfterOrder: '10 lbs',
      fulfillmentStatus: true
    },
    {
      product: 'Banana',
      requestedAmount: '15 lbs',
      inventoryAfterOrder: '30 lbs',
      fulfillmentStatus: true
    }
  ];

  buyerNote: string = 'Hi Sarah, I need this order by Saturday. If delivery is not possible, I can arrange to pick it up from your farm. Please let me know. Thanks!';
  systemWarning: string = "Order can't be fulfilled. Please contact the buyer";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // 在实际应用中，这里会根据路由参数加载订单数据
    const id = this.route.snapshot.paramMap.get('id');
  }

  onContactBuyer() {
    // 实现联系买家的逻辑
  }

  onAcceptOrder() {
    // 实现接受订单的逻辑
  }
} 