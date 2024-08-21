import { Component, signal } from '@angular/core';

import { Player } from '../../../utilites/ts/alias';
import { ResultPlay } from '../../../utilites/ts/interfaces';

import { ScoreComponent } from '../../2_templates/score/score.component';
import { BoardComponent } from '../../2_templates/board/board.component';
import { ButtonComponent } from '../../1_molecules/button/button.component';

import { ReloadSvgComponent } from '../../0_atoms/reload/reloadsvg.component';

let firstTime = true //Con esta variable manejamos si es la primera vez que se termina una partida, sino en cuando se inicia la partida ya uno de los dos jugadores tiene un punto

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
  //Componente con el que se maneja toda una aprtida

  player : Player = 0 //Jugador de la aprtida
  result : ResultPlay = {state: 'play' , player : this.player} //El resutlado de la partida
  score  : Array<number> = [0,0] //Puntuacion del marcador

  playerOut     = signal(this.player) //Aqui se recoge la informacion del jugador que juega del board para pasarselo al score
  resultPlayOut = signal(this.result) //Aqui se recoge la informacion del final del board para pasarselo al score
  scoreSig      = signal(this.score)  //Aqui se maneja la puntuacion para pasarsela al score

  //Función con la que actualizamos la puntuacion cuando cambia la informacion de resultPlayOut del componente board
  updateScore(result : ResultPlay) {
    this.resultPlayOut.set(result) //Actualizamos su valor para que tambien lo tenga score
    if(!firstTime && result.state == 'winner'){ //En caso de que el resultado de la partida sea 'winner' miramos quien y sumamos un punto a la puntuacion para el score
      let array = [...this.scoreSig()]
      result.player ? [array[0],array[1]++] : [array[0]++,array[1]]
      this.scoreSig.set(array)
    }else{
      firstTime = false
    }
  }

  //Recargamos la web para eliminar la partida y los puntos
  reiniciarAplicacion() {
    window.location.reload();
  }
}
