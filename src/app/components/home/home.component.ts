import { Component, OnInit } from '@angular/core';
import { fundido } from '../animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fundido]
})
export class HomeComponent implements OnInit {
  title = 'Welcome to NGZoo';

  constructor() { }

  ngOnInit() {

  }

}
