import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedProductComponent } from './added-product/added-product.component';
import { RouterModule, Routes } from '@angular/router';
import { CurrentInventoryComponent } from './current-inventory/current-inventory.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inventory',
    pathMatch: 'full'
  },
  {
    path: 'inventory',
    component: CurrentInventoryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AddedProductComponent  // If it's a standalone component
  ]
})
export class ProductModule { } 
