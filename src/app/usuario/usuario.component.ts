import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';
import { anime } from '../interfaces/anime';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public usuario: any;
  public animesUsuario: Array<any> = [];
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
    let animesViendo: Array<any> = [];
    for (let i = 0; i < this.usuario.visualizaciones.length; i++) {
      for (let g = 0; g < animes.length; g++) {
        if (this.usuario.visualizaciones[i].serie == animes[g].nombre &&
          this.usuario.visualizaciones[i].epVistos.split(",")[0] != "") {
          animesViendo.push(animes[g]);
        }
      }
    }
    this.animesUsuario.push({
      "modo": "visualizaciones",
      "animes": animesViendo
    });

    let animesSiguiendo: Array<any> = [];
    for (let c = 0; c < this.usuario.siguiendo.length; c++) {
      for (let l = 0; l < animes.length; l++) {
        if (this.usuario.siguiendo[c].serie == animes[l].nombre) {
          animesSiguiendo.push(animes[l]);
        }
      }
    }
    this.animesUsuario.push({
      "modo": "siguiendo",
      "animes": animesSiguiendo
    });
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
