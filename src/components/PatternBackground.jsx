import React, { useState, useEffect } from 'react';

const BLOCK_SIZE = '12rem'; // 12rem units

const getColor = (row, col) => {
  const isEvenRow = row % 2 === 0;
  const isEvenCol = col % 2 === 0;
  if (isEvenRow) {
    return isEvenCol ? 'bg-red-600' : 'bg-black text-white';
  } else {
    return isEvenCol ? 'bg-black text-white' : 'bg-red-600';
  }
};

const PatternBackground = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  useEffect(() => {
    const updateGrid = () => {
      // Convert rem to px for calculation
      const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const blockPx = 12 * remInPx;
      setCols(Math.ceil(window.innerWidth / blockPx));
      setRows(Math.ceil(window.innerHeight / blockPx));
    };
    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-screen -z-1 pointer-events-none select-none grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 12rem)`,
        gridTemplateRows: `repeat(${rows}, 12rem)`,
        opacity: 1,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: rows * cols }).map((_, idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        return (
          <div
            key={idx}
            className={getColor(rowIdx, colIdx)}
            style={{ width: '12rem', height: '15rem' }}
          ></div>
        );
      })}
    </div>
  );
};

export default PatternBackground;
