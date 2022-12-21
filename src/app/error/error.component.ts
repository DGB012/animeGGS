import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public imagen = "https://firebasestorage.googleapis.com/v0/b/animedgb.appspot.com/o/Fondos%2Ferror404.png?alt=media&token=bbbed646-9b6b-4a23-988f-18d3b055a49e";
  constructor() { }

  ngOnInit(): void {
  }

}