import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { ProductoModel } from '../models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = '/api';


  constructor( private http: HttpClient ) { }


  crearProducto( producto: ProductoModel ) {
    console.log("creando");
    console.log(producto);

    return this.http.post(`${ this.url }/Producto`, producto)
            .pipe(
              map( (resp: any) => {
                producto.id = resp.name;
                return producto;
              })
            );

  }

  actualizarProducto( producto: ProductoModel ) {

    const productoTemp = {
      ...producto
    };

    // delete productoTemp.id;

    console.log("ACTUALIZANDO");
    console.log(productoTemp);
    // console.log(productoTemp.id);

    return this.http.put(`${ this.url }/Producto/${ producto.id }`, productoTemp);


  }

  borrarProducto( id: number ) {

    return this.http.delete(`${ this.url }/Producto/${ id }`);

  }


  getProducto( id: number ) {

    return this.http.get(`${ this.url }/Producto/${ id }`);

  }


  getProductos() {
    return this.http.get(`${ this.url }/Producto`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( productoObj: object ) {
    try {
      const productos: ProductoModel[] = [];
      
      Object.keys( productoObj ).forEach( key => {
  
        const producto: ProductoModel = productoObj[key];
  
        productos.push( producto );
      });
      
      return productos;
    } catch (error) {
      return []
    }
  }

  headers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    });
    return headers;
  }


}
