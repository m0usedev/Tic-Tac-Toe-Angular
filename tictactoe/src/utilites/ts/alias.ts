export type Player = 2 | 0 | 1 //Los players posibles, siendo 2 ninguno
export type States = 'empty' | 'selected' | 'win' | 'winner' //Son los distintos estados del componente box

export type Result = 'winner' | 'draw' //Los resultados de una partida

export type StatesPlay = 'play' | Result //Es el estado en el que esta la partida
