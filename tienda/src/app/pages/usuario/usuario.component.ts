import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();


  constructor( private auth: UsuarioService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    console.log("obteniendo id");
    console.log(id);

    if ( id !== 'nuevo' ) {

      this.auth.getUsuario( parseInt(id) )
        .subscribe( (resp: UsuarioModel) => {
          this.usuario = resp;
          this.usuario.id = parseInt(id);
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

    if ( this.usuario.id ) {
      peticion = this.auth.actualizarUsuario( this.usuario );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.usuario.username,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });



  }

}
