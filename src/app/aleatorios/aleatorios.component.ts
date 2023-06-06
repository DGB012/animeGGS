import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';

@Component({
  selector: 'app-aleatorios',
  templateUrl: './aleatorios.component.html',
  styleUrls: ['./aleatorios.component.scss']
})
export class AleatoriosComponent implements OnInit {
  public animesRandom: any;
  constructor(private service: DatabaseAnimeService, private ruta: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.service.getJson().subscribe((res) => {
      this.animesRandom = res;
      fisherYatesShuffle(this.animesRandom);
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