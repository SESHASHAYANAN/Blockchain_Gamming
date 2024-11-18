import React, { useState, useEffect } from "react";
import { Moon, Star, Rocket, ChevronLeft, ChevronRight } from "lucide-react";

import "./Game9.css";

// Game character
const GameCharacter = () => (
  <div className="character">
    <div className="head">
      <div className="leye left"></div>
      <div className="eye right"></div>
      <div className="antenna">🖖</div>
    </div>
    <div className="body">
      <div className="arm left"></div>
      <div className="torso">
        <div className="circle">👽</div>
      </div>
      <div className="arm right"></div>
    </div>
    <div className="leg left"></div>
    <div className="leg right"></div>
  </div>
);

// Game interface
const CosmoGame = () => {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [time, setTime] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [enemies, setEnemies] = useState([
    { x: 20, y: 30, speed: 2 },
    { x: 70, y: 50, speed: 3 },
    { x: 40, y: 80, speed: 1.5 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
      setEnemies((prevEnemies) =>
        prevEnemies.map((enemy) => ({
          x: enemy.x + enemy.speed,
          y: enemy.y + enemy.speed * 0.5,
          speed: enemy.speed,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          setPlayerPosition((prevPos) => ({
            x: Math.max(prevPos.x - 10, 0),
            y: prevPos.y,
          }));
          break;
        case "ArrowRight":
          setPlayerPosition((prevPos) => ({
            x: Math.min(prevPos.x + 10, 100),
            y: prevPos.y,
          }));
          break;
        case "ArrowUp":
          setPlayerPosition((prevPos) => ({
            x: prevPos.x,
            y: Math.max(prevPos.y - 10, 0),
          }));
          break;
        case "ArrowDown":
          setPlayerPosition((prevPos) => ({
            x: prevPos.x,
            y: Math.min(prevPos.y + 10, 100),
          }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleCollectCoin = () => {
    setCoins((prevCoins) => prevCoins + 1);
    setScore((prevScore) => prevScore + 50);
  };

  const handleEnemyCollision = () => {
    setIsGameOver(true);
  };

  const handleGameOver = () => {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      setHighScore(score);
    }
    setIsGameOver(true);
    // Reset game state
    setScore(0);
    setCoins(0);
    setTime(0);
    setPlayerPosition({ x: 50, y: 50 });
    setEnemies([
      { x: 20, y: 30, speed: 2 },
      { x: 70, y: 50, speed: 3 },
      { x: 40, y: 80, speed: 1.5 },
    ]);
  };

  const handleRestart = () => {
    setIsGameOver(false);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="score-container">
          <Rocket size={24} /> <span className="font-bold">{score}</span>
        </div>
        <div className="coins-container">
          <Star size={24} /> <span className="font-bold">{coins}</span>
        </div>
        <div className="time-container">
          <Moon size={24} /> <span className="font-bold">{time}s</span>
        </div>
        <div className="high-score font-bold">High Score: {highScore}</div>
      </div>
      <div className="game-board">
        <div
          className="player"
          style={{ left: `${playerPosition.x}%`, top: `${playerPosition.y}%` }}
        >
          <GameCharacter />
        </div>
        {enemies.map((enemy, index) => (
          <div
            key={index}
            className="enemy"
            style={{ left: `${enemy.x}%`, top: `${enemy.y}%` }}
            onCollisionWith={handleEnemyCollision}
          >
            👾
          </div>
        ))}
        <div
          className="coin"
          style={{ left: "80%", top: "20%" }}
          onClick={handleCollectCoin}
        >
          ✨
        </div>
      </div>
      {isGameOver ? (
        <div className="game-over-container">
          <h2 className="text-2xl font-bold mb-4">Game Over 💥</h2>
          <p className="mb-4">Your score: {score}</p>
          <div className="buttons">
            <button className="restart" onClick={handleRestart}>
              Restart 🔁
            </button>
            <button
              className="main-menu"
              onClick={() => window.location.reload()}
            >
              Main Menu 🏠
            </button>
          </div>
        </div>
      ) : (
        <div className="controls-container">
          <button
            className="control-button"
            onClick={() =>
              setPlayerPosition((prevPos) => ({
                x: Math.max(prevPos.x - 10, 0),
                y: prevPos.y,
              }))
            }
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="control-button"
            onClick={() =>
              setPlayerPosition((prevPos) => ({
                x: Math.min(prevPos.x + 10, 100),
                y: prevPos.y,
              }))
            }
          >
            <ChevronRight size={24} />
          </button>
          <button
            className="control-button"
            onClick={() =>
              setPlayerPosition((prevPos) => ({
                x: prevPos.x,
                y: Math.max(prevPos.y - 10, 0),
              }))
            }
          >
            <ChevronLeft size={24} className="rotate-90" />
          </button>
          <button
            className="control-button"
            onClick={() =>
              setPlayerPosition((prevPos) => ({
                x: prevPos.x,
                y: Math.min(prevPos.y + 10, 100),
              }))
            }
          >
            <ChevronLeft size={24} className="-rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CosmoGame;
