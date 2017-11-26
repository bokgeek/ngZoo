import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

import { User } from '../models/user';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  register(userToRegister: User) {
    const params = JSON.stringify(userToRegister);
    const headers = new Headers({ 'Content-type': 'application/json' });

    return this._http.post(this.url + 'register', params, { headers: headers })
      .map(res => res.json());
  }

  signUp(userToLogin, getToken = null) {
    if (getToken !== null) {
      userToLogin.getToken = getToken;
    }

    const params = JSON.stringify(userToLogin);
    const headers = new Headers({ 'Content-type': 'application/json' });

    return this._http.post(this.url + 'login', params, { headers: headers })
        .map(res => res.json());
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity !== 'undefined') {
      this.identity = identity;
    }else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
      this.token = token;
    }else {
      this.token = null;
    }

    return this.token;
  }

  updateUser(userToUpdate) {
    const params = JSON.stringify(userToUpdate);
    const headers = new Headers({
      'Content-Type': 'application-json',
      'Authorization': this.getToken()
    });

    return this._http.put(this.url + 'update-user/' + userToUpdate._id, params, { headers: headers})
      .map(res => res.json());
  }

  getKeepers() {
    return this._http.get(this.url + 'keepers')
      .map(res => res.json());
  }
}
