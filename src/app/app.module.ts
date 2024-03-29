import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { CargandoComponent } from './cargando/cargando.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { Carrusel2Component } from './carrusel2/carrusel2.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetallesComponent } from './detalles/detalles.component';
import { EpisodiosComponent } from './episodios/episodios.component';
import { ErrorComponent } from './error/error.component';
import { GeneroComponent } from './genero/genero.component';
import { GenerosComponent } from './generos/generos.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SafePipe } from './safe.pipe';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioViendoComponent } from './usuario-viendo/usuario-viendo.component';
import { UsuarioSiguiendoComponent } from './usuario-siguiendo/usuario-siguiendo.component';
import { AleatoriosComponent } from './aleatorios/aleatorios.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    CargandoComponent,
    CarruselComponent,
    Carrusel2Component,
    AdministradorComponent,
    BusquedaComponent,
    DetallesComponent,
    EpisodiosComponent,
    ErrorComponent,
    GeneroComponent,
    GenerosComponent,
    LoginComponent,
    SignupComponent,
    SafePipe,
    UsuarioComponent,
    UsuarioViendoComponent,
    UsuarioSiguiendoComponent,
    AleatoriosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
