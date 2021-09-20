
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { VentasComponent } from './pages/ventas/ventas.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    UsuariosComponent,
    PerfilComponent,
    InicioComponent,
    EstadisticasComponent,
    VentasComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NgxSliderModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
