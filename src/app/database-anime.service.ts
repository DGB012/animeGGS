import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { anime } from './interfaces/anime';
import { map, toArray } from 'rxjs/operators';
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { user } from './interfaces/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class DatabaseAnimeService {
  private newUser = {
    "nick": "",
    "correo": "",
    "siguiendo": [{
      "serie": ""
    }
    ],
    "visualizaciones": [
      {
        "serie": "",
        "epVistos": ""
      }
    ]
  };

  constructor(
    private afAuth: AngularFireAuth, private animesDB: AngularFireDatabase, private toastr: ToastrService) { }


  login(email: string, password: string) {

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        sessionStorage.setItem('usuario', email);
        window.location.assign("inicio");

      })
      .catch(error => {
        const errContraseniaVacia = "Firebase: An internal AuthError has occurred. (auth/internal-error).";
        const errContraseniaErronea = "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).";
        const errCorreoErroneo = "Firebase: The email address is badly formatted. (auth/invalid-email).";
        const errCorreoNoEncontrado = "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).";
        if (error.message == errContraseniaVacia) {
          this.toastr.error("Introduce una contraseña", 'Error contraseña', {
            positionClass: 'toast-center-center'
          });
        }
        if (error.message == errContraseniaErronea) {
          this.toastr.error("Contraseña incorrecta", 'Error contraseña', {
            positionClass: 'toast-center-center'
          });
        }
        if (error.message == errCorreoErroneo) {
          this.toastr.error("El correo introducido no es válido", 'Error correo', {
            positionClass: 'toast-center-center'
          });
        }
        if (error.message == errCorreoNoEncontrado) {
          this.toastr.error("No existe ningún usuario con ese correo", 'Error correo', {
            positionClass: 'toast-center-center'
          });
        }
      });

  }

  emailSignup(email: string, password: string) {

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.newUser.correo = email;
        this.aniadirUsuario(this.newUser);
        sessionStorage.setItem('usuario', email);
        window.location.assign("inicio");
      })
      .catch(error => {
        const errCorreoEnUso = "Firebase: The email address is already in use by another account. (auth/email-already-in-use).";
        if (error.message == errCorreoEnUso) {
          this.toastr.error("El correo introducido ya está en uso por otra cuenta", 'Error correo', {
            positionClass: 'toast-center-center'
          });
        }
      });

  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }
  TwitterAuth() {
    return this.AuthLogin(new TwitterAuthProvider());
  }
  AuthLogin(provider: any) {
    let users: Array<any> = [];
    this.getUsers().subscribe((res) => {
      users = res;
    })
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        let email = result.user?.email;
        let crearUsuario = true;
          for (let i = 0; i < users.length; i++) {
            if (email == users[i].correo) {
              crearUsuario = false;
              console.log(crearUsuario);
            }
          }
        if(crearUsuario){
          this.newUser.correo = email!;
          this.aniadirUsuario(this.newUser);
        }
        sessionStorage.setItem('usuario', email!);
        window.location.assign("inicio");
      })
      .catch((error) => {
      });
  }

  getJson() {
    var ns: AngularFireList<anime> = this.animesDB.list("/animes", (ref) =>
      ref.orderByKey()
    )
    return ns.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  getAdmin() {
    var ns: AngularFireList<anime> = this.animesDB.list("/admin", (ref) =>
      ref.orderByKey()
    )
    return ns.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  getUsers() {
    var ns: AngularFireList<user> = this.animesDB.list("/users", (ref) =>
      ref.orderByKey()
    )
    return ns.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }


  editAnime(animeMod: any) {
    const $key = animeMod.$key;
    delete animeMod.$key;
    this.animesDB.list('/animes').update($key, animeMod);
  }

  subirAnime(anime: any) {
    const $key = anime.$key;
    this.animesDB.list('/animes').update($key, anime);
  }

  aniadirUsuario(user: any) {
    this.animesDB.list('/users').push(user);
  }

  editUsuario(user: any) {
    const $key = user.$key;
    delete user.$key;
    this.animesDB.list('/users').update($key, user);
  }
}
