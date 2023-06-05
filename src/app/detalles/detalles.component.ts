import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  public anime: any;
  public animes: any;
  public user: any;
  public animesRandom: any;
  public idAnime: any;
  public siguiendo = false;
  public txtSiguiendo = "Seguir";
  public posicionAnime: any;
  public comentarios: any;
  public coment: any;
  public episodios: Array<any> = [];

  constructor(private service: DatabaseAnimeService, private ruta: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ruta.params.subscribe(params => {
      this.idAnime = params['anime'];
      this.service.getUsers().subscribe((users) => {
        for (let i = 0; i < users.length; i++) {
          if (sessionStorage.getItem("usuario") == users[i].correo) {
            this.user = users[i];
          }
          this.service.getJson().subscribe((res) => {
            this.animes = res;

            this.animesRandom = [];
            for (let i = 0; i < this.animes.length; i++) {
              this.animesRandom.push(this.animes[i]);
            }
            fisherYatesShuffle(this.animesRandom);
            this.animesRandom = this.animesRandom.splice(0, 2);
            this.compruebaAnime();
          });
        }
      })

    })
  }

  compruebaAnime() {
    for (let i = 0; i < this.animes.length; i++) {
      if (this.idAnime == this.animes[i].nombre) {
        this.anime = this.animes[i];
        this.posicionAnime = i;
      }
    }
    if (this.user) {
      for (let g = 0; g < this.user.siguiendo.length; g++) {
        if (this.user.siguiendo[g].serie == this.anime.nombre) {
          this.siguiendo = true;
          this.txtSiguiendo = "Siguiendo";
        }
      }

      let existeVisualizacion = false;
      for (let g = 0; g < this.user.visualizaciones.length; g++) {
        if (this.user.visualizaciones[g].serie == this.anime.nombre) {
          existeVisualizacion = true;
        }
      }
      if (!existeVisualizacion) {
        this.user.visualizaciones.push({
          "serie": this.anime.nombre,
          "epVistos": ""
        })
        this.service.editUsuario(this.user);
      }
      this.episodios = [];
      for (let f = 0; f < this.animes[this.posicionAnime].episodios.length; f++) {
        let esta = false
        for (let g = 0; g < this.user.visualizaciones.length; g++) {
          if (this.user.visualizaciones[g].serie == this.anime.nombre) {
            for (let h = 0; h < this.user.visualizaciones[g].epVistos.split(",").length; h++) {
              if (this.user.visualizaciones[g].epVistos.split(",").length == 1 &&
                this.user.visualizaciones[g].epVistos.split(",")[0] == ''
              ) { } else {
                if (f == this.user.visualizaciones[g].epVistos.split(",")[h]) {
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

    if (this.anime.comentarios.length > 1) {
      this.comentarios = this.anime.comentarios.slice(1, this.anime.comentarios.length);
    }
  }

  seguirAnime() {
    if (sessionStorage.length == 0) {
      window.alert("Necesitas iniciar sesion primero")
    } else if (sessionStorage.length == 1) {
      if (this.siguiendo === true) {
        this.txtSiguiendo = "Seguir";
        this.siguiendo = false
        this.user.siguiendo = this.user.siguiendo.filter((obj: { serie: any; }) => obj.serie !== this.anime.nombre);
      } else {
        this.txtSiguiendo = "Siguiendo";
        this.siguiendo = true;
        this.user.siguiendo.push({
          "serie": this.anime.nombre
        })
      }
      this.service.editUsuario(this.user);
    }
  }

  opinar() {
    if (sessionStorage.length == 0) {
      window.alert("Necesitas iniciar sesion para poder opinar")
    } else {
      var newComent = {
        "usuario": sessionStorage.getItem("usuario"),
        "comentario": this.coment
      }
      this.animes[this.posicionAnime].comentarios.push(newComent);
      this.service.editAnime(this.animes[this.posicionAnime]);
      this.coment = null;
    }
  }

  mismoUsuario(usuario: any) {
    var sameUser = false;
    if (usuario == sessionStorage.getItem("usuario")) {
      sameUser = true;
    }
    return sameUser;
  }

  borrarComentario(numeroComentario: number) {
    var confirmacion = confirm("¿Estas seguro de eliminar este comentario?");

    if (confirmacion) {
      var newComentarios: Array<any> = [];
      if (numeroComentario == this.animes[this.posicionAnime].comentarios.length) {
        newComentarios = this.animes[this.posicionAnime].comentarios.slice(0, numeroComentario);
      } else if (numeroComentario < this.animes[this.posicionAnime].comentarios.length) {
        for (var i = 0; i < numeroComentario; i++) {
          newComentarios.push(this.animes[this.posicionAnime].comentarios[i]);
        }
        for (var i = numeroComentario + 1; i < this.animes[this.posicionAnime].comentarios.length; i++) {
          newComentarios.push(this.animes[this.posicionAnime].comentarios[i]);
        }
      }
      this.animes[this.posicionAnime].comentarios = newComentarios;
      this.service.editAnime(this.animes[this.posicionAnime]);
      if (this.anime.comentarios.length <= 1) {
        this.comentarios = null;
      }
    }
  }

  navegar(ep: number) {
    this.router.navigate(["ver/" + this.anime.nombre + "/" + ep]);
  }

  navegarRecomendacion(anime: string) {
    this.router.navigate(["anime/" + anime]);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}

function fisherYatesShuffle(arr: any) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}