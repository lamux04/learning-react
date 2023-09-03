import { useEffect, useState } from 'react';
import Board, { Circle } from './Board';
import { TURNS } from './constants';
import Winner from './Winner';
import confetti from 'canvas-confetti';

function App () {
  const [board, setBoard] = useState(Array(42).fill(null)); // null || 'green' || 'blue'
  const [turn, setTurn] = useState(TURNS.A);
  const [winner, setWinner] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (winner === TURNS.A || winner === TURNS.B) { confetti(); }
  }, [winner]);

  useEffect(() => {
    const eventHandler = (ev) => {
      setMouse({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', eventHandler);

    return () => {
      window.removeEventListener('mousemove', eventHandler);
    };
  }, [turn]);

  // Calcular ganador
  const calculateWinner = (board) => {
    let [i, j] = [0, 3];

    while (j < 42) {
      if (board[i] && board[i] === board[i + 1] && board[i] === board[i + 2] && board[i] === board[i + 3]) {
        return board[i];
      }

      if (j % 7 === 6) {
        i = j + 1;
        j = i + 3;
      } else {
        i++;
        j++;
      }
    }

    // ''trasponemos'' el tablero
    const newBoard = Array(48).fill(null);

    board.forEach((el, index) => {
      const row = Math.floor(index / 7);
      const col = index % 7;

      newBoard[col * 7 + row] = el;
    });

    // Realizamos de nuevo lo mismo
    [i, j] = [0, 3];
    while (j < 48) {
      if (newBoard[i] && newBoard[i] === newBoard[i + 1] && newBoard[i] === newBoard[i + 2] && newBoard[i] === newBoard[i + 3]) {
        return newBoard[i];
      }

      if (j % 7 === 6) {
        i = j + 1;
        j = i + 3;
      } else {
        i++;
        j++;
      }
    }

    const posiblesDiagonales = [
      [3, 11, 19, 27],
      [2, 10, 18, 26, 34],
      [1, 9, 17, 25, 33, 41],
      [0, 8, 16, 24, 32, 40],
      [7, 15, 23, 31, 39],
      [14, 22, 30, 38],
      [21, 15, 9, 3],
      [28, 22, 16, 10, 4],
      [35, 29, 23, 17, 11, 5],
      [36, 30, 24, 18, 12, 6],
      [37, 31, 25, 19, 13],
      [38, 32, 26, 20]
    ];

    let winner;

    posiblesDiagonales.forEach(diagonal => {
      diagonal = diagonal.map(el => board[el]);
      if (diagonal.toString().includes(TURNS.A + ',' + TURNS.A + ',' + TURNS.A + ',' + TURNS.A)) winner = TURNS.A;
      if (diagonal.toString().includes(TURNS.B + ',' + TURNS.B + ',' + TURNS.B + ',' + TURNS.B)) winner = TURNS.B;
    });

    // TODO: diagonales
    return winner;
  };

  const updateWinner = (newBoard) => {
    // Hay ganador???
    const newWinner = calculateWinner(newBoard);
    if (newWinner) setWinner(newWinner);
  };

  const updateTurn = () => {
    // Cambiamos turno
    setTurn((turn === TURNS.A) ? TURNS.B : TURNS.A);
  };

  const resetApp = () => {
    setWinner(null);
    setTurn(TURNS.A);
  };

  // Calcular nuevo tablero dado otro y la columna
  const calculatePostition = (oldBoard, column) => {
    let newPosition = null;
    oldBoard.forEach((cell, index) => {
      if (index % 7 === column && !cell) {
        newPosition = index;
      }
    });
    return newPosition;
  };

  // Actualizar tablero
  const updateBoard = (column) => {
    const index = calculatePostition(board, column);
    if (index === null || winner !== null) return;

    // Actualizamos estado
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    updateWinner(newBoard);

    updateTurn();
  };

  // Reset board
  const resetBoard = () => {
    setBoard(Array(42).fill(null));
    setTurn(TURNS.A);
    setWinner(null);
  };

  return (
    <>
      <Circle mouseMoving coords={mouse}>{turn}</Circle>
      <Board
        winner={winner}
        turn={turn}
        reset={resetApp}
        board={board}
        updateBoard={updateBoard}
      />
      <div className='turns'>
        <div className={(turn === TURNS.A) ? 'turnson' : undefined}>
          <Circle>green</Circle>
        </div>
        <div className={(turn === TURNS.B) ? 'turnson' : undefined}>
          <Circle>blue</Circle>
        </div>
      </div>
      <Winner>
        {(winner !== null) ? `The winner is ${winner}` : (winner === false) ? 'Empate' : ''}
      </Winner>
      <button className='button' onClick={resetBoard}>Resetear juego</button>
    </>
  );
}

export default App;
