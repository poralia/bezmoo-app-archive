import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screens/register-screen/register-screen.component';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';

const routes: Routes = [
  {
    path: '',
    component: LandingScreenComponent,
  },
  {
    path: 'login',
    component: LoginScreenComponent,
  },
  {
    path: 'register',
    component: RegisterScreenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
