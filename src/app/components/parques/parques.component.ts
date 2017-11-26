
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { SimpleChanges, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { fundido } from '../animation';

@Component({
  selector: 'app-parques',
  templateUrl: './parques.component.html',
  styleUrls: ['./parques.component.css'],
  animations: [fundido]
})
export class ParquesComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  @Input() nombre: string;
  abierto: boolean;
  @Output() pasameLosDatos = new EventEmitter();

  constructor() {
    this.nombre = 'Nombre inicial del parque';
    this.abierto = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Hay cambios');
  }

  ngOnInit() {
    console.log('Componente creado');
  }

  ngDoCheck() {
    console.log('DoCheck');
  }

  ngOnDestroy() {
    console.log('Componente destruido');
  }
  emitirEvento() {
    this.pasameLosDatos.emit(
      {
        'nombre' : this.nombre,
        'abierto' : this.abierto
      }
    );
  }
}
