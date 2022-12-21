import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseAnimeService } from '../database-anime.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public user: any;
  public pass: any;

  constructor(private router: Router, public servicio: DatabaseAnimeService) { }

  ngOnInit(): void {
    if (sessionStorage.length == 1) {
      history.go(-2);
    }
  }

  iniciarSesion() {
    this.router.navigate(["login"])
  }

  registrarse() {
    if (this.user == undefined) {
      window.alert("Introduce un correo válido")
    } else if (this.pass == undefined || this.pass.length < 6) {
      window.alert("La contraseña debe tener mínimo 6 caracteres")
    } else {
      this.servicio.emailSignup(this.user, this.pass);
    }
  }
}
