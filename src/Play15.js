import React, { useState } from "react";

function GalacticSpaceRace() {
  const [player1Position, setPlayer1Position] = useState(0);
  const [player2Position, setPlayer2Position] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [message, setMessage] = useState("");
  const trackLength = 20;
  const obstacles = [5, 12, 17]; // Obstacles slow you down
  const boosters = [3, 10, 15]; // Boosters give you extra movement

  const rollDie = () => Math.floor(Math.random() * 6) + 1;

  const movePlayer = () => {
    const roll = rollDie();
    let newPosition;
    if (currentPlayer === 1) {
      newPosition = Math.min(player1Position + roll, trackLength);
      if (obstacles.includes(newPosition)) {
        newPosition -= 1;
        setMessage("Player 1 hit an asteroid 🪨 and moved back!");
      } else if (boosters.includes(newPosition)) {
        newPosition += 1;
        setMessage("Player 1 found a booster 🛢️ and sped ahead!");
      } else {
        setMessage(`Player 1 moved forward ${roll} spaces 🚀`);
      }
      setPlayer1Position(newPosition);
    } else {
      newPosition = Math.min(player2Position + roll, trackLength);
      if (obstacles.includes(newPosition)) {
        newPosition -= 1;
        setMessage("Player 2 hit an asteroid 🪨 and moved back!");
      } else if (boosters.includes(newPosition)) {
        newPosition += 1;
        setMessage("Player 2 found a booster 🛢️ and sped ahead!");
      } else {
        setMessage(`Player 2 moved forward ${roll} spaces 🚀`);
      }
      setPlayer2Position(newPosition);
    }
    if (newPosition === trackLength) {
      setMessage(`Player ${currentPlayer} wins the race! 🏁`);
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

  const renderTrack = (position) => {
    const track = [];
    for (let i = 0; i <= trackLength; i++) {
      if (i === position) {
        track.push("🚀");
      } else if (obstacles.includes(i)) {
        track.push("🪨");
      } else if (boosters.includes(i)) {
        track.push("🛢️");
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
        backgroundColor: "#000080", // Dark space background
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#00ff00" }}>
        Galactic Space Race 🌌
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
          <div style={{ fontSize: "20px", marginBottom: "10px" }}>
            Track: {renderTrack(player1Position).join(" ")}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <h2>Player 2</h2>
          <div style={{ fontSize: "20px", marginBottom: "10px" }}>
            Track: {renderTrack(player2Position).join(" ")}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>{message}</div>

      {player1Position === trackLength || player2Position === trackLength ? (
        <button
          onClick={resetGame}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4500",
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
            backgroundColor: "#32cd32",
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

export default GalacticSpaceRace;
