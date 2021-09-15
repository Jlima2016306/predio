import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'



interface State {
  page: number;
  pageOffset: number;
}
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})


export class UsuariosComponent implements OnInit{
  p:number = 1;




  public user!: Usuario;
  public ModalUser!: Usuario;
  public busquedaData!: Usuario
  public token!: any;
  public identidad!: any;
  public users!: any;
  public type = "password"

  public pagination !: any;


  constructor(
    private _UsuariosService: UsuariosService,
    private _router: Router
  ) {
    this.user = new Usuario(0,"","","","",3,"","");
    this.ModalUser =  new Usuario(0,"","","","",3,"","")
    this.busquedaData = new Usuario(0,"","","","", 0,"","")

  }
  ngOnInit(): void {
    this.Users()

  }

  busqueda(){
    let busqueda="?"
    if(this.busquedaData.email != "") busqueda= busqueda+"filter[email]=" + this.busquedaData.email

    if(this.busquedaData.identification != ""){
      if(busqueda != "?") busqueda= busqueda+"&"

      busqueda= busqueda + "filter[identification]="+this.busquedaData.identification}


    if(this.busquedaData.role_id != 0 ) {
      if(busqueda != "?") busqueda= busqueda+"&"

      busqueda = busqueda + "filter[role_id]="+this.busquedaData.role_id}
    console.log(busqueda)

    this._UsuariosService.verUsuariosBusqueda(busqueda).subscribe(
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
        this. pagination = response.meta.links


      },
      (error) => {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',

          text: "No se encontraron Usuarios con esos parametros"
                           ,
          showConfirmButton: true,
        })      }
    )

  }


  UsersPaginations(link:any){
    this._UsuariosService.verUsuariosPagination(link).subscribe(
      (response) => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuarios Obtenidos',
          showConfirmButton: false,
          timer: 1500
        })
        this.users = response.data
        this. pagination = response.meta.links
        console.log(response.meta.links)


      },
      (error) => {
        console.log(<any>error);
      }
    )
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
        this. pagination = response.meta.links
        console.log(response.meta.links[0].label)


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
        this.Users()


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
