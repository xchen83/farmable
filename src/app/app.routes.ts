import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
        { path: '', 
        component: DashboardComponent },
        
        { path: 'add-produce', 
        loadChildren: () => import('./add-produce/add-produce.module').then(m => m.AddProduceModule) },
    
        { path: 'add-inventory', 
        loadChildren: () => import('./add-inventory/add-inventory.module').then(m => m.AddInventoryModule) },
    
        { path: 'product', 
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
];
