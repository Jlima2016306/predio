import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  public url = "http://demo-api.lumationsuite.com/index.php/api"
  public identidad!: any;

  public token!: any;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');



  constructor(public _http: HttpClient) { }


  registro(usuario:any): Observable<any>{

    let params = JSON.stringify(usuario);
    console.log(params)

    return this._http.post(this.url + '/users',params, { headers: this.headersVariable })
    // `${this.url}/registrarUsuario`
  }


  login(usuario:Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.post(this.url + '/login', params, {headers: this.headersVariable})

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

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad')!);
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }


}

