import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuariosService]

})
export class LoginComponent implements OnInit {

  public user!: Usuario;
  public token!: any;
  public identidad!: any;
  public type="password"


  constructor(
    private _UsuariosService: UsuariosService,
    private _router: Router
  ) {
    this.user = new Usuario(0,"","","","",2,"","");

  }


  ngOnInit(): void {
  }

  getToken() {
    this._UsuariosService.login(this.user).subscribe(
      (response) => {
        this.token = response.access_token;

        localStorage.setItem('token', this.token);

        window.location.reload();



      },
      (error) => {
        console.log(<any>error);
      }
    );

  }


  login(){
    this._UsuariosService.login(this.user).subscribe(
      (response) => {


        this.getToken();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se logeo correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        var key = 0
        var errores = ""

        if(error.error.errors.email && key == 0) {
          key = 1
          errores = errores  + error.error.errors.email[0]}


        if(error.error.errors.password && key == 0) {
          key = 1
          errores = errores + error.error.errors.password[0]}


        console.log(<any>error);

        Swal.fire({
          icon: 'warning',
          title: 'Oops...',

          text: errores
                           ,
          showConfirmButton: true,
        })
      }
    )
  }

  togglePass(){

    var x = document.getElementById("myInput");
    if (this.type === "password") {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }



}
