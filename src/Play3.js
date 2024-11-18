import React, { useState, useEffect } from "react";

const EmojiSpaceOdyssey = () => {
  const [gameState, setGameState] = useState("start");
  const [playerPosition, setPlayerPosition] = useState(2);
  const [alienPosition, setAlienPosition] = useState(
    Math.floor(Math.random() * 5)
  );
  const [score, setScore] = useState(0);
  const [bullets, setBullets] = useState(5);
  const [message, setMessage] = useState("");

  const emojis = ["🌎", "🌍", "🌏", "🪐", "🌟"];
  const player = "🚀";
  const alien = "👾";

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === "playing") {
        if (e.key === "ArrowLeft" && playerPosition > 0) {
          setPlayerPosition(playerPosition - 1);
        } else if (e.key === "ArrowRight" && playerPosition < 4) {
          setPlayerPosition(playerPosition + 1);
        } else if (e.key === " " && bullets > 0) {
          shoot();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, playerPosition, bullets]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setBullets(5);
    setMessage("");
  };

  const shoot = () => {
    setBullets(bullets - 1);
    if (playerPosition === alienPosition) {
      setScore(score + 1);
      setMessage("Hit! 🎉");
      setAlienPosition(Math.floor(Math.random() * 5));
    } else {
      setMessage("Miss! 😅");
    }

    if (bullets === 1) {
      setGameState("gameover");
    }
  };

  const renderGame = () => {
    return emojis.map((emoji, index) => (
      <span
        key={index}
        style={{ fontSize: "3rem", position: "relative", margin: "0 0.5rem" }}
      >
        {emoji}
        {index === playerPosition && (
          <span style={{ position: "absolute", left: "0", top: "100%" }}>
            {player}
          </span>
        )}
        {index === alienPosition && (
          <span style={{ position: "absolute", left: "0", top: "0" }}>
            {alien}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div
      className="game-container"
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h1>Emoji Space Odyssey</h1>
      <p>Defend the galaxy with emojis!</p>

      {gameState === "start" && (
        <div>
          <p>
            Welcome, space cadet! Your mission is to protect the emoji planets
            from alien invasion. Use arrow keys to move and spacebar to shoot.
          </p>
          <button
            onClick={startGame}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Start Mission 🚀
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <div style={{ marginBottom: "1rem" }}>{renderGame()}</div>
          <p>
            Score: {score} | Bullets: {bullets}
          </p>
          <p>{message}</p>
          <div>
            <button
              onClick={() => setPlayerPosition(Math.max(0, playerPosition - 1))}
              disabled={playerPosition === 0}
              style={{ margin: "0 0.5rem" }}
            >
              ⬅️
            </button>
            <button
              onClick={shoot}
              disabled={bullets === 0}
              style={{ margin: "0 0.5rem" }}
            >
              🎯
            </button>
            <button
              onClick={() => setPlayerPosition(Math.min(4, playerPosition + 1))}
              disabled={playerPosition === 4}
              style={{ margin: "0 0.5rem" }}
            >
              ➡️
            </button>
          </div>
        </div>
      )}

      {gameState === "gameover" && (
        <div>
          <p>Game Over! Your final score: {score}</p>
          <button
            onClick={startGame}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Play Again ⚡
          </button>
        </div>
      )}

      <p style={{ marginTop: "1rem", fontSize: "0.8rem" }}>
        Use arrow keys to move and spacebar to shoot. Defend the emoji planets!
      </p>
    </div>
  );
};

export default EmojiSpaceOdyssey;
