import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public user!: Usuario;
  public token!: any;
  public identidad!: any;
  public users!: any;
  public type = "password"

  constructor(
    private _UsuariosService: UsuariosService,
    private _router: Router
  ) {
    this.user = new Usuario(0,"","","","",3,"","");

  }
  ngOnInit(): void {
    this.Users()
  }

  Users(){
    this._UsuariosService.verUsuarios().subscribe(
      (response) => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuarios Obtenidos',
          showConfirmButton: false,
          timer: 1500
        })
        this.users = response.data
        console.log(response.data)


      },
      (error) => {
        console.log(<any>error);
      }
    )
  }


  crearUser(){
    this._UsuariosService.CreaUsers(this.user).subscribe(
      response=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })


        //this._router.navigate(['/login'])

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


  comprobador(pass:any){
    var regex = /[^a-z0-9\x20]/i;
    var reg = /^[0-9A-Za-z]+$/
    var regNumber = /\d/
    var regA= /[A-Z]/
    var rea=/[a-z]/

    return (pass.length >= 8 && regex.test(pass) && regNumber.test(pass) && regA.test(pass) && rea.test(pass)  )

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
