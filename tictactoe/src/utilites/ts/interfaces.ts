import { StatesPlay, Player } from "./alias";

export interface TypeEndGame {
  type  : 'none' | 'rows' | 'columns' | 'diagonals' | 'draw',
  place : number
}

export interface ResultPlay {
  state: StatesPlay ,
  player : Player,
  typeEndGame? : TypeEndGame
} //resultados para el anuncio de la partida en board componente

export interface Score {
  score : [number, number]
}
