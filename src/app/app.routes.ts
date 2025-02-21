import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentInventoryComponent } from './product/current-inventory/current-inventory.component';
import { RoleSelectComponent } from './auth/role-select/role-select.component';
import { ConfirmationPageComponent } from './auth/confirmation-page/confirmation-page.component';
import { FarmInformationComponent } from './auth/farm-information/farm-information.component';
import { MoreInformationComponent } from './auth/more-information/more-information.component';

export const routes: Routes = [
        {
          path: 'sign-in',
          loadComponent: () => import('./auth/sign-in/sign-in.component').then(m => m.SignInComponent)
        },
        
        { 
          path: 'dashboard', 
          component: DashboardComponent 
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
          path: 'role-select',
          component: RoleSelectComponent
        },

        

        {
          path: 'confirmation/:role',
          component: ConfirmationPageComponent
        },

        {
          path: 'farm-information',
          component: FarmInformationComponent
        },

        {
          path: 'more-information',
          component: MoreInformationComponent
        },

        {
          path: '',
          redirectTo: 'sign-in',
          pathMatch: 'full'
        }
];
