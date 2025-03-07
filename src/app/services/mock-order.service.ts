// src/app/services/mock-order.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// 从order.types导入类型
import { Order, OrderItem, Customer, Product } from '../order/order.types';

@Injectable({
  providedIn: 'root'
})
export class MockOrderService {
  // 模拟产品数据
  private mockProducts: Product[] = [
    {
      product_id: 1,
      productName: 'Organic Carrots',
      category: 'Vegetables',
      packUnit: 'lbs',
      unlimitedShelfLife: false,
      shelfLife: 14,
      shelfLifeUnit: 'days',
      description: 'Fresh organic carrots'
    },
    {
      product_id: 2,
      productName: 'Red Apples',
      category: 'Fruits',
      packUnit: 'lbs',
      unlimitedShelfLife: false,
      shelfLife: 30,
      shelfLifeUnit: 'days',
      description: 'Crisp red apples'
    },
    {
      product_id: 3,
      productName: 'Free Range Eggs',
      category: 'Dairy & Eggs',
      packUnit: 'dozen',
      unlimitedShelfLife: false,
      shelfLife: 21,
      shelfLifeUnit: 'days',
      description: 'Organic free range eggs'
    }
  ];

  // 模拟客户数据
  private mockCustomers: Customer[] = [
    {
      customer_id: 1,
      name: 'Green Leaf Restaurant',
      email: 'contact@greenleaf.com',
      phone: '555-123-4567',
      total_spent: 1500.75,
      transaction_count: 12,
      last_transaction_date: '2025-03-01',
      created_at: '2024-06-15'
    },
    {
      customer_id: 2,
      name: 'Sunrise Cafe',
      email: 'orders@sunrisecafe.com',
      phone: '555-234-5678',
      total_spent: 875.50,
      transaction_count: 7,
      last_transaction_date: '2025-02-27',
      created_at: '2024-07-22'
    },
    {
      customer_id: 3,
      name: 'City Market',
      email: 'procurement@citymarket.com',
      phone: '555-345-6789',
      total_spent: 3200.25,
      transaction_count: 18,
      last_transaction_date: '2025-03-03',
      created_at: '2024-05-10'
    }
  ];

  // 模拟订单项
  private createMockOrderItems(orderId: number): OrderItem[] {
    const items: OrderItem[] = [];
    const itemsCount = Math.floor(Math.random() * 3) + 1; // 1到3个随机项目
    
    for (let i = 0; i < itemsCount; i++) {
      const productId = Math.floor(Math.random() * this.mockProducts.length) + 1;
      const product = this.mockProducts.find(p => p.product_id === productId) || this.mockProducts[0];
      const requestedQuantity = Math.floor(Math.random() * 20) + 5; // 5到25随机数量
      const fulfilled = Math.random() > 0.3; // 70%的几率完全满足
      const fulfilledQuantity = fulfilled ? requestedQuantity : Math.floor(requestedQuantity * 0.7);
      const remainingQuantity = fulfilled ? 0 : requestedQuantity - fulfilledQuantity;
      
      items.push({
        order_item_id: (orderId * 10) + i,
        order_id: orderId,
        product_id: product.product_id,
        requested_quantity: requestedQuantity,
        fulfilled_quantity: fulfilledQuantity,
        remaining_quantity: remainingQuantity,
        unit_price: parseFloat((Math.random() * 10 + 5).toFixed(2)), // 5到15随机价格
        status: fulfilled ? 'completed' : 'pending',
        system_note: fulfilled ? '' : 'Insufficient inventory',
        product: product
      });
    }
    
    return items;
  }

  // 生成模拟订单
  private generateMockOrders(count: number): Order[] {
    const orders: Order[] = [];
    const startDate = new Date('2025-02-01');
    const endDate = new Date('2025-03-05');
    
    for (let i = 1; i <= count; i++) {
      // 随机日期
      const orderDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
      const requiredDate = new Date(orderDate);
      requiredDate.setDate(orderDate.getDate() + Math.floor(Math.random() * 7) + 1); // 1-7天后交付
      
      // 随机客户
      const customerId = Math.floor(Math.random() * this.mockCustomers.length) + 1;
      const customer = this.mockCustomers.find(c => c.customer_id === customerId) || this.mockCustomers[0];
      
      // 订单项
      const orderItems = this.createMockOrderItems(i);
      
      // 计算总金额
      const totalAmount = orderItems.reduce((sum, item) => sum + (item.requested_quantity * item.unit_price), 0);
      
      // 订单状态
      const rand = Math.random();
      let status = 'pending';
      if (rand < 0.3) status = 'pending';
      else if (rand < 0.7) status = 'accepted';
      else status = 'completed';
      
      orders.push({
        order_id: i,
        customer_id: customer.customer_id,
        order_date: orderDate.toISOString().split('T')[0],
        required_date: requiredDate.toISOString().split('T')[0],
        total_amount: parseFloat(totalAmount.toFixed(2)),
        status: status,
        customer: customer,
        order_items: orderItems
      });
    }
    
    return orders;
  }

  private mockOrders: Order[] = this.generateMockOrders(10);

  constructor() { }

  /**
   * 获取所有订单
   */
  getOrders(): Observable<{success: boolean, data: Order[]}> {
    console.log('Mock getOrders called');
    return of({
      success: true,
      data: this.mockOrders
    }).pipe(delay(500)); // 添加500ms延迟模拟网络请求
  }

  /**
   * 根据ID获取订单详情
   */
  getOrderById(orderId: number): Observable<{success: boolean, data: any}> {
    const order = this.mockOrders.find(o => o.order_id === orderId);
    if (order) {
      return of({
        success: true,
        data: {
          order: order,
          items: order.order_items || []
        }
      }).pipe(delay(300));
    } else {
      return of({
        success: false,
        data: null
      }).pipe(delay(300));
    }
  }

  /**
   * 更新订单状态
   */
  updateOrderStatus(orderId: number, status: string): Observable<{success: boolean}> {
    const orderIndex = this.mockOrders.findIndex(o => o.order_id === orderId);
    if (orderIndex >= 0) {
      this.mockOrders[orderIndex].status = status;
      return of({success: true}).pipe(delay(200));
    } else {
      return of({success: false}).pipe(delay(200));
    }
  }

  /**
   * 发送消息给买家
   */
  sendMessageToBuyer(orderId: number, customerId: number, message: string): Observable<{success: boolean}> {
    console.log(`模拟发送消息到订单 ${orderId}, 客户 ${customerId}: ${message}`);
    return of({success: true}).pipe(delay(300));
  }

  /**
   * 搜索订单
   */
  searchOrders(searchTerm: string): Observable<{success: boolean, data: Order[]}> {
    const filteredOrders = this.mockOrders.filter(order => 
      (order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.order_id.toString().includes(searchTerm) ||
      order.order_items?.some(item => 
        item.product?.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    return of({
      success: true,
      data: filteredOrders
    }).pipe(delay(300));
  }
}