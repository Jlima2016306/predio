import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders} from "@angular/common/http";

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
  }


  login(usuario:Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.post(this.url + '/login', params, {headers: this.headersVariable})

  }

  tokenDatos(): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/user',{headers: headersToken})

  }

  endSesion(): Observable<any>{

    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());
    console.log(headersToken)

    return this._http.post(this.url + '/logout',headersToken,{headers: headersToken})

  }


  verUsuarios(total:any): Observable<any>{
    var link = "/users"

    if(total != 0){

      link = "/users/?per_page="+total
    }


    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + link,{headers: headersToken})

  }


  verUsuariosPagination(link:any): Observable<any>{


    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(link,{headers: headersToken})

  }

  verUsuariosBusqueda(filters:any): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/users/'+filters,{headers: headersToken})

  }

  CreaUsers(usuario:any): Observable<any>{
    let params = JSON.stringify(usuario);


    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());
    console.log(headersToken)

    return this._http.post(this.url + '/users',params,{headers: headersToken})

  }

  EditUser(usuario:any,id:any): Observable<any>{
    let params = JSON.stringify(usuario);


    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());
    console.log(headersToken)

    return this._http.put(this.url + '/users/'+id,params,{headers: headersToken})

  }


  verUsuario(id:any): Observable<any>{



    let headersToken = this.headersVariable.set('Authorization','Bearer '+ this.getToken());

    return this._http.get(this.url + '/users/'+id,{headers: headersToken})

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

