import React, { useState, useEffect, useCallback } from "react";

const EmojiSlingshotGame = () => {
  const [slingPosition, setSlingPosition] = useState({ x: 50, y: 350 });
  const [currentEmoji, setCurrentEmoji] = useState("😎");
  const [launchedEmoji, setLaunchedEmoji] = useState(null);
  const [structures, setStructures] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameSize, setGameSize] = useState({ width: 400, height: 400 });
  const [gameState, setGameState] = useState("aiming");

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(400, window.innerWidth - 20);
      const height = width;
      setGameSize({ width, height });
      setSlingPosition({ x: width * 0.15, y: height * 0.8 });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    initializeLevel();
  }, [level]);

  const initializeLevel = () => {
    const structureWidth = gameSize.width * 0.1;
    const structureHeight = gameSize.height * 0.3;
    const structureY = gameSize.height * 0.7;

    setStructures([
      {
        x: gameSize.width * 0.6,
        y: structureY,
        width: structureWidth,
        height: structureHeight,
      },
      {
        x: gameSize.width * 0.75,
        y: structureY,
        width: structureWidth,
        height: structureHeight,
      },
    ]);

    setEnemies([
      {
        x: gameSize.width * 0.625,
        y: structureY - gameSize.height * 0.05,
        emoji: "😈",
      },
      {
        x: gameSize.width * 0.775,
        y: structureY - gameSize.height * 0.05,
        emoji: "😈",
      },
    ]);

    setGameState("aiming");
  };

  const launchEmoji = useCallback(() => {
    if (gameState !== "aiming") return;

    const targetX = gameSize.width * 0.7;
    const targetY = gameSize.height * 0.6;
    const gravity = 0.5;
    const power = 20;

    const dx = targetX - slingPosition.x;
    const dy = targetY - slingPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const velocityX = (dx / distance) * power;
    const velocityY =
      (dy / distance) * power - (gravity * distance) / (2 * power);

    setLaunchedEmoji({
      x: slingPosition.x,
      y: slingPosition.y,
      speed: { x: velocityX, y: velocityY },
      emoji: currentEmoji,
    });
    setGameState("launched");
  }, [gameState, slingPosition, currentEmoji, gameSize]);

  useEffect(() => {
    if (gameState !== "launched") return;

    const gameLoop = setInterval(() => {
      setLaunchedEmoji((prev) => {
        if (!prev) return null;

        const newX = prev.x + prev.speed.x;
        const newY = prev.y + prev.speed.y;

        let collision = false;
        setStructures((prevStructures) => {
          return prevStructures.filter((structure) => {
            const structureCollision =
              newX > structure.x &&
              newX < structure.x + structure.width &&
              newY > structure.y &&
              newY < structure.y + structure.height;
            if (structureCollision) {
              setScore((prevScore) => prevScore + 10);
              collision = true;
            }
            return !structureCollision;
          });
        });

        setEnemies((prevEnemies) => {
          return prevEnemies.filter((enemy) => {
            const enemyCollision =
              Math.abs(newX - enemy.x) < 20 && Math.abs(newY - enemy.y) < 20;
            if (enemyCollision) {
              setScore((prevScore) => prevScore + 50);
              collision = true;
            }
            return !enemyCollision;
          });
        });

        if (
          newX < 0 ||
          newX > gameSize.width ||
          newY > gameSize.height ||
          collision
        ) {
          if (structures.length === 0 && enemies.length === 0) {
            initializeLevel();
          } else {
            setGameState("aiming");
          }
          return null;
        }

        return {
          ...prev,
          x: newX,
          y: newY,
          speed: { x: prev.speed.x, y: prev.speed.y + 0.5 },
        };
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [gameState, gameSize, structures, enemies]);

  const moveSlingNear = () => {
    setSlingPosition((prev) => ({
      ...prev,
      x: Math.min(prev.x + 10, gameSize.width * 0.3),
    }));
  };

  const moveSlingFar = () => {
    setSlingPosition((prev) => ({
      ...prev,
      x: Math.max(prev.x - 10, gameSize.width * 0.05),
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        height: "100vh",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${gameSize.width}px`,
          height: `${gameSize.height}px`,
          backgroundColor: "#87CEEB",
          overflow: "hidden",
          touchAction: "none",
          marginBottom: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            fontSize: `${gameSize.width * 0.04}px`,
            fontWeight: "bold",
            color: "#fff",
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          Level: {level} | Score: {score}
        </div>

        {/* Slingshot */}
        <div
          style={{
            position: "absolute",
            left: `${slingPosition.x}px`,
            top: `${slingPosition.y}px`,
            fontSize: `${gameSize.width * 0.08}px`,
          }}
        >
          🎯
        </div>

        {/* Current Emoji */}
        {gameState === "aiming" && (
          <div
            style={{
              position: "absolute",
              left: `${slingPosition.x}px`,
              top: `${slingPosition.y - gameSize.height * 0.05}px`,
              fontSize: `${gameSize.width * 0.08}px`,
            }}
          >
            {currentEmoji}
          </div>
        )}

        {/* Launched Emoji */}
        {launchedEmoji && (
          <div
            style={{
              position: "absolute",
              left: `${launchedEmoji.x}px`,
              top: `${launchedEmoji.y}px`,
              fontSize: `${gameSize.width * 0.08}px`,
            }}
          >
            {launchedEmoji.emoji}
          </div>
        )}

        {/* Structures */}
        {structures.map((structure, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${structure.x}px`,
              top: `${structure.y}px`,
              width: `${structure.width}px`,
              height: `${structure.height}px`,
              backgroundColor: "#8B4513",
              borderRadius: "5px",
            }}
          />
        ))}

        {/* Enemies */}
        {enemies.map((enemy, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${enemy.x}px`,
              top: `${enemy.y}px`,
              fontSize: `${gameSize.width * 0.08}px`,
            }}
          >
            {enemy.emoji}
          </div>
        ))}
      </div>

      {/* Slingshot Control Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: `${gameSize.width}px`,
          marginBottom: "10px",
        }}
      >
        <button
          onClick={moveSlingFar}
          disabled={gameState !== "aiming"}
          style={{
            fontSize: `${gameSize.width * 0.04}px`,
            padding: "10px",
            cursor: "pointer",
            backgroundColor: gameState === "aiming" ? "#4CAF50" : "#A9A9A9",
            color: "white",
            border: "none",
            borderRadius: "5px",
            width: "45%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Move Far
        </button>
        <button
          onClick={moveSlingNear}
          disabled={gameState !== "aiming"}
          style={{
            fontSize: `${gameSize.width * 0.04}px`,
            padding: "10px",
            cursor: "pointer",
            backgroundColor: gameState === "aiming" ? "#4CAF50" : "#A9A9A9",
            color: "white",
            border: "none",
            borderRadius: "5px",
            width: "45%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Move Near
        </button>
      </div>

      {/* Launch Button */}
      <button
        onClick={launchEmoji}
        disabled={gameState !== "aiming"}
        style={{
          fontSize: `${gameSize.width * 0.06}px`,
          padding: "10px",
          width: `${gameSize.width}px`,
          cursor: "pointer",
          backgroundColor: gameState === "aiming" ? "#4CAF50" : "#A9A9A9",
          color: "white",
          border: "none",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        Launch Emoji
      </button>
    </div>
  );
};

export default EmojiSlingshotGame;
