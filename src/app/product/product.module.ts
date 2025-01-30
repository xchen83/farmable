import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { AddedProductComponent } from './added-product/added-product.component';

@NgModule({
  imports: [CommonModule, ProductRoutingModule, AddedProductComponent]
})
export class ProductModule { } 
