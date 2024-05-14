import React, { useState, useEffect } from 'react';
import './Grid.css';

interface Position {
  row: number;
  col: number;
}

const initialPosition: Position = { row: 0, col: 0 };

const Grid: React.FC = () => {
  const [position, setPosition] = useState<Position>(initialPosition);

  const handleKeyDown = (event: KeyboardEvent) => {
    setPosition(prevPosition => {
      let newPosition = { ...prevPosition };

      switch (event.key) {
        case 'ArrowUp':
          if (prevPosition.row > 0) newPosition.row -= 1;
          break;
        case 'ArrowDown':
          if (prevPosition.row < 3) newPosition.row += 1;
          break;
        case 'ArrowLeft':
          if (prevPosition.col > 0) newPosition.col -= 1;
          break;
        case 'ArrowRight':
          if (prevPosition.col < 3) newPosition.col += 1;
          break;
      }
      return newPosition;
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="grid">
      {Array.from({ length: 4 }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: 4 }).map((_, colIndex) => (
            <div key={colIndex} className="cell">
              {position.row === rowIndex && position.col === colIndex && (
                <div className="dot" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
