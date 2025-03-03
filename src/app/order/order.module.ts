// src/app/order/order.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 注意：不需要在这里导入 standalone 组件

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./order.component').then(c => c.OrderComponent)
  },
  {
    path: 'detail',
    loadChildren: () => import('./order-detail/order-detail.module')
  },
  {
    path: 'message',
    loadComponent: () => import('./message-dialog/message-dialog.component').then(c => c.MessageDialogComponent)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderModule { }

export default OrderModule;