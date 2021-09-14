import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RegisterComponent}  from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {UsuariosComponent} from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {path:'Registro', component: RegisterComponent},
  {path:'Login', component: LoginComponent},
  {path:'Usuario', component: UsuariosComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
