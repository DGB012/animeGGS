import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public anime: any;
  public animes: any;
  public idAnime: any;
  public categorias: Array<string> = [];
  public mostrarMenu = false;
  public mostrarCategorias = false;
  public mostrarBuscador = false;
  public busqueda: string = "";
  public flecha = "►";
  public admin: any;
  public esAdmin = false;

  constructor(private service: DatabaseAnimeService, private ruta: ActivatedRoute, private router: Router) { }

  public sesion: any;

  ngOnInit(): void {
    this.sesion = sessionStorage.length;
    if (this.animes) {
      this.compruebaCategorias();
      this.compruebaAdmin();
    }
    this.service.getJson().subscribe((res) => {
      this.animes = res;
      this.compruebaCategorias();
      this.compruebaAdmin();
    });
  }

  compruebaCategorias() {
    for (let i = 0; i < this.animes.length; i++) {
      let generos = this.animes[i].generos.split(",");
      for (let f = 0; f < generos.length; f++) {
        this.categorias.push(generos[f]);
      }
    }
    this.categorias = [...new Set(this.categorias)].sort();
  }

  compruebaAdmin() {
    if (sessionStorage.length == 1) {
      this.service.getAdmin().subscribe((res) => {
        this.admin = res;
        for (let i = 0; i < this.admin.length; i++) {
          if (this.admin[i].value == sessionStorage.getItem("usuario")) {
            this.esAdmin = true;
          }
        }
      });
    }
  }

  navegarAdmin() {
    this.mostrarMenu = false;
    this.mostrarCategorias = false;
    this.router.navigate(["admin"]);
  }

  logout() {
    sessionStorage.removeItem("usuario");
    this.sesion = sessionStorage.length
    window.location.reload();
  }

  verGeneros() {
    this.mostrarMenu = false;
    this.mostrarCategorias = false;
    this.router.navigate(["generos"]);
  }

  login() {
    this.router.navigate(["login"]);
  }

  mostrarCategoria(generos: string) {
    this.mostrarMenu = false;
    this.mostrarCategorias = false;
    this.router.navigate(["generos/" + generos]);
  }

  navegar() {
    this.mostrarMenu = false;
    this.mostrarCategorias = false;
    this.router.navigate(["inicio"]);
  }

  setMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  setBuscador() {
    this.mostrarBuscador = !this.mostrarBuscador;
  }

  buscarAnime() {
    this.router.navigate(["buscar/" + this.busqueda.toLowerCase()]);
    this.busqueda = "";
    this.setBuscador();
  }

  EnterSubmit(event: any) {
    if (event.keyCode === 13) {
      this.buscarAnime();
    }
  }

  setMenuCategorias() {
    this.mostrarCategorias = !this.mostrarCategorias;
    if (this.mostrarCategorias === true) {
      this.flecha = "▼";
    } else {
      this.flecha = "►";
    }
  }

}
