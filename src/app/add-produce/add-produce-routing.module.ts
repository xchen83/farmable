import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProduceComponent } from './add-produce/add-produce.component';

const routes: Routes = [
    {
        path: '',  // Empty path since the full path is defined in app-routing
        component: AddProduceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddProduceRoutingModule { }
