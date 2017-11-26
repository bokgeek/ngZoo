import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  title: string;
  user: User;
  identity;
  token;
  status: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    this.title = 'Login';
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    console.log(this._userService.getIdentity());
    console.log(this._userService.getToken());
  }

  onSubmit() {
    this._userService.signUp(this.user).subscribe(
      response => {
        this.identity = response.user;

        if (!this.identity || !this.identity._id) {
          alert('El usuario NO se ha logueado correctamente');
        } else {
          this.identity.password = ''; // Para que no se vea en consola.

          // Save to localStorage
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this._userService.signUp(this.user, 'true').subscribe(
            res => {
              this.token = res.token;

              if (this.token.length <= 0) {
                alert('El Token no es correcto');
              } else {
                // Save to localStorage
                localStorage.setItem('token', this.token);
                this.status = 'success';

                this._router.navigate(['/']);
              }
            },
            err => {
              console.log(<any>err);
            }
          );
        }
      },
      error => {
        const errorMessage  = <any>error;
        if (errorMessage != null) {
          const body = JSON.parse(error._body);
          this.status = 'error';
        }

      }
    );
  }

}
