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
  selector: 'app-edit-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, UploadService, AnimalService],
  animations: [ fadeLateral ]
})
export class AddComponent implements OnInit {

  public title = 'Añadir';
  public animal: Animal;
  public identity;
  public token;
  public url: string;
  public status;
  public filesToUpload: Array<File>;

  constructor(
    private _route: ActivatedRoute, private _router: Router,
    private _userService: UserService, private _animalService: AnimalService,
    private _uploadService: UploadService
  ) {
    this.title = 'Añadir';
    this.animal = new Animal('', '', '', 2017, '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {

  }

  onSubmit() {

    this._animalService.addAnimal(this.token, this.animal).subscribe(
      response => {
        if (!response.animal) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.animal = response.animal;

          // Subir imagen
          if (!this.filesToUpload) {
            this._router.navigate(['/admin-panel/listado']);
          } else {
            this._uploadService.makeFileRequest(
              this.url + 'upload-image-animal/' + this.animal._id, [], this.filesToUpload, this.token, 'image'
            )
              .then((result: any) => {
                this.animal.image = result.image;
                this._router.navigate(['/admin-panel/listado']);
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
