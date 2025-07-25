import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 4x3 Pocket Chess with 2 Pawns and 1 King per Player
const PocketChess = () => {
  const rows = 4;
  const cols = 3;
  const squareSize = 16; // Fixed size for equal square blocks (px)
  const initialBoard = [
    ['bp', 'bk', 'bp'], // Black: pawn, king, pawn
    ['', '', ''],       // Empty
    ['', '', ''],       // Empty
    ['wp', 'wk', 'wp']  // White: pawn, king, pawn
  ];

  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('white'); // 'white' or 'black'
  const [selected, setSelected] = useState(null); // {row, col}
  const [gameOver, setGameOver] = useState(null);

  // Helper: Check if move is valid
  const isValidMove = (fromRow, fromCol, toRow, toCol, player) => {
    const piece = board[fromRow][fromCol];
    if (!piece || piece[0] !== (player === 'white' ? 'w' : 'b')) return false;
    const isKing = piece[1] === 'k';
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // Bounds check
    if (toRow < 0 || toRow >= rows || toCol < 0 || toCol >= cols) return false;

    // Pawn moves
    if (!isKing) {
      const direction = player === 'white' ? -1 : 1;
      if (toCol === fromCol && toRow === fromRow + direction && !board[toRow][toCol]) return true; // Forward
      if (colDiff === 1 && toRow === fromRow + direction && board[toRow][toCol] && board[toRow][toCol][0] !== piece[0]) return true; // Capture
      return false;
    }

    // King moves: any direction, 1 square, capture if enemy
    if (rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff > 0)) {
      if (!board[toRow][toCol] || board[toRow][toCol][0] !== piece[0]) return true;
    }
    return false;
  };

  // Handle user click (select and move for white)
  const handleClick = (row, col) => {
    if (gameOver) return;
    if (turn === 'black') return; // AI's turn

    if (selected) {
      if (isValidMove(selected.row, selected.col, row, col, 'white')) {
        const newBoard = [...board.map(r => [...r])];
        newBoard[row][col] = newBoard[selected.row][selected.col];
        newBoard[selected.row][selected.col] = '';
        setBoard(newBoard);
        setSelected(null);
        setTurn('black');
        checkGameOver(newBoard);
        setTimeout(() => aiMove(newBoard), 500);
      } else {
        setSelected(null);
      }
    } else if (board[row][col] && board[row][col][0] === 'w') {
      setSelected({ row, col });
    }
  };

  // Minimax for AI (black)
  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = checkWinner(currentBoard);
    if (result || depth === 0) {
      return evaluateBoard(currentBoard);
    }

    let bestScore = isMaximizing ? -Infinity : Infinity;
    const moves = getAllMoves(currentBoard, isMaximizing ? 'black' : 'white');

    for (let move of moves) {
      const newBoard = makeMove(currentBoard, move);
      const score = minimax(newBoard, depth - 1, !isMaximizing);
      bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
    }
    return bestScore;
  };

  // Get all possible moves
  const getAllMoves = (currentBoard, player) => {
    const moves = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (currentBoard[r][c] && currentBoard[r][c][0] === (player === 'white' ? 'w' : 'b')) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const tr = r + dr;
              const tc = c + dc;
              if (tr >= 0 && tr < rows && tc >= 0 && tc < cols && isValidMove(r, c, tr, tc, player)) {
                moves.push({ fromRow: r, fromCol: c, toRow: tr, toCol: tc });
              }
            }
          }
        }
      }
    }
    return moves;
  };

  // Make move on board copy
  const makeMove = (currentBoard, { fromRow, fromCol, toRow, toCol }) => {
    const newBoard = [...currentBoard.map(r => [...r])];
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = '';
    return newBoard;
  };

  // Evaluate board (positive for black; kings worth more)
  const evaluateBoard = (currentBoard) => {
    let score = 0;
    currentBoard.forEach(row => {
      row.forEach(cell => {
        if (cell === 'bp') score += 1;
        if (cell === 'bk') score += 5; // King higher value
        if (cell === 'wp') score -= 1;
        if (cell === 'wk') score -= 5;
      });
    });
    return score;
  };

  // AI selects best move (depth 3)
  const aiMove = (currentBoard) => {
    let bestScore = -Infinity;
    let bestMove = null;
    const moves = getAllMoves(currentBoard, 'black');
    for (let move of moves) {
      const newBoard = makeMove(currentBoard, move);
      const score = minimax(newBoard, 3, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    if (bestMove) {
      const newBoard = makeMove(currentBoard, bestMove);
      setBoard(newBoard);
      setTurn('white');
      checkGameOver(newBoard);
    }
  };

  // Check winner: Prioritize king capture, then all pieces
  const checkWinner = (currentBoard) => {
    let whiteKing = 0, blackKing = 0;
    let whitePieces = 0, blackPieces = 0;
    currentBoard.forEach(row => row.forEach(cell => {
      if (cell === 'wk') whiteKing++;
      if (cell === 'bk') blackKing++;
      if (cell && cell[0] === 'w') whitePieces++;
      if (cell && cell[0] === 'b') blackPieces++;
    }));

    if (blackKing === 0) return 'white'; // White wins if black's king is captured
    if (whiteKing === 0) return 'black'; // Black wins if white's king is captured
    if (whitePieces === 0) return 'black'; // Fallback: all white pieces captured
    if (blackPieces === 0) return 'white'; // Fallback: all black pieces captured
    return null;
  };

  const checkGameOver = (currentBoard) => {
    const winner = checkWinner(currentBoard);
    if (winner) {
      const message = winner === 'white' 
        ? 'White wins! (Black\'s king captured or all pieces lost)' 
        : 'Black wins! (White\'s king captured or all pieces lost)';
      setGameOver(message);
    }
  };

  // Reset
  const resetGame = () => {
    setBoard(initialBoard);
    setTurn('white');
    setSelected(null);
    setGameOver(null);
  };

  // Render piece (emojis)
  const renderPiece = (piece) => {
    if (piece === 'wp') return '♙';
    if (piece === 'wk') return '♔';
    if (piece === 'bp') return '♟';
    if (piece === 'bk') return '♚';
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center py-8 relative "
    >
      <h2 className="text-3xl font-bold mb-4 text-white ">Play Pocket Chess</h2>
      <div className="w-72 h-96 flex items-center justify-center border-10 m-10 border-amber-900 "> {/* 64x64 container */}
        <div 
          className="grid grid-cols-3 gap-0 h-full w-full" 
        //   style={{ width: `${squareSize * cols}px`, height: `${squareSize * rows}px` }}
        >
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
                className={`flex w-full h-full items-center justify-center text-3xl cursor-pointer aspect-square ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#FFF0BD]' : 'bg-[#9FC87E]'} ${selected && selected.row === rowIndex && selected.col === colIndex ? 'border-2 border-white' : ''}`}
                // style={{ width: `${squareSize}px`, height: `${squareSize}px` }} 
              >
                {renderPiece(piece)}
              </div>
            ))
          )}
        </div>
      </div>
      {gameOver && <p className="mt-10 text-xl text-white">{gameOver}</p>}
      <button onClick={resetGame} className="cursor-pointer mt-4 px-4 py-2 bg-[#DC3C22] text-white rounded">
        Reset Game
      </button>
    </motion.div>
  );
};

export default PocketChess;
