import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { anime } from './interfaces/anime';
import { map } from 'rxjs/operators';
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { user } from './interfaces/user';

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
    private afAuth: AngularFireAuth, private animesDB: AngularFireDatabase) { }


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
          window.alert("Introduce una contraseña");
        }
        if (error.message == errContraseniaErronea) {
          window.alert("Contraseña incorrecta");
        }
        if (error.message == errCorreoErroneo) {
          window.alert("El correo introducido no es válido");
        }
        if (error.message == errCorreoNoEncontrado) {
          window.alert("No existe ningún usuario con ese correo");
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
          window.alert("El correo introducido ya está en uso por otra cuenta");
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
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        let email = result.user?.email;
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
