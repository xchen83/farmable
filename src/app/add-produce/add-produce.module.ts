import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProduceComponent } from './add-produce/add-produce.component';
import { AddProduceRoutingModule } from './add-produce-routing.module';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule


@NgModule({
  imports: [
    CommonModule,
    AddProduceRoutingModule,
    AddProduceComponent,
    FormsModule
  ]
})
export class AddProduceModule { }
