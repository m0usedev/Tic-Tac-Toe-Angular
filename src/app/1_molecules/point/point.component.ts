import { Component, input } from '@angular/core';

@Component({
  selector: 'app-point',
  standalone: true,
  imports: [],
  templateUrl: './point.component.html',
  styleUrl: './point.component.css'
})
export class PointComponent {
  //Componente con el que hacemos la puntiacion de un jugador
  points   = input.required() //puntos del jugador
  play      = input(false) //si esta jugado
}
