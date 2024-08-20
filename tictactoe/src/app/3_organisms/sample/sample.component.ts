import { Component, signal, computed } from '@angular/core';

import { ButtonComponent } from '../../1_molecules/button/button.component';
import { BoxComponent } from '../../1_molecules/box/box.component';
import { PointComponent } from '../../1_molecules/point/point.component';
import { ResultComponent } from '../../1_molecules/result/result.component';

import { BoardComponent } from '../../2_templates/board/board.component';

import { ReloadSvgComponent } from '../../0_atoms/reload/reloadsvg.component';
import { CircleSvgComponent } from '../../0_atoms/circle/circlesvg.component';
import { XSvgComponent } from '../../0_atoms/x/xsvg.component';
import { Player } from '../../../utilites/ts/alias';
import { ResultPlay, Score } from '../../../utilites/ts/interfaces';
import { ScoreComponent } from '../../2_templates/score/score.component';

let firstTime = true

@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [
    ButtonComponent,
    BoxComponent,
    ReloadSvgComponent,
    PointComponent,
    CircleSvgComponent,
    XSvgComponent,
    ResultComponent,
    BoardComponent,
    ScoreComponent
  ],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.css'
})
export class SampleComponent {
  title = 'tictactoe';

  player : Player = 0
  result : ResultPlay = {state: 'play' , player : this.player}
  score  : Array<number> = [0,0]

  playerOut     = signal(this.player)
  resultPlayOut = signal(this.result)
  scoreSig      = signal(this.score)

  updateScore(result : ResultPlay) {
    this.resultPlayOut.set(result)
    if(!firstTime && result.state == 'winner'){
      let array = [...this.scoreSig()]
      result.player ? [array[0],array[1]++] : [array[0]++,array[1]]
      this.scoreSig.set(array)
    }else{
      firstTime = false
    }

  }
  hola() {
    console.log("hola")
  }

  reiniciarAplicacion() {
    window.location.reload();
  }
}
