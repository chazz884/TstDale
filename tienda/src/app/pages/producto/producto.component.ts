import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProductosService } from '../../services/productos.service';

import Swal from 'sweetalert2';
import { ProductoModel } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: ProductoModel = new ProductoModel();


  constructor( private productosService: ProductosService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    console.log("obteniendo id");
    console.log(id);

    if ( id !== 'nuevo' ) {

      this.productosService.getProducto( parseInt(id) )
        .subscribe( (resp: ProductoModel) => {
          this.producto = resp;
          this.producto.id = parseInt(id);
        });

    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.producto.id ) {
      peticion = this.productosService.actualizarProducto( this.producto );
    } else {
      peticion = this.productosService.crearProducto( this.producto );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.producto.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });



  }

}
