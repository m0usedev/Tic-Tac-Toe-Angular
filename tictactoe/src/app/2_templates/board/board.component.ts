import { Component, signal, OnInit, computed, Signal, effect } from '@angular/core';
import { Output, EventEmitter} from '@angular/core';
import { NgFor } from '@angular/common';

import { BoxComponent } from '../../1_molecules/box/box.component';

import { Player, Case } from '../../../utilites/ts/alias';
import { ResultPlay } from '../../../utilites/ts/interfaces';

import { resultPlayFunc, printEndGame } from '../../../utilites/ts/boardResultPlay';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgFor,
    BoxComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {

  @Output() playerOut = new EventEmitter<Player>() //jugador actual de la partida
  @Output() resultPlayOut = new EventEmitter<ResultPlay>() //resultado de la partida

  player : Player = 0 //jugador actual de la partida
  case : Case = { player: 2, state: 'empty' } //objeto con el que empiezan todas las casillas
  board = signal(Array.from({ length: 9 }, () => (this.case))); //tablero de la partida

  ngOnInit(): void {
		this.playerOut.emit(this.player)
	}

  changeBoard(index : number){
    if(this.board()[index].state == 'empty') {
      let array = [...this.board()]
      array[index] = { ...array[index], 'player': this.player, 'state': 'selected' };
      this.board.set( array )

      const rp : ResultPlay = resultPlayFunc ([...this.board()], this.player)
      this.resultPlayOut.emit( rp )

      if(rp.state != 'play') {
        printEndGame(array, rp, this.board)
        setTimeout(
          () : void => {this.endGame(this.player)}
        , rp.state == 'draw' ? 3000 : 2000);
      }

      this.player = this.player ? 0 : 1
      this.playerOut.emit(this.player)
    }
  }

  trackByBoxes(index: number, box: object) {
    return index;
  }

  endGame ( player : Player ) {
    this.player = player ? 1 : 0
    this.playerOut.emit(player ? 1 : 0)
    this.board.set(Array.from({ length: 9 }, () => ({ player: 2, state: 'empty' })))
    this.resultPlayOut.emit({
      state  : 'play',
      player : player ? 1 : 0,
      typeEndGame : {
        type  : 'none',
        place : 0
      }
    })
  }
}
