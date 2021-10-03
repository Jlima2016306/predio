import { Injectable } from '@angular/core';
import { Carro } from '../models/carro.model';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  public url = "http://demo-api.lumationsuite.com/index.php/api"
  public identidad!: any;

  public token!: any;
  public variablesheader = new HttpHeaders();
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');



  constructor(public _http: HttpClient) { }


  VenderVehicle(vehicle:any): Observable<any>{

    let params = JSON.stringify(vehicle);


    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.post(this.url + '/sales',params,{headers: headersToken})

  }

  VerVentasVehicle(filters:any): Observable<any>{


    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/sales/'+filters,{headers: headersToken})

  }


  CrearVehicle(vehicle:any): Observable<any>{

    let params = JSON.stringify(vehicle);


    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.post(this.url + '/vehicles',params,{headers: headersToken})

  }


  verCarros(total:any): Observable<any>{
    var vehicle = "/public/vehicles"

    var link = ""

    if(total != 0){

      link = "/?per_page="+total
    }
    vehicle= vehicle + link



    let headersToken = this.headersVariable

    if(this.getToken() != null){
      var vehicle ="/vehicles"
      vehicle= vehicle + link


      headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());
    }

    return this._http.get(this.url + vehicle,{headers:  headersToken})

  }



  verCarrorBusqueda(filters:any): Observable<any>{

    var vehicle = "/public/vehicles"



    let headersToken = this.headersVariable

    if(this.getToken() != null){
       vehicle ="/vehicles"


      headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());
    }
     console.log(vehicle)

    return this._http.get(this.url + vehicle+"/"+filters,{headers: headersToken})

  }







  verCarrosPagination(link:any): Observable<any>{

    let headersToken = this.headersVariable

    if(this.getToken() != null){

      headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    }
console.log(link)

    return this._http.get(link,{headers: headersToken})

  }



  subirImagen(archivo:any): Observable<any>{

    const formularioDeDatos = new FormData();


    formularioDeDatos.append('image', archivo)


      var filesHttpOptions = {

        headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.getToken(),

        }).set("Access-Control-Allow-Origin", "*")
        }


    return this._http.post(this.url + '/uploads',  formularioDeDatos, filesHttpOptions)

  }




    verVehicle(id:any): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/vehicles/'+id,{headers: headersToken})

  }




  verMarca(): Observable<any>{


    return this._http.get(this.url + '/brands',{headers: this.headersVariable})

  }

  verModelo(): Observable<any>{

    return this._http.get(this.url + '/models',{headers:this.headersVariable})

  }

  verCombustible(): Observable<any>{




    return this._http.get(this.url + '/fuel_types',{headers:this.headersVariable})

  }




  getToken(){
    var token2 = localStorage.getItem('token')
    if(token2 != 'undefined'){
      this.token = token2

    }else{
      this.token = null;
    }
    return this.token;
  }



  //graficas
  verAño(filters:any): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/stats/salesPerYear'+filters,{headers: headersToken})

  }

  verMes(filters:any): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/stats/salesPerMonth'+filters,{headers: headersToken})

  }


  promedioVentas(): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/stats/averageSale',{headers: headersToken})

  }

  ventasPorVendedor(): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/stats/salesPerSeller',{headers: headersToken})

  }

  marcaMasVendida(): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/stats/mostSoldBrand',{headers: headersToken})

  }

  marcaMenosVendida(): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/stats/leastSoldBrand',{headers: headersToken})

  }

  vendedorConMasVentas(): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/stats/topSeller',{headers: headersToken})

  }

  vendedorConMenosVentas(): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/stats/lowestSeller',{headers: headersToken})

  }


  Reporte(filters:any): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/export/sales'+filters,{headers: headersToken})

  }





}





