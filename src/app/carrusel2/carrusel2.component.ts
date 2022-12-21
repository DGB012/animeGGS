import { Component, Input, OnInit } from '@angular/core';
import { DatabaseAnimeService } from '../database-anime.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrusel2',
  templateUrl: './carrusel2.component.html',
  styleUrls: ['./carrusel2.component.scss']
})
export class Carrusel2Component implements OnInit {

  public animes: any;
  constructor(private service: DatabaseAnimeService, private router: Router) { }

  ngOnInit(): void {
    this.service.getJson().subscribe((res) => {
      this.animes = res;
      fisherYatesShuffle(this.animes);
      this.animes = this.animes.splice(0, 5);
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