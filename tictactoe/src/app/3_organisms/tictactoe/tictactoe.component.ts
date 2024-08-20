import { Component, signal, ViewChild, QueryList } from '@angular/core';

import { Player } from '../../../utilites/ts/alias';
import { ResultPlay } from '../../../utilites/ts/interfaces';

import { ScoreComponent } from '../../2_templates/score/score.component';
import { BoardComponent } from '../../2_templates/board/board.component';
import { ButtonComponent } from '../../1_molecules/button/button.component';

import { ReloadSvgComponent } from '../../0_atoms/reload/reloadsvg.component';

let firstTime = true

@Component({
  selector: 'app-tictactoe',
  standalone: true,
  imports: [
    ScoreComponent,
    BoardComponent,
    ButtonComponent,
    ReloadSvgComponent
  ],
  templateUrl: './tictactoe.component.html',
  styleUrl: './tictactoe.component.css'
})
export class TictactoeComponent {

  player : Player = 0
  result : ResultPlay = {state: 'play' , player : this.player}
  score  : Array<number> = [0,0]

  playerOut     = signal(this.player)
  resultPlayOut = signal(this.result)
  scoreSig      = signal(this.score)

  @ViewChild(ScoreComponent) resetScore!: QueryList<BoardComponent>;

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

  reiniciarAplicacion() {
    window.location.reload();
  }

}
