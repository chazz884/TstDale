import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  usuario: UsuarioModel[] = [];
  cargando = false;
  rol: string;
  closeResult: string;
  cantidad: number;

  rol1:string; 
  rol2:string; 

  constructor(private usuarioService: UsuarioService,private router: Router,private modalService: NgbModal,) {
      this.rol1 = "usuario";
      this.rol2 = "vendedor";
      this.rol = this.rol2;
      this.cantidad = 1;
     }

  ngOnInit() {

    this.cargando = true;
    this.usuarioService.getUsuarios()
      .subscribe( resp => {
        if (resp != []) {
          this.usuario = resp;
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

  borrarUsuario( usuario: UsuarioModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ usuario.username }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.usuario.splice(i, 1);
        this.usuarioService.borrarUsuario( usuario.id ).subscribe();
      }

    });
  }


}
