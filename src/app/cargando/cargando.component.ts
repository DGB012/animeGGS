import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss']
})
export class CargandoComponent implements OnInit {

  noMostrar: any;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.noMostrar = true;
    }, 1500);
  }

}