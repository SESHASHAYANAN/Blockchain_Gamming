import React, { useState } from "react";

function MultiplayerEmojiBattle() {
  const [player1Health, setPlayer1Health] = useState(100);
  const [player2Health, setPlayer2Health] = useState(100);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [message, setMessage] = useState("");

  const attack = () => {
    if (currentPlayer === 1) {
      setPlayer2Health((prev) => Math.max(0, prev - 10));
      setMessage("Player 1 attacked ⚔️!");
    } else {
      setPlayer1Health((prev) => Math.max(0, prev - 10));
      setMessage("Player 2 attacked ⚔️!");
    }
    switchTurn();
  };

  const defend = () => {
    if (currentPlayer === 1) {
      setPlayer1Health((prev) => Math.min(100, prev + 5)); // Player 1 defends and recovers 5 HP
      setMessage("Player 1 defended 🛡️ and recovered 5 HP!");
    } else {
      setPlayer2Health((prev) => Math.min(100, prev + 5)); // Player 2 defends and recovers 5 HP
      setMessage("Player 2 defended 🛡️ and recovered 5 HP!");
    }
    switchTurn();
  };

  const switchTurn = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const resetGame = () => {
    setPlayer1Health(100);
    setPlayer2Health(100);
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
        backgroundColor: "#f0f8ff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Multiplayer Emoji Battle ⚔️</h1>

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
            HP: {player1Health}
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <h2>Player 2</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            HP: {player2Health}
          </p>
        </div>
      </div>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>{message}</div>

      <div style={{ marginTop: "20px" }}>
        {player1Health === 0 || player2Health === 0 ? (
          <>
            <h2>
              {player1Health === 0 ? "Player 2 Wins! 🎉" : "Player 1 Wins! 🎉"}
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
          </>
        ) : (
          <>
            <h2>Player {currentPlayer}'s Turn</h2>
            <button
              onClick={attack}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: "#32cd32",
                color: "white",
                fontSize: "16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Attack ⚔️
            </button>
            <button
              onClick={defend}
              style={{
                padding: "10px 20px",
                backgroundColor: "#1e90ff",
                color: "white",
                fontSize: "16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Defend 🛡️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MultiplayerEmojiBattle;
