import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.scss']
})
export class GenerosComponent implements OnInit {

  public animes: any;
  public animesRandom: any;
  public categorias: Array<string> = [];
  public animesPorCategorias: Array<any> = [];

  constructor(private service: DatabaseAnimeService, private router: Router) { }

  ngOnInit(): void {
    this.service.getJson().subscribe((res) => {
      this.animes = res;
      this.animesRandom = [];
      for (let i = 0; i < this.animes.length; i++) {
        this.animesRandom.push(this.animes[i]);
      }
      fisherYatesShuffle(this.animesRandom);
      this.animesRandom = this.animesRandom.splice(0, 8);
      this.compruebaCategorias();
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
    this.mostrarAnimesPorCategoria();
  }

  mostrarAnimesPorCategoria() {

    for (let i = 0; i < this.categorias.length; i++) {
      let animesCat = []
      for (let f = 0; f < this.animes.length; f++) {
        let generos = this.animes[f].generos.split(",");
        for (let g = 0; g < generos.length; g++) {
          if (this.categorias[i] == generos[g]) {
            animesCat.push(f.toString());
          }
        }
      }
      let cat = {
        "categoria": this.categorias[i],
        "animes": animesCat
      }
      this.animesPorCategorias.push(cat);
    }
  }

  navegar(anime: string) {
    this.router.navigate(["anime/" + anime]);
  }

  navegarRecomendacion(anime: string) {
    this.router.navigate(["anime/" + anime]);
  }

  mostrarCategoria(generos: string) {
    this.router.navigate(["generos/" + generos]);
  }

}

function fisherYatesShuffle(arr: any) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}