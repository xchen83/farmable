import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProduceComponent } from './add-produce/add-produce.component';
import { AddProduceRoutingModule } from './add-produce-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AddProduceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AddProduceComponent
  ]
})
export class AddProduceModule { }
