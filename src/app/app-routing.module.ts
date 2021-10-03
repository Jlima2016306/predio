import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RegisterComponent}  from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {UsuariosComponent} from './pages/usuarios/usuarios.component';
import {PerfilComponent} from './pages/perfil/perfil.component';
import {InicioComponent} from './pages/inicio/inicio.component';
import  {EstadisticasComponent} from './pages/estadisticas/estadisticas.component';

const routes: Routes = [
  {path:'Registro', component: RegisterComponent},
  {path:'Login', component: LoginComponent},
  {path:'Usuario', component: UsuariosComponent},
  {path:'Perfil', component: PerfilComponent},
  {path:'Inicio', component: InicioComponent},
  {path:'stats', component: EstadisticasComponent},

  {path:'**', component: InicioComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
