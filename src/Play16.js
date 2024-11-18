import React, { useState } from "react";

function TreasureIslandQuest() {
  const [player1Position, setPlayer1Position] = useState(0);
  const [player2Position, setPlayer2Position] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [message, setMessage] = useState("");
  const islandSize = 25;
  const storms = [4, 12, 17]; // Storms blow players back
  const treasures = [5, 14, 20]; // Treasures boost players
  const traps = [7, 18]; // Traps send players back to start
  const safePaths = [2, 9, 15]; // Safe paths allow extra moves

  const rollDie = () => Math.floor(Math.random() * 6) + 1;

  const movePlayer = () => {
    const roll = rollDie();
    let newPosition;

    if (currentPlayer === 1) {
      newPosition = Math.min(player1Position + roll, islandSize);
      if (storms.includes(newPosition)) {
        newPosition -= 3;
        setMessage("Player 1 got caught in a storm and was blown back! 🏴‍☠️");
      } else if (treasures.includes(newPosition)) {
        newPosition += 3;
        setMessage("Player 1 found a hidden treasure and advanced! 💰");
      } else if (traps.includes(newPosition)) {
        newPosition = 0;
        setMessage("Player 1 fell into a trap and returned to the start! 🕳️");
      } else if (safePaths.includes(newPosition)) {
        newPosition += 2;
        setMessage("Player 1 took a safe path and moved forward quickly! 🏝️");
      } else {
        setMessage(`Player 1 moved forward ${roll} spaces. 🏴‍☠️`);
      }
      setPlayer1Position(newPosition);
    } else {
      newPosition = Math.min(player2Position + roll, islandSize);
      if (storms.includes(newPosition)) {
        newPosition -= 3;
        setMessage("Player 2 got caught in a storm and was blown back! 🌊");
      } else if (treasures.includes(newPosition)) {
        newPosition += 3;
        setMessage("Player 2 found a hidden treasure and advanced! 💰");
      } else if (traps.includes(newPosition)) {
        newPosition = 0;
        setMessage("Player 2 fell into a trap and returned to the start! 🕳️");
      } else if (safePaths.includes(newPosition)) {
        newPosition += 2;
        setMessage("Player 2 took a safe path and moved forward quickly! 🏝️");
      } else {
        setMessage(`Player 2 moved forward ${roll} spaces. 🌊`);
      }
      setPlayer2Position(newPosition);
    }

    if (newPosition === islandSize) {
      setMessage(
        `Player ${currentPlayer} found the treasure and won the game! 🏆`
      );
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const resetGame = () => {
    setPlayer1Position(0);
    setPlayer2Position(0);
    setCurrentPlayer(1);
    setMessage("");
  };

  const renderIslandTrack = (position) => {
    const track = [];
    for (let i = 0; i <= islandSize; i++) {
      if (i === position) {
        track.push(currentPlayer === 1 ? "🏴‍☠️" : "🌊");
      } else if (storms.includes(i)) {
        track.push("🌪️");
      } else if (treasures.includes(i)) {
        track.push("💰");
      } else if (traps.includes(i)) {
        track.push("🕳️");
      } else if (safePaths.includes(i)) {
        track.push("🏝️");
      } else {
        track.push("•");
      }
    }
    return track;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#87CEEB", // Tropical island sky blue
        color: "black",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#FFD700" }}>
        Treasure Island Quest 🏝️
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Player 1 🏴‍☠️</h2>
          <div style={{ fontSize: "20px", marginBottom: "10px" }}>
            Island Path: {renderIslandTrack(player1Position).join(" ")}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <h2>Player 2 🌊</h2>
          <div style={{ fontSize: "20px", marginBottom: "10px" }}>
            Island Path: {renderIslandTrack(player2Position).join(" ")}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>{message}</div>

      {player1Position === islandSize || player2Position === islandSize ? (
        <button
          onClick={resetGame}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF4500",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Restart Game
        </button>
      ) : (
        <button
          onClick={movePlayer}
          style={{
            padding: "10px 20px",
            backgroundColor: "#32CD32",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Roll the Die 🎲
        </button>
      )}
    </div>
  );
}

export default TreasureIslandQuest;
