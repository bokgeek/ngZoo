import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../../services/global';

import { Animal } from '../../../../models/animal';
import { AnimalService } from '../../../../services/animal.service';
import { UserService } from '../../../../services/user.service';
import { UploadService } from '../../../../services/upload.service';

import { fadeLateral } from '../../animation';

@Component({
  selector: 'app-admin-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:  [ AnimalService, UserService ],
  animations: [ fadeLateral ]
})
export class ListComponent implements OnInit {

  public title: string;
  numbers = new Array(5);
  public animals: Animal[];
  public token;
  public busqueda;

  constructor(
    private _route: ActivatedRoute, private _router: Router,
    private _animalService: AnimalService, private _userService: UserService
  ) {
    this.title = 'Listado';
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getAnimals();
  }

  deleteAnimal(id) {
    this._animalService.deleteAnimal(this.token, id).subscribe(
      response => {
        if (!response.animal) {
          alert('Error en el servidor');
        }else {
          this.getAnimals();
        }

      },
      error => {
        alert('Error en el servidor');
      }
    );
  }

  getAnimals() {
    this._animalService.getAnimals().subscribe(
      response => {
        if (!response.animals) {

        }else {
          this.animals = response.animals;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
