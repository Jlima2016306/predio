import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuariosService]
})
export class NavbarComponent implements OnInit {
  public rol:any= null;;
  constructor(    private _UsuariosService: UsuariosService,
    private _router: Router) { }

  ngOnInit(): void {
    this.obtenerIdentidad()
  }

  obtenerIdentidad(){
    this._UsuariosService.tokenDatos().subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('identidad', response.data.role.role_id);
        if(localStorage.getItem('identidad'))  this.rol = localStorage.getItem('identidad')

      },
      (error) => {
        console.log(<any>error);
      }
    );

  }

  endSesion(){
    this._UsuariosService.endSesion().subscribe(

      (response) => {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Esperamos verte pronto',
          showConfirmButton: false,
          timer: 1500
        })

        console.log(response);
        this._router.navigate(['/Login'])
        localStorage.clear()
        window.location.reload();


      },
      (error) => {


        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',

          text: 'Error critico'
                           ,
          showConfirmButton: true,
        })      }
    );



  }
}
