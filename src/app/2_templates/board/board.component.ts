import { Component, signal, OnInit, WritableSignal } from '@angular/core';
import { Output, EventEmitter} from '@angular/core';
import { NgFor } from '@angular/common';

import { BoxComponent } from '../../1_molecules/box/box.component';

import { Player } from '../../../utilites/ts/alias';
import { ResultPlay, Case } from '../../../utilites/ts/interfaces';

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

  @Output() playerOut     = new EventEmitter<Player>()     //jugador actual de la partida
  @Output() resultPlayOut = new EventEmitter<ResultPlay>() //resultado de la partida

  player : Player                 = 0 //jugador actual de la partida
  case   : Case                   = { player: 2, state: 'empty' } //objeto con el que empiezan todas las casillas
  board  : WritableSignal<Case[]> = signal(Array.from({ length: 9 }, () => (this.case))); //tablero de la partida

  // un ngOnInit para cuando se hayan dado los valores a las propiedades del componente emitir al inicio del componente al padre que jugador empieza
  ngOnInit(): void {
		this.playerOut.emit(this.player)
	}

  //Funcion que analiza los cambios en el Board
  changeBoard(index : number){
    //En caso de que el estado de la casilla que llamo a la funcion sea 'empty', por lo que no tiene ficha, se hacen las operaciones
    //Esto se debe a que poese a que las casillas con ficha no tiene animacion de interaccion si se interactua con ellas
    if(this.board()[index].state == 'empty') {
      let array = [...this.board()] //hacemos una copia independiente del tablero
      array[index] = { ...array[index], 'player': this.player, 'state': 'selected' }; //otra copia de todo el tablero, pero modificando esta casilla a 'slected' y poniendo a que jugador pertenece
      this.board.set( array ) //aplicamos el nuevo board para que se vea la ficha

      const rp : ResultPlay = resultPlayFunc ([...this.board()], this.player) //Comporbamos si esa jugada tiene ganador
      this.resultPlayOut.emit( rp ) //Enviamos el resultado fuera del componente

      if(rp.state != 'play') { //Encaso de que sea diferente de 'play' es que es winner o draw
        printEndGame(array, rp, this.board) //Primero pintamos las casillas ganadoras
        setTimeout( //Despues ya preparamos para cuando terminen de pintarse reiniciar la aprtida
          () : void => {this.endGame(this.player)}
          ,rp.state == 'draw' ? 3000 : 2000 //el draw tarda mas en pintarse que las otras victorias
        );
      }

      this.player = this.player ? 0 : 1
      this.playerOut.emit(this.player)
    }
  }

  //Funcion con la que iniciamos el final de una partida
  endGame ( player : Player ) {
    this.player = player ? 1 : 0 //Cambiamos al siguiente jugador respecto al ganador de esta o el ultimo en jugar
    this.playerOut.emit(player ? 1 : 0) //Transmitimos ese siguiente jugador fuera del componente al padre
    this.board.set(Array.from({ length: 9 }, () => ({ player: 2, state: 'empty' }))) //Reiniciamos el board
    //!! Tuve que pintar directamente `{ player: 2, state: 'empty' }` en vez de usar el
    //!! objeto `case` como en el inicio porque por alguyna razon la funcion `blockNoSelect`
    //!! en `boardResultPlay.ts`editaba directamente el objeto `case`y entonces todas las casillas
    //!! se quedaban `selected`para la siguiente partida
    this.resultPlayOut.emit({ //Transmitimos fuera del componente, al padre, el estado de la siguiente partida, osea que se esta jugando.
      state  : 'play',
      player : player ? 1 : 0,
      typeEndGame : {
        type  : 'none',
        place : 0
      }
    })
  }

  //Funcion para que angular tenga un seguimiento de las box del board en el for
  trackByBoxes(index: number, box: object) {
    return index;
  }
}
