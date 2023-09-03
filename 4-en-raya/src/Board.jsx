import './css/board.css';
import { TURNS } from './constants';

export function Circle ({ children, column, updateBoard, mouseMoving, coords }) {
  let clase = 'board-cell';
  if (children) {
    clase = (children === TURNS.A) ? 'board-cell green' : 'board-cell blue';
  }

  if (mouseMoving) clase += ' mouse-moving';

  const handleClick = () => {
    updateBoard(column);
  };

  return (
    <div
      className={clase}
      onClick={handleClick}
      style={(mouseMoving) && { transform: `translate(${coords.x}px, ${coords.y}px)` }}
    >
    </div>
  );
}

export default function Board ({ board, updateBoard }) {
  return (
    <div className='board'>
      {
        board.map((cell, index) => {
          return (
            <Circle
              key={index}
              column={index % 7}
              updateBoard={updateBoard}
            >
              {cell}
            </Circle>
          );
        })
      }
    </div>
  );
}
