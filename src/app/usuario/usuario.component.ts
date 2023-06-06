import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public usuario: any;
  public animesVistos: Array<any> = [];
  public animesSeguidos: Array<any> = [];
  public puedeCargar = false;
  public hayVistos = false;
  public haySeguidos = false;

  constructor(private service: DatabaseAnimeService, private ruta: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.compruebaUsuario();
    this.service.getUsers().subscribe((users) => {
      for (let i = 0; i < users.length; i++) {
        if (sessionStorage.getItem("usuario") == users[i].correo) {
          this.usuario = users[i];
        }
      }
      this.service.getJson().subscribe((animes) => {
        this.buscarAnimes(animes);
      });
      this.puedeCargar = true;
    });
  }

  compruebaUsuario(): void {
    if (sessionStorage.length == 0) { history.go(-1); }
  }

  buscarAnimes(animes: any) {
    for (let i = 0; i < this.usuario.visualizaciones.length; i++) {
      for (let g = 0; g < animes.length; g++) {
        if (this.usuario.visualizaciones[i].serie == animes[g].nombre &&
          this.usuario.visualizaciones[i].epVistos.split(",")[0] != "") {
          this.animesVistos.push(animes[g]);
        }
      }
    }
    if (this.animesVistos.length > 0) {
      this.hayVistos = true;
    }

    for (let c = 0; c < this.usuario.siguiendo.length; c++) {
      for (let l = 0; l < animes.length; l++) {
        if (this.usuario.siguiendo[c].serie == animes[l].nombre) {
          this.animesSeguidos.push(animes[l]);
        }
      }
    }
    if (this.animesSeguidos.length > 0) {
      this.haySeguidos = true;
    }
  }

  comprobarVistosYSeguidos() {

  }

  mostrarModo(modo: string) {
    console.log(modo);
    this.router.navigate(["usuario/" + modo]);
  }

  navegar(anime: string) {
    this.router.navigate(["anime/" + anime]);
  }

}
