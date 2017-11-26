import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class AnimalService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  addAnimal(token, animal) {
    const params = JSON.stringify(animal);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url + 'animal', params, {headers: headers})
      .map(res => res.json());
  }

  getAnimals() {
    // No hace falta si no va con token
    // const headers = new Headers({ 'Content-Type': 'application/json'});
    // const options = new RequestOptions({ headers: headers});

    return this._http.get(this.url + 'animals')
      .map(res => res.json());
  }

  getAnimal(id) {

    return this._http.get(this.url + 'animals/' + id)
      .map(res => res.json());
  }

  editAnimal(token, id, animal) {
    const params = JSON.stringify(animal);
    const headers = new Headers ({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.put(this.url + 'animals/' + id, params, { headers: headers})
        .map( res => res.json());
  }

  deleteAnimal(token, id) {
    const headers = new Headers ({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    const options = new RequestOptions({headers: headers});

    return this._http.delete(this.url + 'animals/' + id, options)
        .map(res => res.json());
  }

}
