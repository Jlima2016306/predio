import { Component, OnInit} from '@angular/core';

import {CarrosService} from '../../services/carros.service';
import { ChartType } from 'chart.js';

import { DomSanitizer } from '@angular/platform-browser';

import { DatepickerOptions } from 'ng2-datepicker';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  providers: [CarrosService]
})
export class EstadisticasComponent implements OnInit {

  //grafica de lineas
  private pruebasArray!:any;
  public data!:any;
  public MedicionTiempo = 1
  public meses = [1,2,3,4,5,6,7,8,9,10,12]
  public annos = [1,2,3,4,5]




  estado = true;
  chartInicial:ChartType  = 'line';
  chartInicialV:ChartType  = 'line';


  chartTypes = [
    { nombreTipo: 'pie', texto: 'Circular'},
    { nombreTipo: 'line', texto: 'Lineas'},
    { nombreTipo: 'radar', texto: 'Radar'},
    { nombreTipo: 'polarArea', texto: 'Polar'},
    { nombreTipo: 'bar', texto: 'Barras'},

  ]



  chartOptions = {
    responsive: true,
  };

  chartLabels = <any>[];

  chartData = <any>[];

  chartColors = [
    {
      backgroundColor: <any>[]
    },
  ];

  chartLegend = true;
  chartPlugins = [];


  chartOptionsV = {
    responsive: true,
  };

  chartLabelsV = <any>[];

  chartDataV = <any>[];

  chartColorsV = [
    {
      backgroundColor: <any>[]
    },
  ];

  chartLegendV = false;
  chartPluginsV = [];



  //recbidores
  public VentasAnuales!:any;
  public VentasMensuales!:any;
  public mes = 12
  public anno = 5

  public promedio!:any;
  public topMarca!:any;
  public lowMarca!:any;
  public topVendedor!:any;
  public lowVendedor!:any;

  public reporteLink!:any;

//fecha

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


  constructor(
    private _CarrosService:CarrosService
  ) { }



  ngOnInit(): void {
    this.ventas()
    this.vendedores()
    this.Tops()
  }

  ventas(){
    if(this.chartInicial  == 'line' )   this.chartLegend = false;



    var id = this.MedicionTiempo
    var filtersAnual = "?years="+ this.anno
    var filtersMensual = "?months="+ this.mes

    if(id == null || id == 1){

      this.chartLabels = <any>[];

      this.chartData = <any>[];


      this.chartColors = [
        {
          backgroundColor: <any>[]
        },
      ];
      this._CarrosService.verAño(filtersAnual).subscribe(

        (response) => {

          var dataGraficasz = (response.sales);

          var dato = response.sales;
          let keys = Object.keys(dato)
          for (let index = 0; index < keys.length; index++) {
            let clave = keys[index]

            this.chartLabels.push(clave);
            this.chartData.push(dato[clave]);
            this.chartColors[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);

          }},

        (err) => {

          console.log(<any>err);


        }
    )

    }

    if(id == 2){

      this.chartLabels = <any>[];

      this.chartData = <any>[];


      this.chartColors = [
        {
          backgroundColor: <any>[]
        },
      ];
      this._CarrosService.verMes(filtersMensual).subscribe(

        (response) => {

          console.log(response.sales);


          var dato = response.sales;
          let keys = Object.keys(dato)
          for (let index = 0; index < keys.length; index++) {
            let clave = keys[index]

            this.chartLabels.push(clave);
            this.chartData.push(dato[clave]);
            this.chartColors[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);

          }},



        (err) => {

          console.log(<any>err);


        }
    )

    }



  }

  vendedores(){
    this._CarrosService.ventasPorVendedor().subscribe((response)=>{

      var dato = response.sales;
      console.log(response.sales)


      for (let index = 0; index < dato.length; index++) {
        this.chartLabelsV.push(dato[index].name);
        this.chartDataV.push(dato[index].sales_count);
        this.chartColorsV[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
      }
      })


  }



  Tops() {


    this._CarrosService.promedioVentas().subscribe(reponse => {
      this.promedio = reponse.average
      console.log(this.promedio)
    },
    (error)=>{
      console.log(error)
    })

    //
    this._CarrosService.marcaMasVendida().subscribe(reponse => {
      this.topMarca = reponse.brand
    },
    (error)=>{
      console.log(error)
    })
//7



    this._CarrosService.marcaMenosVendida().subscribe(reponse => {
      this.lowMarca =   reponse.brand

    },
    (error)=>{
      console.log(error)
    })



    this._CarrosService.vendedorConMasVentas().subscribe(reponse => {
      this.topVendedor = reponse.seller
    },
    (error)=>{
      console.log(error)
    })


    this._CarrosService.vendedorConMenosVentas().subscribe(reponse => {
      console.log(reponse)
      this.lowVendedor = reponse.seller

    },
    (error)=>{
      console.log(error)
    })

















  }


  Reporte(){
    var filters = "?"

    if(this.date1 != null ){
      if(this.date2 != null){
        if(filters != "?") filters= filters+"&"

        filters= filters + "filter[dateRange]="+this.date1.toISOString().split('T')[0] +","+this.date2.toISOString().split('T')[0]}


      }

    this._CarrosService.Reporte(filters).subscribe(response=>{

          this.reporteLink = response.filepath
      console.log(this.reporteLink)
    },
    error=>{
      console.log(error)
    })
  }

  limiarReporte(){
    this.reporteLink = null
  }




}
