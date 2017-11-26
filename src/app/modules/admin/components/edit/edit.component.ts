import { FileChangeEvent } from '@angular/compiler-cli/src/perform_watch';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../../services/global';

import { Animal } from '../../../../models/animal';
import { AnimalService } from '../../../../services/animal.service';
import { UserService } from '../../../../services/user.service';
import { UploadService } from '../../../../services/upload.service';

import { fadeLateral } from '../../animation';

@Component({
  selector: 'app-admin-edit',
  templateUrl: '../add/add.component.html', // Ojo, uso la misma plantilla de add
  styleUrls: ['./edit.component.css'],
  providers: [UserService, UploadService, AnimalService],
  animations: [ fadeLateral ]
})
export class EditComponent implements OnInit {

  public title = 'Añadir';
  public animal = new Animal('', '', '', 2017, '', '');
  public identity;
  public token;
  public url: string;
  public status;
  public filesToUpload: Array<File>;
  public isEdit;

  constructor(
    private _route: ActivatedRoute, private _router: Router,
    private _userService: UserService, private _animalService: AnimalService,
    private _uploadService: UploadService
  ) {
    this.isEdit = true;
    this.title = 'Editar';
    // this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAnimal();
    console.log(this.animal);
  }

  getAnimal() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];

      this._animalService.getAnimal(id).subscribe(
        response => {
          console.log(response);
          if (!response.animal) {
            this._router.navigate(['/']);
          } else {
            this.animal = response.animal;
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/']);
        }
      );
    });
  }

  onSubmit() {
    const id = this.animal._id;
    this._animalService.editAnimal(this.token, id, this.animal).subscribe(
      response => {
        if (!response.animal) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.animal = response.animal;

          // Subir imagen
          if (!this.filesToUpload) {
            this._router.navigate(['/animal/', this.animal._id]);
          } else {
            this._uploadService.makeFileRequest(
              this.url + 'upload-image-animal/' + this.animal._id, [], this.filesToUpload, this.token, 'image'
            )
              .then((result: any) => {
                this.animal.image = result.image;
                this._router.navigate(['/animal/', this.animal._id]);
              });
          }

        }
      },
      error => {
        const errorMessage = <any>error;

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
