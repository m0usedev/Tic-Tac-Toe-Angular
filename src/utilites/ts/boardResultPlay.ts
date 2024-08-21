import { Player } from "./alias";
import { Case } from "./interfaces";
import { ResultPlay } from "./interfaces";
import { WritableSignal } from "@angular/core";

let place = 0 //Sirve para iondicar en el final de la partida, si no es draw, en que fila columna o diagonal fue la victoria

export function resultPlayFunc (board : Array<Case>, player : Player) : ResultPlay {
  const countNumberTwo = board.filter((element: Case) => element.player != 2).length; //con esto solo comprobaremos la partida cuadno llevemos 5 movimientos

  if(countNumberTwo >= 5){
    if(rows(board, player))      return {state: 'winner' , player : player, typeEndGame : {type : 'rows',       place : place}}
    if(columns(board, player))   return {state: 'winner' , player : player, typeEndGame : {type : 'columns',    place : place}}
    if(diagonals(board, player)) return {state: 'winner' , player : player, typeEndGame : {type : 'diagonals',  place : place}}
    if(draw(board))              return {state: 'draw'   , player : 2,      typeEndGame : {type : 'draw',       place : place}}
  }

  return {state: 'play'   , player : 2} //En caso de que no haya victoria pues se devuelve que el estado de la partida es que se sigue jugando y ningun jugadro, 2.
}

//Determinar si hay una victoria en las filas
function rows (board : Array<Case>, player : Player) : boolean {
  let row//contador para ver si hay 3 casillas del mismo jugador en una fila
  let numRows = Math.sqrt(board.length) //numero de filas a mirar
  let endFor = true

  for (let i = 0; i < numRows; i++) { //recorremos las filas
    row = 0
    for (let j = (0+i)*numRows; j < numRows*(1+i) && endFor; j++) { //recorremos cada posicion de cada fila
      if(board[j].player == player) row++ //si el jugador que hay en la casilla es el mismo que juega es que hay punto
      else endFor = false
    }
    if(row == numRows) { //solo si el numero de casillas correctas es igual al numero de casillas a comprobar hay victoria
      place = i //determinamos la fila en la que fue la victoria para colorear las casillas
      return true
    }
  }

  return false
}

//Comprobar si hay victoria en las columnas
function columns (board : Array<Case>, player : Player) : boolean {
  let columns//contador para ver si hay 3 casillas del mismo jugador en una columna
  let numColumns = Math.sqrt(board.length)
  let endFor = true //Para temrinar de hacer comprobaciones si ya una casilla no cuadra con el jugador

  for (let i = 0; i < numColumns; i++) { //recorremos las columnas
    columns = 0
    for (let j = 0; j < numColumns && endFor; j++) { //recorremos cada casilla de una columna
      if(board[j == 0 ? 0+i : (j*numColumns)+i].player == player) columns++ //si el jugador que hay en la casilla es el mismo que juega es que hay punto
      else endFor = false
    }
    if(columns == numColumns) { //solo si el numero de casillas correctas es igual al numero de casillas a comprobar hay victoria
      place = i //determinamos la columna en la que fue la victoria para colorear las casillas
      return true
    }
  }
  return false
}

//Comprobamos si hay victoria en las diagonales
function diagonals (board : Array<Case>, player : Player) : boolean {
  let sqrtBoard = Math.sqrt(board.length)
  let endFor = true //Para temrinar de hacer comprobaciones si ya una casilla no cuadra con el jugador

  //izquierda derecha
  let diagonal = 0
  for (let i = 0; i < board.length && endFor; i+=sqrtBoard-1+2) {//recorremos cada casilla de la diagonal
    if(board[i].player == player) diagonal++
    else endFor = false
  }
  if(diagonal == sqrtBoard) { //solo si el numero de casillas correctas es igual al numero de casillas a comprobar hay victoria
    place = 0//determinamos la diagonal en la que fue la victoria para colorear las casillas
    return true
  }

  //derecha izquierda
  diagonal = 0
  endFor = true
  for (let i = sqrtBoard-1; i < ((sqrtBoard-1)*sqrtBoard)+1 && endFor; i+=sqrtBoard-1) { //recorremos cada casilla de la diagonal
    if(board[i].player == player) diagonal++
    else endFor = false
  }
  if(diagonal == sqrtBoard) { //solo si el numero de casillas correctas es igual al numero de casillas a comprobar hay victoria
    place = 1//determinamos la diagonal en la que fue la victoria para colorear las casillas
    return true
  }

  return false
}

//Comrpobamos si hay empate
function draw (board : Array<Case>) : boolean {
  //Si todas las casillas son diferentes de 2 es que no se peude seguir jugando y es empate
  const countNumberTwo = board.filter((element: Case) => element.player != 2).length;
  if(countNumberTwo == board.length) return true
  return false
}

//Funcion para pintar las casillas ganadoras cuando se termia una partida
export function printEndGame (array: Array<Case>, rp : ResultPlay, board :WritableSignal<Case[]>) {
  blockNoSelect(array, board)
  if(rp.state == 'winner') {
    if(rp.typeEndGame!.type == 'rows')      printWinnerRows     (array, rp, board)
    if(rp.typeEndGame!.type == 'columns')   printWinnerColums   (array, rp, board)
    if(rp.typeEndGame!.type == 'diagonals') printWinnerDiagonals(array, rp, board)
  } else if(rp.state == 'draw') {
    printDraw(array, rp, board)
  }
}

//Aqui bloqueamos la interaccion con todas aquellas casillas que aun no estan marcadas
function blockNoSelect(array: Array<Case>, board :WritableSignal<Case[]>){
  //ponemos en 'selected' todas las casillas con el numero 2
  const arrayMod = array.map( (num) => {
    if(num.player == 2) {
      num.state = 'selected'
    }
    return num
  })
  board.set( arrayMod )
}

//Funcion para pintar las casillas ganadoras en caso de ser una fila
function printWinnerRows (array: Array<Case>,rp : ResultPlay, board :WritableSignal<Case[]>) {
  let numRows = Math.sqrt(array.length)
  let row = rp.typeEndGame!.place
  let plus = 100
  for (let j = (0+row)*numRows; j < numRows*(1+row); j++) {
    setTimeout(
      () : void => {
        array[j].state = 'win'
        board.set( array )
      }
    , plus);
    plus+=500
  }
}

//Funcion para pintar las casillas ganadoras en caso de ser una columna
function printWinnerColums (array: Array<Case>,rp : ResultPlay, board :WritableSignal<Case[]>) {
  let numColumns = Math.sqrt(array.length)
  let column = rp.typeEndGame!.place
  let plus = 100
  for (let i = 0; i < numColumns; i++) {
    setTimeout(
      () : void => {
        array[i == 0 ? 0+column : (i*numColumns)+column].state = 'win'
        board.set( array )
      }
    , plus);
    plus+=500
  }
}

//Funcion para pintar las casillas ganadoras en caso de ser una diagonal
function printWinnerDiagonals (array: Array<Case>,rp : ResultPlay, board :WritableSignal<Case[]>) {
  let numDiagonals = Math.sqrt(array.length)
  let diagonal = rp.typeEndGame!.place
  let plus = 100

  if (diagonal == 0) {
    for (let i = 0; i < array.length; i+=numDiagonals-1+2) {
      setTimeout(
        () : void => {
          array[i].state = 'win'
          board.set( array )
        }
      , plus);
      plus+=500
    }
  } else if(diagonal == 1) {
    for (let i = numDiagonals-1; i < ((numDiagonals-1)*numDiagonals)+1; i+=numDiagonals-1) {
      setTimeout(
        () : void => {
          array[i].state = 'win'
          board.set( array )
        }
      , plus);
      plus+=500
    }
  }
}

//Funcion para pintar todas las casillas cuando es un empate
function printDraw (array: Array<Case>,rp : ResultPlay, board : WritableSignal<Case[]>) {
  let plus = 100
  for (let index = 0; index < array.length; index++) {
    switch (index) {
      case 0:
        setTimeout(
          () : void => {
            array[0].state = 'win'
            board.set( array )
          }
        ,plus)
        break;
      case 1:
        setTimeout(
          () : void => {
            array[1].state = 'win'
            array[3].state = 'win'
            board.set( array )
          }
        ,plus)
        break;
      case 2:
        setTimeout(
          () : void => {
            array[2].state = 'win'
            array[4].state = 'win'
            array[6].state = 'win'
            board.set( array )
          }
        ,plus)
        break;
      case 3:
        setTimeout(
          () : void => {
            array[5].state = 'win'
            array[7].state = 'win'
            board.set( array )
          }
        ,plus)
        break;
      case 4:
        setTimeout(
          () : void => {
            array[8].state = 'win'
            board.set( array )
          }
        ,plus)
        break;
    }
    board.set( array )
    plus+=500
  }
}
