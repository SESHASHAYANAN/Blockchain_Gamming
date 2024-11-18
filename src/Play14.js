import React, { useState } from "react";

function JungleSafariAdventure() {
  const [player1Position, setPlayer1Position] = useState(0);
  const [player2Position, setPlayer2Position] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [message, setMessage] = useState("");
  const junglePathLength = 25;
  const vines = [3, 10, 16]; // Vines help you climb up
  const animals = [8, 14, 20]; // Wild animals pull you down
  const treasures = [5, 18]; // Treasure gives bonus moves
  const traps = [7, 21]; // Traps make you lose a turn

  const rollDie = () => Math.floor(Math.random() * 6) + 1;

  const movePlayer = () => {
    const roll = rollDie();
    let newPosition;

    if (currentPlayer === 1) {
      newPosition = Math.min(player1Position + roll, junglePathLength);
      if (vines.includes(newPosition)) {
        newPosition += 3;
        setMessage("Player 1 swung on a vine and climbed up! 🦁");
      } else if (animals.includes(newPosition)) {
        newPosition -= 3;
        setMessage(
          "Player 1 encountered a wild animal and was pulled back! 🦁"
        );
      } else if (treasures.includes(newPosition)) {
        newPosition += 2;
        setMessage("Player 1 found a treasure! Extra moves ahead! 🏆");
      } else if (traps.includes(newPosition)) {
        setMessage("Player 1 fell into a trap and loses a turn! 🕳️");
        setCurrentPlayer(2); // Skip Player 1's next turn
        return;
      } else {
        setMessage(`Player 1 moved forward ${roll} spaces. 🦁`);
      }
      setPlayer1Position(newPosition);
    } else {
      newPosition = Math.min(player2Position + roll, junglePathLength);
      if (vines.includes(newPosition)) {
        newPosition += 3;
        setMessage("Player 2 swung on a vine and climbed up! 🐘");
      } else if (animals.includes(newPosition)) {
        newPosition -= 3;
        setMessage(
          "Player 2 encountered a wild animal and was pulled back! 🐘"
        );
      } else if (treasures.includes(newPosition)) {
        newPosition += 2;
        setMessage("Player 2 found a treasure! Extra moves ahead! 🏆");
      } else if (traps.includes(newPosition)) {
        setMessage("Player 2 fell into a trap and loses a turn! 🕳️");
        setCurrentPlayer(1); // Skip Player 2's next turn
        return;
      } else {
        setMessage(`Player 2 moved forward ${roll} spaces. 🐘`);
      }
      setPlayer2Position(newPosition);
    }

    if (newPosition === junglePathLength) {
      setMessage(
        `Player ${currentPlayer} reached the end and won the jungle adventure! 🏆`
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

  const renderTrack = (position) => {
    const track = [];
    for (let i = 0; i <= junglePathLength; i++) {
      if (i === position) {
        track.push(currentPlayer === 1 ? "🦁" : "🐘");
      } else if (vines.includes(i)) {
        track.push("🌿");
      } else if (animals.includes(i)) {
        track.push("🐍");
      } else if (treasures.includes(i)) {
        track.push("🏆");
      } else if (traps.includes(i)) {
        track.push("🕳️");
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
        backgroundColor: "#228B22", // Jungle green background
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#FFD700" }}>
        Jungle Safari Adventure 🐾
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Player 1 🦁</h2>
          <div style={{ fontSize: "20px", marginBottom: "10px" }}>
            Track: {renderTrack(player1Position).join(" ")}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <h2>Player 2 🐘</h2>
          <div style={{ fontSize: "20px", marginBottom: "10px" }}>
            Track: {renderTrack(player2Position).join(" ")}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>{message}</div>

      {player1Position === junglePathLength ||
      player2Position === junglePathLength ? (
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

export default JungleSafariAdventure;
