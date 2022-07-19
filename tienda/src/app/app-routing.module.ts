import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { CompraComponent } from './pages/compra/compra.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent, },
  { path: 'clientes', component: ClientesComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: 'compra/:id', component: CompraComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
