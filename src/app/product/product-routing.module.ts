import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddedProductComponent } from './added-product/added-product.component';
import { AddProduceModule } from '../add-produce/add-produce.module';

const routes: Routes = [
  {
    path: '',
    component: AddedProductComponent
  },
  {
    path: 'add-produce',
    loadChildren: () => import('../add-produce/add-produce.module').then(m => m.AddProduceModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
