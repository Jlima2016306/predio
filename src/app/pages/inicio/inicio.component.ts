import { Component, OnInit, Input } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {CarrosService} from '../../services/carros.service';
import { Carro } from '../../models/carro.model';
import { dataCarros } from '../../models/aditamentos.model';
import { dataSort } from '../../models/aditamentos.model';
import { ventas } from '../../models/aditamentos.model';
import { ventasBusqueda } from '../../models/aditamentos.model';

import { DomSanitizer } from '@angular/platform-browser';

import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';


import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


import { Options} from '@angular-slider/ngx-slider';

import {FormGroup, FormControl} from '@angular/forms';

//interfaces



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [UsuariosService, CarrosService]
})



export class InicioComponent implements OnInit  {
  public date = new Date();

  public date1!: any
  public date2!: any

  optionsD: DatepickerOptions = {
    minYear: getYear(new Date()) - 30, // minimum available and selectable year
    maxYear: getYear(new Date()) + 30, // maximum available and selectable year
    placeholder: '', // placeholder in case date model is null | undefined, example: 'Please pick a date'
    format: 'yyyy-MM-dd', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: locale, // date-fns locale
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
  };

  title = 'ngx-slider';
  public montoMaximo = 1000000

  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: this.montoMaximo,
    getPointerColor: (value: number): string => {
      return 'orange';
  },


  showSelectionBar: true,

    selectionBarGradient: {
      from: 'white',
      to: '#FC0'
    }
  };


  optionsAnnos: Options = {

    floor: 1970,
    ceil: this.date.getFullYear(),
    showSelectionBar: true,
    selectionBarGradient: {
      from: 'white',
      to: '#FC0'
    },
    getPointerColor: (value: number): string => {
      return 'orange';
  },
  };

  optionsPuertas: Options = {

    floor: 0,
    ceil: 20,
    showSelectionBar: true,
    selectionBarGradient: {
      from: 'white',
      to: '#FC0'
    },
    getPointerColor: (value: number): string => {
      return 'orange';
  },
  };



  public user!:any
	public Inicio = false
	public Ver_en_venta  = true
	public ver_mis_autos = true

  public  buscar = true



  public carros!: Carro;
  public vehicles!:any;
  public users!: Usuario;
  public token!: any;
  public identidad!: any;
  public type="password"
  public pagination!:any
  public total!:any
  public pag:any=[]


  public PrecioRange!:dataCarros;
  public AnnosRange!:dataCarros;
  public MotorRange!:dataCarros;
  public CilindrajeRange!:dataCarros;
  public PuertasRange!:dataCarros;

  public ModalVehicles!: any;

  public valuesB!:dataSort;
  public valuesBventas!:dataSort;


  public busquedaData!: Carro
  public totals!:Usuario;
  public rol:any= null;;

  //data de busqueda
  public combustible: any;
  public modelo:any;
  public marcas:any;
  public paginationU!:any

  public paginationUC!:any
  public paginationUV!:any


  //data subirImagen
  public file:any =[]
  public previsualizacion!:any

  //

  public CarroModel!: Carro
