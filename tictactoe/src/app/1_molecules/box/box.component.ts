import { Component, input, computed } from '@angular/core';
import { NgIf } from '@angular/common';

import { CircleSvgComponent } from '../../0_atoms/circle/circlesvg.component';
import { XSvgComponent } from '../../0_atoms/x/xsvg.component';

import { Player, States } from '../../../utilites/ts/alias';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [
    NgIf,
    CircleSvgComponent,
    XSvgComponent
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {
  //componente con el que hacemos las casillas de la partida
  icon = input.required<Player>() //Playero de la casilla
  state = input.required<States>() //Estado de la box
}
