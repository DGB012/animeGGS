import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.scss']
})
export class EpisodiosComponent implements OnInit {

  public anime: any;
  public animes: any;
  public user: any;
  public episodiosVistos: any;
  public idAnime: any;
  public episodio: number = 0;
  public enlace: any;
  public visto = false
  public txtVisto = "Marcar como visto"
  public posicionAnime: any;
  public episodios: Array<any> = [];

  constructor(private service: DatabaseAnimeService, private ruta: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ruta.params.subscribe(params => {
      this.idAnime = params['anime'];
      this.episodio = parseInt(params['episodio']);

      this.service.getUsers().subscribe((users) => {
        for (let i = 0; i < users.length; i++) {
          if (sessionStorage.getItem("usuario") == users[i].correo) {
            this.user = users[i];
          }
          this.service.getJson().subscribe((res) => {
            this.animes = res;
            this.compruebaAnime();
            this.compruebaRutaCorrecta();
            this.enlace = this.anime.episodios[this.episodio - 1].ep;
          });
        }
      });
    });
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
      }
    }

    if (sessionStorage.length == 1) {
      let existeVisualizacion = false;
      for (let g = 0; g < this.user.visualizaciones.length; g++) {
        if (this.user.visualizaciones[g].serie == this.anime.nombre) {
          existeVisualizacion = true;
          this.episodiosVistos = this.user.visualizaciones[g].epVistos.split(",");
          if (this.episodiosVistos.length == 1 &&
            this.episodiosVistos[0] == ''
          ) {
          }
          else {
            for (let r = 0; r < this.episodiosVistos.length; r++) {
              if (this.episodiosVistos[r] == (this.episodio - 1)) {
                this.visto = true;
                this.txtVisto = "Marcar como no visto";
              }
              else {
                this.visto = false;
                this.txtVisto = "Marcar como visto";
              }
            }
          }
        }
      }

      if (!existeVisualizacion) {
        this.user.visualizaciones.push({
          "serie": this.anime.nombre,
          "epVistos": ""
        });
        this.visto = false;
        this.txtVisto = "Marcar como visto";
        this.service.editUsuario(this.user);
        existeVisualizacion = true;
      }

      this.episodios = [];
      for (let f = 0; f < this.animes[this.posicionAnime].episodios.length; f++) {
        let esta = false
        for (let g = 0; g < this.user.visualizaciones.length; g++) {
          if (this.user.visualizaciones[g].serie == this.anime.nombre) {

            for (let h = 0; h < this.episodiosVistos.length; h++) {
              if (this.episodiosVistos.length == 1 &&
                this.episodiosVistos[0] == ''
              ) { }
              else {
                if (f == this.episodiosVistos[h]) {
                  esta = true;
                }
              }
            }
          }
        }

        this.episodios.push(esta);
      }
    } else {
      this.episodios = [];
      for (let f = 0; f < this.animes[this.posicionAnime].episodios.length; f++) {
        this.episodios.push(false);
      }
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
      this.toastr.warning("Necesitas iniciar sesion primero", 'Marcar como visto dice:', {
        positionClass: 'toast-center-center'
      });
    } else if (sessionStorage.length == 1) {
      this.user.visualizaciones = this.user.visualizaciones.filter((obj: { serie: any; }) => obj.serie !== this.anime.nombre);
      if (this.visto === true) {
        this.txtVisto = "Marcar como visto";
        this.visto = false
        let epVistos = [];
        for (let f = 0; f < this.episodiosVistos.length; f++) {
          if (this.episodiosVistos[f] != (this.episodio - 1)) {
            epVistos.push(this.episodiosVistos[f]);
          }
        }
        this.user.visualizaciones.push({
          "serie": this.anime.nombre,
          "epVistos": epVistos.toString()
        });

      } else {
        this.txtVisto = "Marcar como no visto";
        this.visto = true;
        this.user.visualizaciones = this.user.visualizaciones.filter((obj: { serie: any; }) => obj.serie !== this.anime.nombre);
        this.episodiosVistos.push(this.episodio - 1);
        this.user.visualizaciones.push({
          "serie": this.anime.nombre,
          "epVistos": this.episodiosVistos.filter((str: string) => str !== '').toString()
        });
      }
      this.service.editUsuario(this.user);

    }
  }
}
