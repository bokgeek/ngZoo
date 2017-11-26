import { Component } from '@angular/core';
import { DoCheck, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements DoCheck, OnInit {
  public title: string;
  public identity;
  public url: string;

  emailContacto: string;

  constructor(private _userService: UserService, private _router: Router) {
    this.title  = 'cursoA5 - NGZoo';
    this.url = GLOBAL.url;
  }

  ngDoCheck() {
    this.identity  = this._userService.getIdentity();
  }

  ngOnInit() {
    this.identity  = this._userService.getIdentity();
  }

  borrarEmail() {
    localStorage.removeItem('emailContacto');
    this.emailContacto = null;
  }

  logout() {
    localStorage.clear();
    this.identity  = null;

    this._router.navigate(['/']);
  }
}
