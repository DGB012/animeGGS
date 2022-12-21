import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navegar() {
    this.router.navigate(["inicio"]);
  }

  verGeneros() {
    this.router.navigate(["generos"]);
  }

  arriba() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
