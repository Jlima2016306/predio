import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RegisterComponent}  from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {path:'Registro', component: RegisterComponent},
  {path:'Login', component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
