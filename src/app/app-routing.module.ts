import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { RoleSelectComponent } from './auth/role-select/role-select.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'role-select', component: RoleSelectComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add-produce', loadChildren: () => import('./add-produce/add-produce.module').then(m => m.AddProduceModule) },
    { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }