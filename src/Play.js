import React, { useState, useEffect, useCallback } from "react";

const EmojiShooterGame = () => {
  const [playerPosition, setPlayerPosition] = useState(200);
  const [bullets, setBullets] = useState([]);
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameSize, setGameSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(400, window.innerWidth - 20);
      const height = width;
      setGameSize({ width, height });
      setPlayerPosition(width / 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const movePlayer = useCallback(
    (direction) => {
      setPlayerPosition((prevPos) => {
        const newPos = prevPos + direction * (gameSize.width * 0.05);
        return Math.max(0, Math.min(gameSize.width - 10, newPos));
      });
    },
    [gameSize.width]
  );

  const shoot = useCallback(() => {
    setBullets((prevBullets) => [
      ...prevBullets,
      { x: playerPosition + 5, y: gameSize.height - 20 },
    ]);
  }, [playerPosition, gameSize.height]);

  const handleKeyPress = useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowLeft":
          movePlayer(-1);
          break;
        case "ArrowRight":
          movePlayer(1);
          break;
        case " ":
          shoot();
          break;
        default:
          break;
      }
    },
    [movePlayer, shoot]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets
          .map((bullet) => ({
            ...bullet,
            y: bullet.y - gameSize.height * 0.0125,
          }))
          .filter((bullet) => bullet.y > 0)
      );

      setTargets((prevTargets) => {
        if (prevTargets.length < 5 && Math.random() < 0.1) {
          return [
            ...prevTargets,
            { x: Math.random() * (gameSize.width - 10), y: 0 },
          ];
        }
        return prevTargets
          .map((target) => ({
            ...target,
            y: target.y + gameSize.height * 0.0025,
          }))
          .filter((target) => target.y < gameSize.height);
      });

      setBullets((prevBullets) => {
        setTargets((prevTargets) => {
          const newTargets = prevTargets.filter((target) => {
            return !prevBullets.some(
              (bullet) =>
                Math.abs(bullet.x - target.x) < gameSize.width * 0.025 &&
                Math.abs(bullet.y - target.y) < gameSize.height * 0.025
            );
          });
          setScore(
            (prevScore) => prevScore + (prevTargets.length - newTargets.length)
          );
          return newTargets;
        });
        return prevBullets;
      });

      setTargets((prevTargets) => {
        if (prevTargets.some((target) => target.y >= gameSize.height - 20)) {
          setGameOver(true);
          return [];
        }
        return prevTargets;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameSize]);

  const restartGame = () => {
    setPlayerPosition(gameSize.width / 2);
    setBullets([]);
    setTargets([]);
    setScore(0);
    setGameOver(false);
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
          backgroundColor: "#f0f0f0",
          overflow: "hidden",
          touchAction: "none",
          marginBottom: "20px",
        }}
      >
        {!gameOver ? (
          <>
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                fontSize: `${gameSize.width * 0.045}px`,
                fontWeight: "bold",
              }}
            >
              Score: {score}
            </div>
            <div
              style={{
                position: "absolute",
                left: `${playerPosition}px`,
                bottom: "10px",
                fontSize: `${gameSize.width * 0.06}px`,
              }}
            >
              🚀
            </div>
            {bullets.map((bullet, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${bullet.x}px`,
                  top: `${bullet.y}px`,
                  fontSize: `${gameSize.width * 0.045}px`,
                }}
              >
                •
              </div>
            ))}
            {targets.map((target, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${target.x}px`,
                  top: `${target.y}px`,
                  fontSize: `${gameSize.width * 0.06}px`,
                }}
              >
                👾
              </div>
            ))}
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: `${gameSize.width * 0.06}px` }}>
              Game Over!
            </h2>
            <p style={{ fontSize: `${gameSize.width * 0.045}px` }}>
              Your final score is {score}
            </p>
            <button
              onClick={restartGame}
              style={{
                padding: "10px 20px",
                fontSize: `${gameSize.width * 0.04}px`,
                cursor: "pointer",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: `${gameSize.width}px`,
        }}
      >
        <button
          onTouchStart={() => movePlayer(-1)}
          onMouseDown={() => movePlayer(-1)}
          onTouchEnd={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          style={{
            fontSize: `${gameSize.width * 0.06}px`,
            padding: "10px",
            width: "33%",
            cursor: "pointer",
            backgroundColor: "#e0e0e0",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ⬅️
        </button>
        <button
          onTouchStart={shoot}
          onMouseDown={shoot}
          onTouchEnd={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          style={{
            fontSize: `${gameSize.width * 0.06}px`,
            padding: "10px",
            width: "33%",
            cursor: "pointer",
            backgroundColor: "#e0e0e0",
            border: "none",
            borderRadius: "5px",
          }}
        >
          🔫
        </button>
        <button
          onTouchStart={() => movePlayer(1)}
          onMouseDown={() => movePlayer(1)}
          onTouchEnd={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          style={{
            fontSize: `${gameSize.width * 0.06}px`,
            padding: "10px",
            width: "33%",
            cursor: "pointer",
            backgroundColor: "#e0e0e0",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export default EmojiShooterGame;
