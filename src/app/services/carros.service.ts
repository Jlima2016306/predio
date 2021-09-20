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
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');



  constructor(public _http: HttpClient) { }


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



  CreaUsers(usuario:any): Observable<any>{
    let params = JSON.stringify(usuario);


    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());
    console.log(headersToken)

    return this._http.post(this.url + '/users',params,{headers: headersToken})

  }

    verVehicle(id:any): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/vehicles/'+id,{headers: headersToken})

  }

  EditUser(usuario:any,id:any): Observable<any>{
    let params = JSON.stringify(usuario);


    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());
    console.log(headersToken)

    return this._http.put(this.url + '/users/'+id,params,{headers: headersToken})

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


}



