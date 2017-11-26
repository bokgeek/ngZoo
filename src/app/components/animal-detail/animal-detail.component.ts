import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';

import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css'],
  providers:  [ AnimalService ]
})
export class AnimalDetailComponent implements OnInit {

  public animal: Animal;
  public url: string;

  constructor(
    private _route: ActivatedRoute, private _router: Router,
    private _animalService: AnimalService
  ) {
    this.animal = new Animal('', '', '', 2017, '', '');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAnimal();
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

}
