import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guardar-email',
  templateUrl: './guardar-email.component.html',
  styleUrls: ['./guardar-email.component.css']
})
export class GuardarEmailComponent implements OnInit {

  title = 'Guardar email';
  emailContacto: string;

  constructor() { }

  ngOnInit() {
  }

  guardarEmail() {
    localStorage.setItem('emailContacto', this.emailContacto);
  }
}
