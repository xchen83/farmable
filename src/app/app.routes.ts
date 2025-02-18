import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentInventoryComponent } from './product/current-inventory/current-inventory.component';

export const routes: Routes = [
        { path: '', 
        component: DashboardComponent },
        
        { path: 'add-produce', 
        loadChildren: () => import('./add-produce/add-produce.module').then(m => m.AddProduceModule) },
    
        { path: 'product', 
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },

        { path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },

        {
          path: 'inventory',
          component: CurrentInventoryComponent
        }
];
