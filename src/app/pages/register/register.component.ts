import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

// CommonJS
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UsuariosService]

})
export class RegisterComponent implements OnInit {
  public user!: Usuario;
  public token!: any;
  public identidad!: any;
  public type= "password"


  constructor(
    private _UsuariosService: UsuariosService,
    private _router: Router
  ) {
    this.user = new Usuario(0,"","","","",2,"","");

  }

  ngOnInit(): void {
  }

  registrar(){
    this._UsuariosService.registro(this.user).subscribe(
      response=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })


        //this._router.navigate(['/login'])
        this.login()


      },
      error=>{
        var key = 0
        var errores = ""
        if(error.error.errors.name){
           key = 1
          errores = errores + error.error.errors.name[0]}
        if(error.error.errors.email && key == 0) {
          key = 1
          errores = errores  + error.error.errors.email[0]}

          if(error.error.errors.phone_number && key == 0){
            key = 1
            errores = errores + error.error.errors.phone_number[0]}


        if(error.error.errors.identification && key == 0) {
          key = 1
          errores = errores +error.error.errors.identification[0]}
        if(error.error.errors.password && key == 0) {
          key = 1
          errores = errores + error.error.errors.password[0]}





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

  getToken() {
    this._UsuariosService.login(this.user).subscribe(
      (response) => {
        this.token = response.access_token;
        console.log("pase")
        localStorage.setItem('token', this.token);
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

        this.token = response.access_token;
        console.log("pase")
        localStorage.setItem('token', this.token);

        window.location.reload();

      },
      (error) => {
        console.log(<any>error);
      }
    )
  }


  comprobador(pass:any){
    var regex = /[^a-z0-9\x20]/i;
    var reg = /^[0-9A-Za-z]+$/
    var regNumber = /\d/
    var regA= /[A-Z]/
    var rea=/[a-z]/

    return (pass.length >= 8 && regex.test(pass) && regNumber.test(pass) && regA.test(pass) && rea.test(pass)  )

  }

  comprobadorPassword(pass:any,passConfirm:any){
    return pass == passConfirm
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
