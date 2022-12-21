import { Component } from '@angular/core';
import { DatabaseAnimeService } from '../database-anime.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public user: any;
  public pass: any;

  constructor(public servicio: DatabaseAnimeService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.length == 1) {
      history.go(-1);
    }
  }

  iniciarSesion() {
    if (this.user == undefined) {
      window.alert("El correo introducido no es válido")
    } else {
      this.servicio.login(this.user, this.pass);
    }
  }

  registrarse() {
    this.router.navigate(["signup"]);
  }

}
