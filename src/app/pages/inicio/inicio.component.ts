import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {CarrosService} from '../../services/carros.service';
import { Carro } from '../../models/carro.model';
import { dataCarros } from '../../models/aditamentos.model';
import { dataSort } from '../../models/aditamentos.model';


import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


import { Options} from '@angular-slider/ngx-slider';


//interfaces



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [UsuariosService, CarrosService]
})



export class InicioComponent implements OnInit  {

  title = 'ngx-slider';

  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 1000000,
    getPointerColor: (value: number): string => {
      return 'orange';
  },


  showSelectionBar: true,

    selectionBarGradient: {
      from: 'white',
      to: '#FC0'
    }
  };

  date = new Date()

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

  public busquedaData!: Carro
  public totals!:Usuario;

  //data de busqueda
  public combustible: any;
  public modelo:any;
  public marcas:any;

  constructor(
    private _CarrosService: CarrosService,
    private _UsuariosService: UsuariosService,
    private _router: Router
  ) {
    this.PrecioRange = new dataCarros(0,0)
    this.AnnosRange = new dataCarros(0,0)
    this.MotorRange = new dataCarros(0,0)
    this.CilindrajeRange = new dataCarros(0,0)
    this.PuertasRange = new dataCarros(0,0)

    this.valuesB = new dataSort("","")

    this.users = new Usuario(0,"","","","",2,"","");
    this.carros = new Carro(0,"","","",0,"",0,0,0,"",0,0,0,"","",0);
    this.totals = new Usuario(0,"","","","", 0,"","")
    this.busquedaData =  new Carro(0,"","","",0,"",0,0,0,"",0,0,0,"","",0);

  }

  ngOnInit(): void {
    this.verCarros()
    this.paginationNumber();
    this.data()
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
        console.log(response.data)


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
        console.log(this.vehicles)


      },
      (error) => {
        console.log(<any>error);
      }
    )

  }

  busqueda(){
    this.vehicles =""

    console.log(this.totals.id)



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



   if(this.busquedaData.fuel_type != 0){
    if(busqueda != "?") busqueda= busqueda+"&"

    busqueda= busqueda + "filter[fuel_type_id]="+ this.busquedaData.fuel_type}


   if(this.busquedaData.marca != 0){
    if(busqueda != "?") busqueda= busqueda+"&"

    busqueda= busqueda + "filter[brand_id]="+ this.busquedaData.marca}


   if(this.busquedaData.model != 0){
    if(busqueda != "?") busqueda= busqueda+"&"

    busqueda= busqueda + "filter[model_id]="+ this.busquedaData.model}




        console.log(busqueda)





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
        console.log(response)
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


  VerUser(id:any){
    this._CarrosService.verVehicle(id).subscribe(
      response=>{

        this.ModalVehicles = response.data;
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
      console.log(this.combustible);
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
      console.log(this.marcas);
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
      console.log(reponse);
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
    console.log(pagi)
  }

}
