import React, { useState } from 'react';
import './index.css';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    Draws: 0
  });
  const [currStatus, setCurrStatus] = useState("Next player: X"); // ✅ track status

  function handleClick(i) {
    if (board[i] || gameOver) return;

    const newBoard = [...board];
    newBoard[i] = isX ? "X" : "O";
    setBoard(newBoard);

    const winner = calcWinner(newBoard);

    if (winner && !gameOver) {
      setCurrStatus(`Winner: ${winner.name}`);
      setScores((prev) => ({ ...prev, [winner.name]: prev[winner.name] + 1 }));
      setWinningLine(winner.line); // ✅ save winning cells
      setGameOver(true);
    } else if (!winner && newBoard.every(Boolean)) {
      setCurrStatus("It's a Draw!");
      setScores((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
      setGameOver(true);
    } else {
      setIsX(!isX);
      setCurrStatus(`Next player: ${!isX ? "X" : "O"}`);
    }
  }

  function calcWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { name: board[a], line: [a, b, c] }; // ✅ return winner + line
      }
    }
    return null;
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setWinningLine([]); // ✅ reset highlight
    setGameOver(false);
    setCurrStatus("Next player: X"); // reset status
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <h1 className="mb-4">Tic Tac Toe</h1>

      <div className="d-flex gap-4 mb-4 h5">
        <span className="text-primary">X wins: {scores.X}</span>
        <span className="text-danger">O wins: {scores.O}</span>
        <span className="text-secondary">Draws: {scores.Draws}</span>
      </div>

      <div
        className="d-grid"
        style={{ gridTemplateColumns: "repeat(3,80px)", gap: "10px" }}
      >
        {board.map((a, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`btn fw-bold fs-3 ${
              winningLine.includes(i)
                ? "btn-success" // ✅ highlight winning cells
                : "btn-outline-dark"
            }`}
            style={{ width: "80px", height: "80px" }}
          >
            {a}
          </button>
        ))}
      </div>

      <p className="mt-4 h5">{currStatus}</p>
      <button onClick={resetGame} className="btn btn-primary mt-3 px-4">
        Reset Game
      </button>
    </div>
  );
}

export default App;
