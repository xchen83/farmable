// src/app/order/order-detail/order-detail.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// 正确导入路径
import { OrderDetailComponent } from './order-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: OrderDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // OrderDetailComponent 是 standalone 组件，不需要在这里导入
  ],
  exports: [RouterModule]
})
export class OrderDetailModule { }

export default OrderDetailModule;