import { Component , OnInit} from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {


  public ModalUser!: Usuario;
  public token!: any;
  public identidad!: any;
  public type = "password"
  public rol!:any;
  public id!:any;

  public pagination !: any;


   constructor(
    private _UsuariosService: UsuariosService,
    private _router: Router
  ) {
    this.ModalUser =  new Usuario(0,"","","","",3,"","")

  }
  ngOnInit(): void {
    this.obtenerIdentidad()

  }


  EditUser(id:any){
    this._UsuariosService.EditUser(this.ModalUser,id).subscribe(
      response=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario editado correctamente',
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

  VerUser(id:any){
    this._UsuariosService.verUsuario(id).subscribe(
      response=>{

        this.ModalUser = response.data;
        console.log(response.data);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario cargado',
          showConfirmButton: false,
          timer: 1500
        })

        //this._router.navigate(['/login'])

      },
      error=>{

        console.log(<any>error);


      }
    )
  }


  obtenerIdentidad(){
    this._UsuariosService.tokenDatos().subscribe(
      (response) => {
        console.log(response);
        this.rol =response.data.role.name
        this.id = response.data.id
        this.VerUser(this.id)
      },
      (error) => {
        console.log(<any>error);
      }
    );

  }


  //comprobadores de contraseña

  comprobador(pass:any){
    var regex = /[^a-z0-9\x20]/i;
    var reg = /^[0-9A-Za-z]+$/
    var regNumber = /\d/
    var regA= /[A-Z]/
    var rea=/[a-z]/

    return (regex.test(pass) && regNumber.test(pass) && regA.test(pass) && rea.test(pass)  )

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

