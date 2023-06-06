import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  public allAnimes: any;
  public animesCoincidencias: Array<any> = [];
  public busqueda: any;
  public animesRandom: any;
  constructor(private service: DatabaseAnimeService, private ruta: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ruta.params.subscribe(params => {
      this.busqueda = params['busqueda'];
      this.service.getJson().subscribe((res) => {
        this.allAnimes = res;
        this.animesCoincidencias = [];
        this.buscarAnimes(this.busqueda);

        this.animesRandom = res;
        fisherYatesShuffle(this.animesRandom);
      });
    });
  }

  navegar(anime: string) {
    this.router.navigate(["anime/" + anime]);
  }

  buscarAnimes(busqueda: any) {
    for (let i = 0; i < this.allAnimes.length; i++) {
      if (this.allAnimes[i].nombre.toLowerCase().includes(busqueda.toLowerCase())) {
        this.animesCoincidencias.push(this.allAnimes[i]);
      }
    }
    this.animesCoincidencias = this.animesCoincidencias.sort();
  }
}

function fisherYatesShuffle(arr: any) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}