import { StatesPlay, Player, States } from "./alias";

export interface TypeEndGame { //Aqui se determina como ha sido el final de la partida, donde ha estado la victoria y el numero de columna
  type  : 'none' | 'rows' | 'columns' | 'diagonals' | 'draw',
  place : number
}

export interface ResultPlay { //Aquí se muestra como ha acabdo la partida
  state: StatesPlay ,
  player : Player,
  typeEndGame? : TypeEndGame
}

export interface Score { //Como debe ser la puntuacion del score
  score : [number, number]
}

export interface Case { //Es el estado de una de las casillas del board, 2 no hay ficha y el resto el jugador que puso ficha y luego su estado
  player : Player,
  state : States,
}
