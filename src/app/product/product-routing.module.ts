import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddedProductComponent } from './added-product/added-product.component';

const routes: Routes = [
  { path: 'added-product', component: AddedProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
