import { Component } from '@angular/core';
import { DatabaseAnimeService } from '../database-anime.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public user: any;
  public users: any;
  public pass: any;

  constructor(public servicio: DatabaseAnimeService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (sessionStorage.length == 1) {
      history.go(-1);
    }
  }

  iniciarSesion() {
    if (this.user == undefined) {
      this.toastr.error("El correo introducido no es válido", 'Error correo', {
        positionClass: 'toast-center-center'
      });
    } else {
      this.servicio.login(this.user, this.pass);
    }
  }

  registrarse() {
    this.router.navigate(["signup"]);
  }

}
