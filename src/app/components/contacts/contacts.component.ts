import { Component, OnInit } from '@angular/core';
import { fundido } from '../animation';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations: [fundido]
})
export class ContactsComponent implements OnInit {
  title = 'Contacts';
  emailContacto: string;

  constructor() { }

  ngOnInit() {
  }

  guardarEmail() {
    localStorage.setItem('emailContacto', this.emailContacto);
  }
}
