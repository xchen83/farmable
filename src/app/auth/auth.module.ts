import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoleSelectComponent } from './role-select/role-select.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { FarmInformationComponent } from './farm-information/farm-information.component';
import { MoreInformationComponent } from './more-information/more-information.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'role-select',
    component: RoleSelectComponent
  },
  {
    path: 'confirmation/:role',
    component: ConfirmationPageComponent
  },
  {
    path: 'farm-information',
    component: FarmInformationComponent
  },
  {
    path: 'more-information',
    component: MoreInformationComponent
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    // Empty declarations since all components are standalone
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    // All standalone components go here
    RoleSelectComponent,
    ConfirmationPageComponent,
    FarmInformationComponent,
    MoreInformationComponent,
    SignInComponent
  ]
})
export class AuthModule { }