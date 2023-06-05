import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DatabaseAnimeService } from '../database-anime.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  file: Array<any> = [];
  downloadURL: Observable<string> | undefined;

  public nombre: string = "";
  public estudio: string = "";
  public descripcion: string = "";
  public generos: string = "";
  public tipo: string = "";
  public episodios: any;

  public caratula: any;
  public img: any;
  public key: any

  public admin: any;
  constructor(private service: DatabaseAnimeService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.compruebaAdmin();
    this.service.getJson().subscribe((res) => {
      this.key = res.length+"";
    });
  }

  compruebaAdmin() {
    if (sessionStorage.length == 1) {
      this.service.getAdmin().subscribe((res) => {
        this.admin = res;
        var esAdmin = false;
        for (let i = 0; i < this.admin.length; i++) {
          if (this.admin[i].value == sessionStorage.getItem("usuario")) {
            esAdmin = true;
          }
        }
        if (!esAdmin) {
          history.go(-1);
        }
      });
    } else {
      history.go(-1);
    }
  }

  seleccionaArchivo(e: any, localizacion: string) {
    var id = Math.random().toString(36).substring(2);
    if (localizacion == "Caratulas") {
      this.file[0] = e.target.files[0];
    } else {
      this.file[1] = e.target.files[0];
    }

  }

  prueba() {
    
    this.episodios = this.episodios.split("\n");
    var newAnime: any;
    var capitulosJson: any = [];

    for (let i = 0; i < this.episodios.length; i++) {
      capitulosJson[i] = {
        "ep": this.episodios[i],
        "usuariosVisto": [
          ""
        ]
      }
    }

    setTimeout(() => {
      newAnime = {
        "$key": this.key,
        "caratula": this.caratula,
        "descripcion": this.descripcion,
        "estado": "Finalizado",
        "estudio": this.estudio,
        "generos": this.generos,
        "img": this.img,
        "nombre": this.nombre,
        "siguiendo": [
          ""
        ],
        "tipo": this.tipo,
        "episodios": capitulosJson
      };
    }, 2000);

    setTimeout(() => {
      this.service.editAnime(newAnime);
    }, 3000);
    

  }

  subir(localizacion: string) {
    
    if (localizacion == "Caratulas") {
      var filePath = localizacion + "/" + this.file[0].name;
      var fileRef = this.storage.ref(filePath);
      var task = this.storage.upload(filePath, this.file);
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              this.caratula = downloadURL;
            });
          })
        )
        .subscribe();
    } else {
      var filePath = localizacion + "/" + this.file[1].name;
      var fileRef = this.storage.ref(filePath);
      var task = this.storage.upload(filePath, this.file);
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              this.img = downloadURL;
            });
          })
        )
        .subscribe();
    }
  }
}
