// src/app/order/order-detail/order-detail.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Import the component with the correct path
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
    // OrderDetailComponent is standalone, so it doesn't need to be declared here
  ],
  exports: [RouterModule]
})
export class OrderDetailModule { }

export default OrderDetailModule;