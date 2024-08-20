import { Component,input } from '@angular/core';
import {NgIf} from '@angular/common';

import { PointComponent } from '../../1_molecules/point/point.component';
import { CircleSvgComponent } from '../../0_atoms/circle/circlesvg.component';
import { XSvgComponent } from '../../0_atoms/x/xsvg.component';
import { ResultComponent } from '../../1_molecules/result/result.component';
import { BoxComponent } from '../../1_molecules/box/box.component';

import { Player } from '../../../utilites/ts/alias';
import { ResultPlay } from '../../../utilites/ts/interfaces';


@Component({
  selector: 'app-score',
  standalone: true,
  imports: [
    NgIf,
    PointComponent,
    CircleSvgComponent,
    XSvgComponent,
    ResultComponent,
    BoxComponent
  ],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  score = input(Array.from({ length: 2 }, () => (0)))
  play = input<Player>()
  endGame = input<ResultPlay>({state: 'play'   , player : 2})
}
