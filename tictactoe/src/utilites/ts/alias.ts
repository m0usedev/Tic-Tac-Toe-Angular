export type Player = 2 | 0 | 1 //icon of box component
export type States = 'empty' | 'selected' | 'win' | 'winner' //states of box component

export type Result = 'winner' | 'draw' //resultados para el anuncio de Reuslt componente

export type StatesPlay = 'play' | Result //estados para el anuncio de la partida en board componente
export type Case = {
  player : Player,
  state : States,
}
