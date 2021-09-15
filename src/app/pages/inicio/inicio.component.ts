import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {CarrosService} from '../../services/carros.service';
import { Carro } from '../../models/carro.model';


import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [UsuariosService, CarrosService]
})
export class InicioComponent implements OnInit {
	public Inicio = false
	public Ver_en_venta  = true
	public ver_mis_autos = true

  public carros!: Carro;
  public vehicles!:any;
  public users!: Usuario;
  public token!: any;
  public identidad!: any;
  public type="password"
  public pagination!:any


  constructor(
    private _CarrosService: CarrosService,
    private _UsuariosService: UsuariosService,
    private _router: Router
  ) {
    this.users = new Usuario(0,"","","","",2,"","");
    this.carros = new Carro(0,"","","",0,"",0,0,0,"",0,0,0,"","");

  }

  ngOnInit(): void {
    this.verCarros()
  }


  CambiarVentana(ventana:any){
    if(ventana == 1) {

      this.Inicio = false
      this.Ver_en_venta  = true
      this.ver_mis_autos = true

    }

    if(ventana == 2) {

      this.Inicio = true
      this.Ver_en_venta  = false
      this.ver_mis_autos = true

    }


    if(ventana == 3) {

      this.Inicio = true
      this.Ver_en_venta  = true
      this.ver_mis_autos = false

    }

  }

  UsersPaginations(link:any){
    this._CarrosService.verCarrosPagination(link).subscribe(
      (response) => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Carros Obtenidos',
          showConfirmButton: false,
          timer: 1500
        })
        this.vehicles = response.data
        this. pagination = response.meta.links
        console.log(response.data)


      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  verCarros(){
    this._CarrosService.verCarros().subscribe(
      (response) => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Vehiculos Obtenidos',
          showConfirmButton: false,
          timer: 1500
        })
        this.vehicles = response.data
        this. pagination = response.meta.links
        console.log(this.vehicles)


      },
      (error) => {
        console.log(<any>error);
      }
    )

  }

}
