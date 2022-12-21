import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';
import { episodios } from '../interfaces/episodios';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.scss']
})
export class EpisodiosComponent implements OnInit {

  public anime: any;
  public animes: any;
  public idAnime: any;
  public episodio: number = 0;
  public enlace: any;
  public visto = false
  public txtVisto = "Marcar como visto"
  public posicionAnime: any;
  public episodios: Array<any> = [];

  constructor(private service: DatabaseAnimeService, private ruta: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ruta.params.subscribe(params => {
      this.idAnime = params['anime'];
      this.episodio = parseInt(params['episodio']);
      this.service.getJson().subscribe((res) => {
        this.animes = res;
        this.compruebaAnime();
        this.compruebaRutaCorrecta();
        this.enlace = this.anime.episodios[this.episodio - 1].ep;
      });
    })
  }

  compruebaRutaCorrecta() {
    if (this.episodio > this.anime.episodios.length) {
      this.router.navigate(["error"]);
    }
  }

  compruebaAnime() {
    for (let i = 0; i < this.animes.length; i++) {
      if (this.idAnime == this.animes[i].nombre) {
        this.anime = this.animes[i];
        this.posicionAnime = i;
        if (sessionStorage.length == 1) {
          for (let f = 0; f < this.animes[i].episodios[this.episodio - 1].usuariosVisto.length; f++) {
            if (sessionStorage.getItem("usuario") == this.animes[i].episodios[this.episodio - 1].usuariosVisto[f]) {
              this.visto = true;
              this.txtVisto = "Marcar como no visto";
            }
          }
        }
      }
    }
    this.episodios = [];
    for (let f = 0; f < this.animes[this.posicionAnime].episodios.length; f++) {
      let esta = false
      for (let g = 0; g < this.animes[this.posicionAnime].episodios[f].usuariosVisto.length; g++) {
        if (sessionStorage.getItem("usuario") == this.animes[this.posicionAnime].episodios[f].usuariosVisto[g]) {
          esta = true;
        }
      }
      this.episodios.push(esta)
    }
  }

  cambiarEpisodio(num: number) {
    this.router.navigate(["ver/" + this.anime.nombre + "/" + num]);
  }

  navegarDetalles() {
    this.router.navigate(["anime/" + this.anime.nombre]);
  }

  marcarVisto() {
    if (sessionStorage.length == 0) {
      window.alert("Necesitas iniciar sesion primero")
    } else if (sessionStorage.length == 1) {
      if (this.visto === true) {
        this.txtVisto = "Marcar como visto";
        this.visto = false
        let usuarios = [];
        for (let f = 0; f < this.animes[this.posicionAnime].episodios[this.episodio - 1].usuariosVisto.length; f++) {
          if (sessionStorage.getItem("usuario") != this.animes[this.posicionAnime].episodios[this.episodio - 1].usuariosVisto[f]) {
            usuarios.push(this.animes[this.posicionAnime].episodios[this.episodio - 1].usuariosVisto[f]);
          }
        }
        this.animes[this.posicionAnime].episodios[this.episodio - 1].usuariosVisto = usuarios;
        this.service.editAnime(this.animes[this.posicionAnime]);

      } else {
        this.txtVisto = "Marcar como no visto";
        this.visto = true;
        this.animes[this.posicionAnime].episodios[this.episodio - 1].usuariosVisto.push(sessionStorage.getItem("usuario"));
        this.service.editAnime(this.animes[this.posicionAnime]);
      }
    }
  }
}
