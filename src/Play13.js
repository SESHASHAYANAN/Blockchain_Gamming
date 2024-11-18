import React, { useState } from "react";

function TreasureHuntDuel() {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [message, setMessage] = useState("");
  const treasures = [1, 4, 7]; // Fixed treasure positions for simplicity

  const handleCellClick = (index) => {
    if (grid[index] !== null || player1Score === 3 || player2Score === 3)
      return;

    let newGrid = [...grid];
    let score = 0;
    if (treasures.includes(index)) {
      newGrid[index] = "💰";
      score = 1;
    } else {
      newGrid[index] = "❌";
    }

    if (currentPlayer === 1) {
      setPlayer1Score(player1Score + score);
      setMessage("Player 1 dug for treasure!");
    } else {
      setPlayer2Score(player2Score + score);
      setMessage("Player 2 dug for treasure!");
    }

    setGrid(newGrid);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const resetGame = () => {
    setGrid(Array(9).fill(null));
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(1);
    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0e68c", // Sandy beach background
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#8b4513" }}>
        🏴‍☠️ Treasure Hunt Duel 🏴‍☠️
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Player 1</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            Treasures: {player1Score}
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2>Player 2</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            Treasures: {player2Score}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridGap: "10px",
          marginTop: "20px",
        }}
      >
        {grid.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#deb887", // Treasure map background
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              borderRadius: "10px",
              cursor: "pointer",
              border: "2px solid #8b4513", // Brown border for pirate map style
            }}
          >
            {cell}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>{message}</div>

      {player1Score === 3 || player2Score === 3 ? (
        <div style={{ marginTop: "20px", color: "#ff6347" }}>
          <h2>
            {player1Score === 3 ? "Player 1 Wins! 🎉" : "Player 2 Wins! 🎉"}
          </h2>
          <button
            onClick={resetGame}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff6347",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Restart Game
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <h2>Player {currentPlayer}'s Turn</h2>
        </div>
      )}
    </div>
  );
}

export default TreasureHuntDuel;
