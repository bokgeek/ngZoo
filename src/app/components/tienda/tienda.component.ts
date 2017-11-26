import { animation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  animations: [
    trigger('marcar', [
      state('inactive', style({
        border: '5px solid #ccc'
      })),
      state('active', style ({
        border: '5px solid yellow',
        background: 'red',
        borderRadius: '50px'
      })),
      transition('inactive => active', animate('300ms linear')),
      transition('active => inactive', animate('300ms linear'))
    ])
  ]
})
export class TiendaComponent implements OnInit {
  public nombre: string;
  public nombreDelParque: string;
  public miParque;
  public status;

  constructor() {
    this.nombre = 'Nombre de la tienda';
    this.status = 'inactive';
   }

  ngOnInit() {
    $('#textojq').hide();
    $('#botonjq').click(function(){
      $('#textojq').slideToggle();
    });
  }

  mostrarNombre() {
    // console.log(this.nombreDelParque);
  }

  verDatosParque(event) {
    console.log(event);
    this.miParque = event;
  }

  textoRichEditor(content) {
    console.log(content);
  }

  cambiarEstado(status){

    if (status === 'inactive') {
      this.status = 'active';
    }else {
      this.status = 'inactive';
    }
  }

}
