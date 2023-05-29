import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public board: any = [];
  boardSize: number = 9;
  activePlayer: string = "X";
  turnCount: number = 0;
  isGameRunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;
  movesList: number[] = [];

  constructor() {
    this.newGame();
  }

  newGame() {
    this.activePlayer = "X";
    this.turnCount = 0;
    this.isGameRunning = false;
    this.isGameOver = false;
    this.winner = false;
    this.movesList = [];
    this.board = this.createBoard();
    this.computerPlay();
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push({ id: i, state: null });
    };
    return board;
  }

  get getBoard() {
    return this.board;
  }

  set setBoard(board: any) {
    this.board = [...board];
  }
  /* ORIGINAL FUNCTION */
  /*  changePlayerTurn(squareClicked: any) {
     this.updateBoard(squareClicked);
     if (!this.isGameOver) this.activePlayer = this.activePlayer === "X" ? "O" : "X"
 
     this.turnCount++;
     this.isGameOver = this.isGameOver ? true : false;
 
     console.log("Generated Number = " + this.generateRandomNumber());
   } */

  changePlayerTurn(squareClicked: any) {
    this.updateBoard(squareClicked);

    this.movesList.push(squareClicked.id);
    if (!this.isGameOver) this.activePlayer = "O";

    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;

    if (!this.isGameOver) {

      this.executionTime(() => this.computerPlay());
      /* this.computerPlay(); */
    }
  }

  updateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state;
    if (this.isWinner) {
      this.winner = true;
      this.isGameRunning = false;
      this.isGameOver = true;
    }
  }

  get gameOver(): boolean {
    return this.turnCount > 8 || this.winner ? true : false;
  }

  get isWinner(): boolean {
    return this.checkDiag() || this.checkRows(this.board, "row") || this.checkRows(this.board, "col") ? true : false;
  }

  checkRows(board: any, mode: any): boolean {
    const
      ROW = mode === "row" ? true : false,
      DIST = ROW ? 1 : 3,
      INC = ROW ? 3 : 1,
      NUMTIMES = ROW ? 7 : 3;

    for (let i = 0; i < NUMTIMES; i += INC) {
      let
        firstSquare = board[i].state,
        secondSquare = board[i + DIST].state,
        thirdSquare = board[i + (DIST * 2)].state;


      if (firstSquare && secondSquare && thirdSquare) {
        if (firstSquare === secondSquare && secondSquare === thirdSquare) return true;
      }
    }
    return false;
  }

  checkDiag() {
    const timesRun = 2,
      midSquare = this.board[4].state;

    for (let i = 0; i <= timesRun; i += 2) {
      let
        upperCorner = this.board[i].state,
        lowerCorner = this.board[8 - i].state;

      if (midSquare && upperCorner && lowerCorner) {
        if (midSquare === upperCorner && upperCorner === lowerCorner) return true;
      }
    }
    return false;
  }

  generateRandomNumber(): number {
    return Math.floor(Math.random() * 10);
  }

  computerPlay(): void {

    /*  var squareNumber = this.generateMove(); */
    var squareNumber = this.generarNumeroNoRepetido(this.movesList);

    this.movesList.push(squareNumber);
    this.board[squareNumber].state = "X";
    this.activePlayer = "X";

    if (this.isWinner) {
      this.winner = true;
      this.isGameRunning = false;
      this.isGameOver = true;
    }

    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;

    if (!this.isGameOver) {
      this.activePlayer = "O";
    }
  }

  /*  generateMove(): number {
 
     var generatedMove = this.generateRandomNumber();
 
     if (this.movesList.includes(generatedMove)) {
       
     }
     else {
       this.movesList.push(generatedMove);
       console.log("Generated Number = " + generatedMove);
     }
 
     return generatedMove;
   } */

  generarNumeroNoRepetido(listaNumeros: number[]): number {
    let numeroGenerado = Math.floor(Math.random() * 9); // Genera un número aleatorio del 0 al 8

    while (listaNumeros.includes(numeroGenerado)) {
      numeroGenerado = Math.floor(Math.random() * 9); // Genera un nuevo número si el generado ya está en la lista
    }

    console.log("N´mero generado = " + numeroGenerado);
    return numeroGenerado;
  }

  executionTime(funcion: () => void): void {
    setTimeout(funcion, 1000);
  }



}
