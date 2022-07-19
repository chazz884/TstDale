import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductoModel } from 'src/app/models/producto.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: ProductoModel[] = [];
  cargando = false;
  rol: string;
  producto: ProductoModel;
  closeResult: string;
  cantidad: number;

  rol1:string; 
  rol2:string; 

  constructor( private productoService: ProductosService,
    private auth: AuthService,private router: Router,private modalService: NgbModal,) {
      this.rol = localStorage.getItem('rol');
      this.producto = new ProductoModel();
      this.cantidad = 1;
     }

  ngOnInit() {

    this.cargando = true;
    this.productoService.getProductos()
      .subscribe( resp => {
        if (resp != []) {
          this.productos = resp;
          this.cargando = false;
        } else {
          this.cargando = false;
        }
      });

  }
    
  cerrar(razon: any) {
      this.modalService.dismissAll(razon);
  }

  comprar(){

  }

  borrarProducto( producto: ProductoModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ producto.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.productos.splice(i, 1);
        this.productoService.borrarProducto( producto.id ).subscribe();
      }

    });
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }


}
