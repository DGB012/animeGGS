import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';

@Component({
  selector: 'app-usuario-siguiendo',
  templateUrl: './usuario-siguiendo.component.html',
  styleUrls: ['./usuario-siguiendo.component.scss']
})
export class UsuarioSiguiendoComponent implements OnInit {
  public usuario: any;
  public animesSiguiendo: Array<any> = [];
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
    for (let c = 0; c < this.usuario.siguiendo.length; c++) {
      for (let l = 0; l < animes.length; l++) {
        if (this.usuario.siguiendo[c].serie == animes[l].nombre) {
          this.animesSiguiendo.push(animes[l]);
        }
      }
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
