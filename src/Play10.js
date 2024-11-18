import React, { useState, useEffect, useRef } from "react";
import "./Play10.css";

const BikeEmojiGame = () => {
  const [bikePosition, setBikePosition] = useState({ x: 0, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [obstacles, setObstacles] = useState([
    { position: { x: 3, y: 5 }, type: "🏔️" },
    { position: { x: 7, y: 5 }, type: "🌳" },
    { position: { x: 9, y: 5 }, type: "🏆" },
  ]);
  const [particles, setParticles] = useState([]);
  const [wind, setWind] = useState(0);
  const [clouds, setClouds] = useState([]);
  const [sun, setSun] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);

  const gameContainerRef = useRef(null);

  // Handle bike movement
  const handleBikeMove = (direction) => {
    switch (direction) {
      case "up":
        setBikePosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y - 1,
        }));
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
        break;
      case "down":
        setBikePosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + 1,
        }));
        break;
      case "left":
        setBikePosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x - 1,
        }));
        break;
      case "right":
        setBikePosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x + 1,
        }));
        break;
      default:
        break;
    }

    // Check for collisions or reaching the top
    const currentObstacles = obstacles.filter(
      (obstacle) =>
        obstacle.position.x === bikePosition.x &&
        obstacle.position.y === bikePosition.y
    );
    if (currentObstacles.length > 0) {
      if (currentObstacles[0].type === "🏆") {
        setScore(score + 1);
        setBikePosition({ x: 0, y: 5 });
        setObstacles([
          ...obstacles.filter(
            (obstacle) =>
              !(
                obstacle.position.x === bikePosition.x &&
                obstacle.position.y === bikePosition.y
              )
          ),
          {
            position: {
              x: Math.floor(Math.random() * 10),
              y: Math.floor(Math.random() * 10),
            },
            type: "🏔️",
          },
          {
            position: {
              x: Math.floor(Math.random() * 10),
              y: Math.floor(Math.random() * 10),
            },
            type: "🌳",
          },
          {
            position: {
              x: Math.floor(Math.random() * 10),
              y: Math.floor(Math.random() * 10),
            },
            type: "🏆",
          },
        ]);
        shakeScreen();
      } else {
        setGameOver(true);
        createParticles(bikePosition);
        shakeScreen();
      }
    } else if (bikePosition.y >= 10) {
      setScore(score + 1);
      setBikePosition({ x: 0, y: 5 });
      setObstacles([
        ...obstacles.filter(
          (obstacle) =>
            !(
              obstacle.position.x === 10 &&
              obstacle.position.y === bikePosition.y
            )
        ),
        {
          position: {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10),
          },
          type: "🏔️",
        },
        {
          position: {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10),
          },
          type: "🌳",
        },
        {
          position: {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10),
          },
          type: "🏆",
        },
      ]);
    } else if (bikePosition.y < 0) {
      setGameOver(true);
      createParticles(bikePosition);
      shakeScreen();
    }
  };

  // Create particles on collision
  const createParticles = (position) => {
    const newParticles = Array.from({ length: 20 }, () => ({
      x: position.x * 50,
      y: position.y * 30,
      size: Math.random() * 10 + 5,
      speed: Math.random() * 5 + 1,
      angle: Math.random() * 2 * Math.PI,
    }));
    setParticles(newParticles);
  };

  // Update particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: particle.x + particle.speed * Math.cos(particle.angle),
          y: particle.y + particle.speed * Math.sin(particle.angle),
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Update wind and clouds
  useEffect(() => {
    const windInterval = setInterval(() => {
      setWind(Math.floor(Math.random() * 3) - 1);
    }, 2000);

    const cloudInterval = setInterval(() => {
      setClouds([
        { x: 0, y: Math.floor(Math.random() * 100) },
        {
          x: Math.floor(Math.random() * 400),
          y: Math.floor(Math.random() * 100),
        },
        { x: 400, y: Math.floor(Math.random() * 100) },
      ]);
    }, 5000);

    const sunInterval = setInterval(() => {
      setSun({
        x: Math.floor(Math.random() * 400),
        y: Math.floor(Math.random() * 100),
      });
    }, 10000);

    return () => {
      clearInterval(windInterval);
      clearInterval(cloudInterval);
      clearInterval(sunInterval);
    };
  }, []);

  // Screen shake effect
  const shakeScreen = () => {
    if (gameContainerRef.current) {
      gameContainerRef.current.classList.add("shake");
      setTimeout(() => {
        gameContainerRef.current.classList.remove("shake");
      }, 500);
    }
  };

  return (
    <div className="game-container" ref={gameContainerRef}>
      <h1>Bike Emoji Climbing Game</h1>
      <div className="game-board">
        {Array.from({ length: 10 }, (_, y) => (
          <div key={y} className="row">
            {Array.from({ length: 10 }, (_, x) => (
              <div
                key={`${x}-${y}`}
                className={`cell ${
                  bikePosition.x === x && bikePosition.y === y
                    ? "bike-position"
                    : ""
                }`}
              >
                {bikePosition.x === x && bikePosition.y === y && (
                  <div className={`bike ${isJumping ? "jumping" : ""}`}>🚲</div>
                )}
                {obstacles
                  .filter(
                    (obstacle) =>
                      obstacle.position.x === x && obstacle.position.y === y
                  )
                  .map((obstacle, index) => (
                    <div
                      key={index}
                      className={`obstacle ${obstacle.type.replace("️", "")}`}
                    >
                      {obstacle.type}
                    </div>
                  ))}
                {particles
                  .filter(
                    (particle) =>
                      particle.x >= x * 50 &&
                      particle.x < (x + 1) * 50 &&
                      particle.y >= y * 30 &&
                      particle.y < (y + 1) * 30
                  )
                  .map((particle, index) => (
                    <div
                      key={index}
                      className="particle"
                      style={{
                        left: `${particle.x - 25}px`,
                        top: `${particle.y - 25}px`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                      }}
                    />
                  ))}
                {clouds
                  .filter(
                    (cloud) =>
                      cloud.x >= x * 50 &&
                      cloud.x < (x + 1) * 50 &&
                      cloud.y >= y * 30 &&
                      cloud.y < (y + 1) * 30
                  )
                  .map((cloud, index) => (
                    <div
                      key={index}
                      className="cloud"
                      style={{ top: `${cloud.y}px` }}
                    >
                      ☁️
                    </div>
                  ))}
                {x === Math.floor(sun.x / 50) &&
                  y === Math.floor(sun.y / 30) && (
                    <div className="sun" style={{ top: `${sun.y}px` }}>
                      ☀️
                    </div>
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="score">Score: {score}</div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Your final score: {score}</p>
        </div>
      )}
      <div className="controls">
        <button onClick={() => handleBikeMove("up")}>Up</button>
        <button onClick={() => handleBikeMove("down")}>Down</button>
        <button onClick={() => handleBikeMove("left")}>Left</button>
        <button onClick={() => handleBikeMove("right")}>Right</button>
      </div>
    </div>
  );
};

export default BikeEmojiGame;
