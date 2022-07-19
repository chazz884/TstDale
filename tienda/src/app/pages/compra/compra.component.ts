import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProductosService } from '../../services/productos.service';

import Swal from 'sweetalert2';
import { ProductoModel } from 'src/app/models/producto.model';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  producto: ProductoModel = new ProductoModel();
  cantidad: number;

  constructor( private productosService: ProductosService,
               private route: ActivatedRoute ) { 
                this.cantidad = 1
  }

  ngOnInit() {
    this.cantidad = 1;

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.productosService.getProducto( parseInt(id) )
        .subscribe( (resp: ProductoModel) => {
          this.producto = resp;
          this.producto.id = parseInt(id);
          // this.producto.cantidad = 1;
        });

    }


  }
  sumar(){
    this.cantidad++
  }
  restar(){
    if (this.cantidad == 1) {
      this.cantidad == 1;
    }else{
      this.cantidad--
    }
  }

  comprar() {

    Swal.fire({
      title: 'Espere',
      text: 'Realizando compra',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    setTimeout(() => {
      Swal.hideLoading();

        Swal.fire({
          title: "Producto "+ this.producto.nombre,
          text: 'Se realizó correctamente',
          type: 'success'
        });
    }, 3000);
  }



}
