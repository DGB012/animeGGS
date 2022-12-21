import { Component, OnInit } from '@angular/core';
import { DatabaseAnimeService } from '../database-anime.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public animes: any;
  public animesRandom: any;
  constructor(private service: DatabaseAnimeService, private router: Router) { }

  ngOnInit(): void {
    this.service.getJson().subscribe((res) => {
      this.animes = res;
      this.animesRandom = [];
      for (let i = 0; i < this.animes.length; i++) {
        this.animesRandom.push(this.animes[i]);
      }
      fisherYatesShuffle(this.animesRandom);
      this.animes = this.animes.sort();
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