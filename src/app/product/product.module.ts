import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedProductComponent } from './added-product/added-product.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',  // This matches the 'product' path from your main routing
    component: AddedProductComponent
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
