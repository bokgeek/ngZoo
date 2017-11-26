import { Component, OnInit } from '@angular/core';

import { fundido } from '../animation';

import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html',
  styleUrls: ['./keepers.component.css'],
  providers: [ UserService ],
  animations: [fundido]
})
export class KeepersComponent implements OnInit {
  public title: string;
  public url;
  public keepers: User[];

  constructor(private _userService: UserService) {
    this.title = 'Cuidadores';
    this.url = GLOBAL.url;
   }

  ngOnInit() {
    this.getKeepers();
  }

  getKeepers() {
    this._userService.getKeepers().subscribe(
      response => {
        if (!response.users) {

        }else {
          this.keepers = response.users;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
