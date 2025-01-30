import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProduceComponent } from './add-produce/add-produce.component'; // Make sure this exists

const routes: Routes = [
    { path: '', component: AddProduceComponent } // This ensures it loads when navigating to `/add-produce`
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddProduceRoutingModule { }
