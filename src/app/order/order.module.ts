import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  },
  {
    path: 'detail',
    loadChildren: () => import('./order-detail/order-detail.module').then(m => m.OrderDetailModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class OrderModule { } 