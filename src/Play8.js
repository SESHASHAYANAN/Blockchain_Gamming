import React, { useState, useEffect } from "react";
import { Rocket, Star, Zap, Battery } from "lucide-react";

const SpaceExplorerGame = () => {
  const [alien, setAlien] = useState("👾");
  const [activity, setActivity] = useState("idle");
  const [points, setPoints] = useState(0);
  const [stardust, setStardust] = useState(0);
  const [oxygen, setOxygen] = useState(100);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [discovered, setDiscovered] = useState([]);
  const [currentMission, setCurrentMission] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [alienMood, setAlienMood] = useState("friendly");
  const [researchProgress, setResearchProgress] = useState(0);

  const aliens = {
    friendly: ["👾", "👽", "🛸"],
    mysterious: ["🌟", "✨", "💫"],
    energetic: ["⚡", "🌠", "🌈"],
    tired: ["😴", "💤", "🌙"],
  };

  const spacePhenomena = [
    { name: "Nebula Cloud", emoji: "🌌", points: 50, rarity: "common" },
    { name: "Black Hole", emoji: "🕳️", points: 100, rarity: "rare" },
    { name: "Cosmic Ray", emoji: "☄️", points: 75, rarity: "uncommon" },
    { name: "Star Cluster", emoji: "⭐", points: 60, rarity: "common" },
    { name: "Quantum Anomaly", emoji: "🌀", points: 150, rarity: "legendary" },
  ];

  const missions = [
    {
      task: "Chart constellation",
      reward: 80,
      duration: 10,
      check: (progress) => progress >= 100,
    },
    {
      task: "Study anomaly",
      reward: 120,
      duration: 15,
      check: (progress) => progress >= 100,
    },
    {
      task: "Contact aliens",
      reward: 200,
      duration: 20,
      check: (progress) => progress >= 100,
    },
  ];

  const getAnimationClass = (action) => {
    switch (action) {
      case "explore":
        return "animate-bounce";
      case "research":
        return "animate-pulse";
      case "communicate":
        return "animate-bounce";
      case "rest":
        return "animate-spin";
      default:
        return "";
    }
  };

  const addReaction = (emoji, points, message = "") => {
    const newReaction = {
      id: Date.now(),
      emoji,
      points,
      message,
      top: Math.random() * 50 + 25,
      left: Math.random() * 50 + 25,
    };
    setReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 1000);
  };

  const performAction = (actionType) => {
    if (isGameOver || oxygen <= 0) return;

    setActivity(actionType);
    setTimeout(() => setActivity(""), 1000);

    let pointsEarned = 0;
    let stardustEarned = 0;
    let oxygenCost = 10;

    switch (actionType) {
      case "explore":
        if (Math.random() < 0.4) {
          const phenomenon =
            spacePhenomena[Math.floor(Math.random() * spacePhenomena.length)];
          if (!discovered.includes(phenomenon.name)) {
            pointsEarned = phenomenon.points;
            stardustEarned = Math.floor(phenomenon.points / 2);
            setDiscovered((prev) => [...prev, phenomenon.name]);
            addReaction(phenomenon.emoji, pointsEarned, "New Discovery!");
          }
        }
        setAlienMood("energetic");
        oxygenCost = 15;
        break;

      case "research":
        pointsEarned = 20;
        stardustEarned = 5;
        setResearchProgress((prev) => {
          const newProgress = prev + 20;
          if (newProgress >= 100) {
            pointsEarned += 50;
            stardustEarned += 25;
            addReaction("🔬", 50, "Research Complete!");
            return 0;
          }
          return newProgress;
        });
        setAlienMood("mysterious");
        oxygenCost = 5;
        break;

      case "communicate":
        if (Math.random() < 0.3) {
          pointsEarned = 30;
          stardustEarned = 15;
          addReaction("📡", pointsEarned, "Signal Received!");
          setAlienMood("friendly");
        }
        oxygenCost = 8;
        break;

      case "rest":
        oxygenCost = -20;
        pointsEarned = 5;
        stardustEarned = 2;
        setAlienMood("tired");
        break;
    }

    setPoints((prev) => prev + pointsEarned);
    setStardust((prev) => prev + stardustEarned);
    setOxygen((prev) => Math.min(100, Math.max(0, prev - oxygenCost)));
  };

  const resetGame = () => {
    setPoints(0);
    setStardust(0);
    setOxygen(100);
    setTimeLeft(90);
    setIsGameOver(false);
    setDiscovered([]);
    setCurrentMission(null);
    setResearchProgress(0);
    setAlienMood("friendly");
    setReactions([]);
  };

  useEffect(() => {
    if (isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 || oxygen <= 0) {
          setIsGameOver(true);
          setHighScore((prev) => Math.max(prev, points));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, points, oxygen]);

  useEffect(() => {
    if (isGameOver) return;

    const missionTimer = setInterval(() => {
      if (!currentMission && Math.random() < 0.3) {
        setCurrentMission(
          missions[Math.floor(Math.random() * missions.length)]
        );
      }
    }, 8000);

    return () => clearInterval(missionTimer);
  }, [isGameOver, currentMission]);

  const styles = {
    gameContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "1rem",
      background: "linear-gradient(to bottom, #111827, #1e3a8a)",
      color: "white",
    },
    statsContainer: {
      textAlign: "center",
      marginBottom: "1rem",
    },
    statsRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "1rem",
    },
    statItem: {
      display: "flex",
      alignItems: "center",
    },
    statItemSpan: {
      marginLeft: "0.5rem",
    },
    icon: {
      width: "1.5rem",
      height: "1.5rem",
    },
    iconYellow: {
      color: "#fbbf24",
    },
    oxygenBar: {
      width: "12rem",
      height: "0.5rem",
      backgroundColor: "#374151",
      borderRadius: "9999px",
      margin: "0 auto",
      marginBottom: "0.5rem",
    },
    oxygenLevel: (oxygenPercent) => ({
      height: "100%",
      backgroundColor: "#3b82f6",
      borderRadius: "9999px",
      transition: "width 300ms",
      width: `${oxygenPercent}%`,
    }),
    missionAlert: {
      fontSize: "0.875rem",
      backgroundColor: "#1e3a8a",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      marginBottom: "0.5rem",
      animation: "pulse 2s infinite",
    },
    discoveriesText: {
      fontSize: "0.875rem",
      color: "#60a5fa",
    },
    gameArena: {
      position: "relative",
      width: "16rem",
      height: "16rem",
      backgroundColor: "#1f2937",
      borderRadius: "9999px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "2rem",
      border: "2px solid #3b82f6",
    },
    alienCharacter: (activity) => ({
      fontSize: "4.5rem",
      animation: activity
        ? `${getAnimationClass(activity)} 1s infinite`
        : "none",
    }),
    reaction: (top, left) => ({
      position: "absolute",
      fontSize: "1.5rem",
      top: `${top}%`,
      left: `${left}%`,
    }),
    reactionContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    pointsText: {
      fontSize: "0.875rem",
      color: "#fcd34d",
    },
    controlsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
    },
    controlButton: (color) => ({
      padding: "1rem",
      borderRadius: "0.5rem",
      color: "white",
      transition: "all 150ms",
      border: "none",
      cursor: "pointer",
      backgroundColor: color,
      ":hover": {
        filter: "brightness(90%)",
      },
      ":active": {
        transform: "scale(0.95)",
      },
    }),
    gameOver: {
      textAlign: "center",
    },
    gameOverTitle: {
      fontSize: "1.5rem",
      marginBottom: "1rem",
    },
    scoreText: {
      marginBottom: "0.5rem",
    },
    restartButton: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#2563eb",
      color: "white",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "background-color 150ms",
      ":hover": {
        backgroundColor: "#1d4ed8",
      },
    },
    highScore: {
      marginTop: "2rem",
      fontSize: "0.875rem",
      color: "#60a5fa",
    },
  };

  return (
    <div style={styles.gameContainer}>
      <div style={styles.statsContainer}>
        <div style={styles.statsRow}>
          <div style={styles.statItem}>
            <Star style={{ ...styles.icon, ...styles.iconYellow }} />
            <span style={styles.statItemSpan}>{points}</span>
          </div>
          <div style={styles.statItem}>
            <span style={{ fontSize: "2rem" }}>✨</span>
            <span style={styles.statItemSpan}>{stardust}</span>
          </div>
          <div style={styles.statItem}>
            <span>⏰ {timeLeft}s</span>
          </div>
        </div>

        <div style={styles.oxygenBar}>
          <div style={styles.oxygenLevel(oxygen)} />
        </div>

        {currentMission && (
          <div style={styles.missionAlert}>
            Mission: {currentMission.task} (Reward: {currentMission.reward}pts)
          </div>
        )}

        <div style={styles.discoveriesText}>
          Discoveries: {discovered.length}/{spacePhenomena.length}
        </div>
      </div>

      <div style={styles.gameArena}>
        <div style={styles.alienCharacter(activity)}>
          {
            aliens[alienMood][
              Math.floor(Math.random() * aliens[alienMood].length)
            ]
          }
        </div>
        {reactions.map((reaction) => (
          <div
            key={reaction.id}
            style={styles.reaction(reaction.top, reaction.left)}
          >
            <div style={styles.reactionContent}>
              {reaction.emoji}
              {reaction.points && (
                <span style={styles.pointsText}>+{reaction.points}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {!isGameOver ? (
        <div style={styles.controlsGrid}>
          <button
            onClick={() => performAction("explore")}
            style={styles.controlButton("#2563eb")}
          >
            🚀 Explore
          </button>
          <button
            onClick={() => performAction("research")}
            style={styles.controlButton("#7c3aed")}
          >
            🔬 Research
          </button>
          <button
            onClick={() => performAction("communicate")}
            style={styles.controlButton("#059669")}
          >
            📡 Communicate
          </button>
          <button
            onClick={() => performAction("rest")}
            style={styles.controlButton("#d97706")}
          >
            💤 Rest
          </button>
        </div>
      ) : (
        <div style={styles.gameOver}>
          <div style={styles.gameOverTitle}>Mission Complete! 🚀</div>
          <div style={styles.scoreText}>Exploration Score: {points}</div>
          <div style={styles.scoreText}>Stardust Collected: {stardust} ✨</div>
          <div style={styles.scoreText}>
            Discoveries: {discovered.length}/{spacePhenomena.length}
          </div>
          <button onClick={resetGame} style={styles.restartButton}>
            New Mission 🛸
          </button>
        </div>
      )}

      <div style={styles.highScore}>High Score: {highScore}</div>
    </div>
  );
};

export default SpaceExplorerGame;
