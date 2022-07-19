import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map,delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = '/api';

  userToken: string;


  constructor( private http: HttpClient ) {
  }

  actualizarUsuario( usuario: UsuarioModel ) {
    

    const productoTemp = {
      ...usuario
    };
    console.log(productoTemp);

    return this.http.put(`${ this.url }/contact/${ usuario.id }`, productoTemp);


  }

  getUsuario( id: number ) {

    return this.http.get(`${ this.url }/contact/${ id }`);

  }

  getUsuarios() {
    return this.http.get(`${ this.url }/contact`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( usuarioObj: object ) {
    try {
      const usuario: UsuarioModel[] = [];
      
      Object.keys( usuarioObj ).forEach( key => {
  
        const producto: UsuarioModel = usuarioObj[key];
  
        usuario.push( producto );
      });
      
      return usuario;
    } catch (error) {
      return []
    }
  }

  borrarUsuario( id: number ) {

    return this.http.delete(`${ this.url }/contact/${ id }`);

  }


}
