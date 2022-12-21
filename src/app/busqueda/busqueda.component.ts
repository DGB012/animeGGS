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
  public animes: any;
  public busqueda: any;
  public animesRandom: any;
  constructor(private service: DatabaseAnimeService, private ruta: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ruta.params.subscribe(params => {
      this.busqueda = params['busqueda'];
      this.service.getJson().subscribe((res) => {
        this.allAnimes = res;
        this.animes = [];
        for (let i = 0; i < this.allAnimes.length; i++) {
          this.animes.push(this.allAnimes[i]);
        }

        this.animesRandom = [];
        for (let i = 0; i < this.animes.length; i++) {
          this.animesRandom.push(this.animes[i]);
        }
        fisherYatesShuffle(this.animesRandom);

        this.animes = this.animes.sort();
      });
    });
  }

  navegar(anime: string) {
    this.router.navigate(["anime/" + anime]);
  }
}

function fisherYatesShuffle(arr: any) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}