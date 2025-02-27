import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

const routes: Routes = [
    { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'add-produce', loadChildren: () => import('./add-produce/add-produce.module').then(m => m.AddProduceModule) },
    { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }