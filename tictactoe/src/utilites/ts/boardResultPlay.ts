import { Case, Player } from "./alias";
import { ResultPlay } from "./interfaces";
import { WritableSignal } from "@angular/core";

let place = 0

export function resultPlayFunc (board : Array<Case>, player : Player) : ResultPlay {
  //1 saber si al menos 5 posiciones que no tengan el numero 2
  //2 revisar si las filas tienen el mismo numero
  //3 revisar si las columnas tienen el mismo numero
  //4 revisar las diagonales
  //5 si todas las posiciones estan completas empate

  const countNumberTwo = board.filter((element: Case) => element.player != 2).length;

  if(countNumberTwo >= 5){
    if(rows(board, player))      return {state: 'winner' , player : player, typeEndGame : {type : 'rows',       place : place}}
    if(columns(board, player))   return {state: 'winner' , player : player, typeEndGame : {type : 'columns',    place : place}}
    if(diagonals(board, player)) return {state: 'winner' , player : player, typeEndGame : {type : 'diagonals',  place : place}}
    if(draw(board))              return {state: 'draw'   , player : 2,      typeEndGame : {type : 'draw',       place : place}}
  }

  return {state: 'play'   , player : 2}
}


function rows (board : Array<Case>, player : Player) : boolean {
  let row
  let numRows = Math.sqrt(board.length)

  for (let i = 0; i < numRows; i++) {
    row = 0
    for (let j = (0+i)*numRows; j < numRows*(1+i); j++) {
      if(board[j].player == player) row++
    }
    if(row == numRows) {
      place = i
      return true
    }
  }

  return false
}

function columns (board : Array<Case>, player : Player) : boolean {
  let columns
  let numColumns = Math.sqrt(board.length)

  for (let i = 0; i < numColumns; i++) {
    columns = 0
    for (let j = 0; j < numColumns; j++) {
      if(board[j == 0 ? 0+i : (j*numColumns)+i].player == player) columns++
    }
    if(columns == numColumns) {
      place = i
      return true
    }
  }
  return false
}

function diagonals (board : Array<Case>, player : Player) : boolean {
  let sqrtBoard = Math.sqrt(board.length)
  //izquierda derecha
  let diagonal = 0
  for (let i = 0; i < board.length; i+=sqrtBoard-1+2) {
    if(board[i].player == player) diagonal++
  }
  if(diagonal == sqrtBoard) {
    place = 0
    return true
  }

  //derecha izquierda
  diagonal = 0
  for (let i = sqrtBoard-1; i < ((sqrtBoard-1)*sqrtBoard)+1; i+=sqrtBoard-1) {
    if(board[i].player == player) diagonal++
  }
  if(diagonal == sqrtBoard) {
    place = 1
    return true
  }

  return false
}

function draw (board : Array<Case>) : boolean {
  const countNumberTwo = board.filter((element: Case) => element.player != 2).length;
  if(countNumberTwo == board.length) return true
  return false
}


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

function blockNoSelect(array: Array<Case>, board :WritableSignal<Case[]>){
  const arrayMod = array.map( (num) => {
    if(num.player == 2) {
      num.state = 'selected'
    }
    return num
  })
  board.set( arrayMod )
}

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
