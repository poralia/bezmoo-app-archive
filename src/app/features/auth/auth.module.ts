import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { IonicModule } from '@ionic/angular';
import { RegisterScreenComponent } from './screens/register-screen/register-screen.component';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './components/register-form/register-form.component';


@NgModule({
  declarations: [
    LoginScreenComponent,
    RegisterScreenComponent,
    LandingScreenComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