//this
  public venta!: ventas;
  public ventaModel!: any;
  // ventas busqueda
  public ventasBusqueda!:ventasBusqueda
  public CompradoresV!:any;
  public VendedoresV!:any;
  public MontoRango!:any

  constructor(
    private _CarrosService: CarrosService,
    private _UsuariosService: UsuariosService,
    private _router: Router,
    private sanitizer: DomSanitizer
  ) {

    this.MontoRango = new dataCarros(0,0)

    this.PrecioRange = new dataCarros(0,0)
    this.AnnosRange = new dataCarros(0,0)
    this.MotorRange = new dataCarros(0,0)
    this.CilindrajeRange = new dataCarros(0,0)
    this.PuertasRange = new dataCarros(0,0)

    this.valuesB = new dataSort("","")
    this.valuesBventas = new dataSort("","")


    this.users = new Usuario(0,"","","","",2,"","");


    this.carros = new Carro(0,"","","",0,"",0,0,0,"",0,0,0,"","",0);
    this.totals = new Usuario(0,"","","","", 0,"","")
    this.busquedaData =  new Carro(0,"","","",0,"",0,0,0,"",0,0,0,"","",0);
    this.CarroModel =  new Carro(0,"demoapi/images/2021-09-22-14-28-44-6268.jpg","","",0,"",0,0,0,"",0,0,0,"","",0);

    this.venta= new ventas("","")
    this.ventasBusqueda= new ventasBusqueda(0,0,0,0,"","")
  }

  ngOnInit(): void {
    this.verCarros()
    this.paginationNumber();
    this.data()
    this.obtenerIdentidad()
    this.Usuarios()
  }


  Vender(id:any){
    this.venta.vehicle_id = id

    this._CarrosService.VenderVehicle(this.venta).subscribe((response)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Venta Realizada',
        showConfirmButton: false,
        timer: 1500
      })
      this.verCarros()

    },(err)=>{
      console.log(<any>err)
    })

  }

  verVentas(){

    var filters = '?'
    if(this.valuesBventas != null) filters = filters+ "sort="+this.valuesBventas.sort+this.valuesBventas.value

    if(this.ventasBusqueda.buyer_id != 0){

      if(filters != "?") filters= filters+"&"
      filters = filters+ "filter[buyer_id]="+this.ventasBusqueda.buyer_id
  }

  if(this.ventasBusqueda.seller_id != 0){

    if(filters != "?") filters= filters+"&"
    filters = filters+ "filter[seller_id]="+this.ventasBusqueda.seller_id
  }

  if(this.ventasBusqueda.model_id != 0){

    if(filters != "?") filters= filters+"&"
    filters = filters+ "filter[model_id]="+this.ventasBusqueda.model_id
  }

  if(this.ventasBusqueda.brand_id != 0){

    if(filters != "?") filters= filters+"&"
    filters = filters+ "filter[brand_id]="+this.ventasBusqueda.brand_id
  }

  if(this.MontoRango.max != 0 ){
    if(filters != "?") filters= filters+"&"

    filters= filters + "filter[amountRange]="+this.MontoRango.min +","+this.MontoRango.max}


    if(this.date1 != null ){
      if(this.date2 != null){
        if(filters != "?") filters= filters+"&"

        filters= filters + "filter[dateRange]="+this.date1.toISOString().split('T')[0] +","+this.date2.toISOString().split('T')[0]}


      }

      this._CarrosService.VerVentasVehicle(filters).subscribe((response)=>{
        this.ventaModel = response.data
        console.log(this.ventaModel)
    },
    (err)=>{
      console.log(<any>err)
    })

  }




  crearCarro(){
    this._CarrosService.CrearVehicle(this.CarroModel).subscribe(
      response=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Carro registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })

        this.verCarros()

        //this._router.navigate(['/login'])

      },
      error=>{
        var ListaErrores =error.error.errors
        var key
        var NombreError

        if(ListaErrores.color && key != 1) {key =1
          NombreError = ListaErrores.color[0]
          }

        if(ListaErrores.description  && key != 1)  {key =1
          NombreError  = ListaErrores.description[0]
          }
        if(ListaErrores.doors  && key != 1)   {key =1
          NombreError = ListaErrores.doors[0]
          }
        if(ListaErrores.engine  && key != 1)   {key =1
          NombreError = ListaErrores.engine[0]
          }
        if(ListaErrores.fuel_type_id  && key != 1)   {key =1
          NombreError = ListaErrores.fuel_type_id[0]
          }
        if(ListaErrores.location  && key != 1)   {key =1
          NombreError = ListaErrores.location[0]
          }
        if(ListaErrores.model_id  && key != 1)   {key =1
          NombreError = ListaErrores.model_id[0]
          }
        if(error.error.errors.price  && key != 1)   {key =1
          NombreError = ListaErrores.price[0]
          }
        if(error.error.errors.seller_id  && key != 1)   {key =1
          NombreError = ListaErrores.seller_id[0]
          }
        if(error.error.errors.year  && key != 1)  {key =1
          NombreError = ListaErrores.year[0]
          }



        Swal.fire({
          icon: 'warning',
          title: 'Oops...',

          text: NombreError
                           ,
          showConfirmButton: true,
        })
        console.log(<any>error.error.errors)



      }
    )
  }




    Usuarios(){

      var rol =  localStorage.getItem('identidad')
    var busqueda="?per_page=15&filter[role_id]=2"
    if(rol == "2")  busqueda="?per_page=15&filter[role_id]=3"

    this._UsuariosService.verUsuariosBusqueda(busqueda).subscribe(
      (response) => {


        this.user = response.data

        this.paginationU = response.meta.links
        console.log(response.meta.links)


      },
      (error) => {
        console.log(<any>error);
      }
    )
    busqueda="?per_page=15&filter[role_id]=2"

    this._UsuariosService.verUsuariosBusqueda(busqueda).subscribe(
      (response) => {


        this.VendedoresV = response.data

        this.paginationUV = response.meta.links
        console.log(response.meta.links)


      },
      (error) => {
        console.log(<any>error);
      }
    )
    busqueda="?per_page=15&filter[role_id]=3"

    this._UsuariosService.verUsuariosBusqueda(busqueda).subscribe(
      (response) => {


        this.CompradoresV = response.data

        this.paginationUC = response.meta.links
        console.log(response.meta.links)


      },
      (error) => {
        console.log(<any>error);
      }
    )

  }

  UsersVPaginations(link:any){
    this._UsuariosService.verUsuariosPagination(link).subscribe(
      (response) => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuarios Obtenidos',
          showConfirmButton: false,
          timer: 1500
        })
        this.user = response.data
        this. paginationU = response.meta.links
        console.log(response.meta.links)


      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  UsersVentasPaginations(link:any,id:any){

    this._UsuariosService.verUsuariosPagination(link).subscribe(
      (response) => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuarios Obtenidos',
          showConfirmButton: false,
          timer: 1500
        })

        if(id == 3)         this. paginationUC = response.meta.links
        if(id == 3)                 this.CompradoresV = response.data


        if(id == 2)         this. paginationUV = response.meta.links
        if(id == 2)                 this.VendedoresV = response.data

        console.log(response.meta.links)


      },
      (error) => {
        console.log(<any>error);
      }
    )
  }


  obtenerIdentidad(){
    this._UsuariosService.tokenDatos().subscribe(
      (response) => {
        this.rol = 0
        if(response.data.role.role_id  )  this.rol = response.data.role.role_id
      },
      (error) => {
        this.rol = 0
      }
    );

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
    this.vehicles =""
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


      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  verCarros(){
    this._CarrosService.verCarros(this.totals.id).subscribe(
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

      },
      (error) => {
        console.log(<any>error);
      }
    )

  }

  busqueda(){
    this.vehicles =""



    let busqueda="?"
    if (this.totals.id != 0){
       busqueda="?per_page="+this.totals.id
    }

    if (this.valuesB.value != ""){
      if(busqueda != "?") busqueda= busqueda+"&"

      busqueda= busqueda + "sort="+this.valuesB.sort+this.valuesB.value
   }



   if(this.busquedaData.location){
    if(busqueda != "?") busqueda= busqueda+"&"

    busqueda= busqueda + "filter[location]="+ this.busquedaData.location}



    if(this.busquedaData.color){
      if(busqueda != "?") busqueda= busqueda+"&"

      busqueda= busqueda + "filter[color]="+this.busquedaData.color}

    if(this.PrecioRange.max != 0 ){
        if(busqueda != "?") busqueda= busqueda+"&"

        busqueda= busqueda + "filter[priceRange]="+this.PrecioRange.min +","+this.PrecioRange.max}

    if(this.MotorRange.max != 0 ){
        if(busqueda != "?") busqueda= busqueda+"&"

        busqueda= busqueda + "filter[engineRange]="+this.MotorRange.min +","+this.MotorRange.max}


    if(this.AnnosRange.max != 1970 ){
        if(busqueda != "?") busqueda= busqueda+"&"

        busqueda= busqueda + "filter[yearsRange]="+this.AnnosRange.min +","+this.AnnosRange.max}

    if(this.CilindrajeRange.max != 0 ){
        if(busqueda != "?") busqueda= busqueda+"&"

        busqueda= busqueda + "filter[cylindersRange]="+this.CilindrajeRange.min +","+this.CilindrajeRange.max}

    if(this.PuertasRange.max != 0 ){
        if(busqueda != "?") busqueda= busqueda+"&"

        busqueda= busqueda + "filter[doorsRange]="+this.PuertasRange.min +","+this.PuertasRange.max}



   if(this.busquedaData.fuel_type_id != 0){
    if(busqueda != "?") busqueda= busqueda+"&"

    busqueda= busqueda + "filter[fuel_type_id]="+ this.busquedaData.fuel_type_id}


   if(this.busquedaData.marca != 0){
    if(busqueda != "?") busqueda= busqueda+"&"

    busqueda= busqueda + "filter[brand_id]="+ this.busquedaData.marca}


   if(this.busquedaData.model_id != 0){
    if(busqueda != "?") busqueda= busqueda+"&"

    busqueda= busqueda + "filter[model_id]="+ this.busquedaData.model_id}









   this._CarrosService.verCarrorBusqueda(busqueda).subscribe(
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

        console.log(this.vehicles)

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


  VerUser(id:any){
    this._CarrosService.verVehicle(id).subscribe(
      response=>{

        this.ModalVehicles = response.data;

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


//imagen tratamiento

subirImagen(files:any){

  var filecapturado = files.target.files[0]

  this.file.push(filecapturado)

  this.extraerBase64(filecapturado).then((imagen:any)=> {
    this.previsualizacion = imagen.base
  })


  this._CarrosService.subirImagen(filecapturado).subscribe(
    (response)=>{

      console.log(response);
      this.CarroModel.image = response.path

    },
    (error)=>{

      console.log(error);

      console.log("respuesta error")
    }
  )
}






//busqueda data//

  buscarOn(){
    if (this.buscar === false) {
      this.buscar = true;
    } else {
      this.buscar = false;
    }
  }

  data(){

    this._CarrosService.verCombustible().subscribe(reponse => {
      this.combustible = reponse.data
    },err =>{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',

        text: "Error al buscar el parametro de busqueda 'combustible'"
                         ,
        showConfirmButton: true,
      })      })
    this._CarrosService.verMarca().subscribe(reponse => {
      this.marcas = reponse.data
    },err =>{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',

        text: "Error al buscar el parametro de busqueda 'Marca'"
                         ,
        showConfirmButton: true,
      })      }
      )
    this._CarrosService.verModelo().subscribe(reponse => {
      this.modelo = reponse.data
    }, err =>{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',

        text: "Error al buscar el parametro de busqueda 'Modelo'"
                         ,
        showConfirmButton: true,
      })      })



  }





  paginationNumber(){
    var pagi=[{}]
    for(var i=0;i<100;i++ ){
      pagi[i] = i+1
    }
    this.pag = pagi
  }




  //base 64


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })
}
