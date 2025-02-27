import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentInventoryComponent } from './product/current-inventory/current-inventory.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'customer',
    loadComponent: () => import('./customer/customer.component').then(m => m.CustomerComponent)
  },

  {
    path: 'add-produce',
    loadChildren: () => import('./add-produce/add-produce.module').then(m => m.AddProduceModule)
  },

  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },

  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },

  {
    path: 'inventory',
    component: CurrentInventoryComponent
  },

  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];
