import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesComponent } from './detalles/detalles.component';
import { EpisodiosComponent } from './episodios/episodios.component';
import { InicioComponent } from './inicio/inicio.component';
import { GenerosComponent } from './generos/generos.component';
import { GeneroComponent } from './genero/genero.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [
  { path: '', redirectTo: "inicio", pathMatch: "full" },
  { path: 'inicio', component: InicioComponent },
  { path: 'anime/:anime', component: DetallesComponent },
  { path: 'ver/:anime/:episodio', component: EpisodiosComponent },
  { path: 'generos', component: GenerosComponent },
  { path: 'generos/:genero', component: GeneroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'buscar/:busqueda', component: BusquedaComponent },
  { path: 'admin', component: AdministradorComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }