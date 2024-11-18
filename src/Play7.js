import React, { useState, useEffect, useCallback } from "react";
import { Heart, Star, Trophy, ChevronUp } from "lucide-react";

const EmojiPetGame = () => {
  const [pet, setPet] = useState("🐱");
  const [mood, setMood] = useState("happy");
  const [points, setPoints] = useState(0);
  const [coins, setCoins] = useState(0);
  const [action, setAction] = useState("");
  const [combo, setCombo] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [reactions, setReactions] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [moodTimer, setMoodTimer] = useState(null);
  const [challengeTask, setChallengeTask] = useState(null);

  // Define the challenges array
  const challenges = [
    { task: "Get 3 combos in a row", reward: 50, check: (combo) => combo >= 3 },
    { task: "Reach 100% energy", reward: 30, check: (energy) => energy >= 100 },
    {
      task: "Keep pet happy for 10 seconds",
      reward: 40,
      check: (mood) => mood === "happy",
    },
    {
      task: "Perform 5 actions in 10 seconds",
      reward: 60,
      check: (actionCount) => actionCount >= 5,
    },
  ];

  const moods = {
    happy: ["😺", "😸", "😺"],
    excited: ["🙀", "😺", "😸"],
    sleepy: ["😾", "😿", "😺"],
    hungry: ["😿", "😾", "😺"],
  };

  const animations = {
    jump: "animate-bounce",
    spin: "animate-spin",
    dance: "animate-pulse",
    wave: "animate-bounce",
  };

  // Add game logic functions
  const addReaction = (emoji, points) => {
    const newReaction = {
      id: Date.now(),
      emoji,
      points,
      top: Math.random() * 50 + 25,
      left: Math.random() * 50 + 25,
    };
    setReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 1000);
  };

  const performAction = (actionType) => {
    if (!gameActive || energy <= 0) return;

    setAction(actionType);
    setTimeout(() => setAction(""), 1000);

    let pointsEarned = 10;
    let energyChange = -10;
    let moodChange = "happy";

    switch (actionType) {
      case "feed":
        if (mood === "hungry") {
          pointsEarned *= 2;
          setCombo((prev) => prev + 1);
        } else {
          setCombo(0);
        }
        energyChange = 20;
        break;
      case "play":
        if (mood === "excited") {
          pointsEarned *= 2;
          setCombo((prev) => prev + 1);
        } else {
          setCombo(0);
        }
        moodChange = "excited";
        break;
      case "sleep":
        if (mood === "sleepy") {
          pointsEarned *= 2;
          setCombo((prev) => prev + 1);
        } else {
          setCombo(0);
        }
        energyChange = 30;
        moodChange = "happy";
        break;
      default:
        break;
    }

    // Apply combo multiplier
    if (combo > 0) {
      pointsEarned *= combo + 1;
    }

    setPoints((prev) => prev + pointsEarned);
    setCoins((prev) => prev + Math.floor(pointsEarned / 10));
    setEnergy((prev) => Math.min(100, Math.max(0, prev + energyChange)));
    setMood(moodChange);
    addReaction("✨", pointsEarned);

    // Check challenge completion
    if (challengeTask) {
      const challenge = challenges.find((c) => c.task === challengeTask.task);
      if (challenge && challenge.check(combo)) {
        setPoints((prev) => prev + challenge.reward);
        addReaction("🏆", challenge.reward);
        setChallengeTask(null);
      }
    }
  };

  const resetGame = () => {
    setPoints(0);
    setCoins(0);
    setCombo(0);
    setEnergy(100);
    setMood("happy");
    setTimeLeft(60);
    setIsGameOver(false);
    setGameActive(true);
    setChallengeTask(null);
    setReactions([]);
  };

  // Game timer
  useEffect(() => {
    if (!gameActive || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsGameOver(true);
          setGameActive(false);
          setHighScore((prev) => Math.max(prev, points));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, isGameOver, points]);

  // Challenge generator
  useEffect(() => {
    if (!gameActive || isGameOver) return;

    const challengeTimer = setInterval(() => {
      if (Math.random() < 0.3 && !challengeTask) {
        const newChallenge =
          challenges[Math.floor(Math.random() * challenges.length)];
        setChallengeTask(newChallenge);
      }
    }, 5000);

    return () => clearInterval(challengeTimer);
  }, [gameActive, isGameOver, challengeTask]);

  // Mood changer
  useEffect(() => {
    if (!gameActive || isGameOver) return;

    const moodInterval = setInterval(() => {
      const moodChance = Math.random();
      if (moodChance < 0.3) {
        setMood("hungry");
      } else if (moodChance < 0.6) {
        setMood("sleepy");
      }
    }, 3000);

    return () => clearInterval(moodInterval);
  }, [gameActive, isGameOver]);

  // Rest of your JSX remains the same
  return (
    <div className="game-container">
      <div className="stats">
        <div className="stats-row">
          <div className="stat-item">
            <Trophy className="trophy" />
            <span>{points}</span>
          </div>
          <div className="stat-item">
            <span className="coin">🪙</span>
            <span>{coins}</span>
          </div>
          <div className="stat-item">
            <span className="timer">⏰ {timeLeft}s</span>
          </div>
        </div>

        <div className="energy-bar">
          <div className="energy-fill" style={{ width: `${energy}%` }} />
        </div>

        {challengeTask && (
          <div className="challenge">
            Challenge: {challengeTask.task} (Reward: {challengeTask.reward}pts)
          </div>
        )}

        {combo > 1 && <div className="combo">Combo x{combo} 🔥</div>}
      </div>

      <div className="pet-container">
        <div className={`pet ${action && animations[action]}`}>
          {moods[mood][Math.floor(Math.random() * moods[mood].length)]}
        </div>
        {reactions.map((reaction) => (
          <div
            key={reaction.id}
            className="reaction"
            style={{
              top: `${reaction.top}%`,
              left: `${reaction.left}%`,
            }}
          >
            {reaction.emoji}
            {reaction.points && (
              <span className="points">+{reaction.points}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mood">
        Mood: {mood.charAt(0).toUpperCase() + mood.slice(1)}
      </div>

      {!isGameOver ? (
        <div className="buttons">
          <button
            onClick={() => performAction("feed")}
            className="button feed"
            disabled={!gameActive}
          >
            🍖 Feed
          </button>
          <button
            onClick={() => performAction("play")}
            className="button play"
            disabled={!gameActive}
          >
            🎈 Play
          </button>
          <button
            onClick={() => performAction("sleep")}
            className="button sleep"
            disabled={!gameActive}
          >
            💤 Sleep
          </button>
        </div>
      ) : (
        <div className="game-over">
          <div className="title">Game Over! 🎮</div>
          <div className="score">Final Score: {points}</div>
          <div className="coins">Coins Earned: {coins} 🪙</div>
          <button onClick={resetGame} className="button reset">
            Play Again 🔄
          </button>
        </div>
      )}

      <div className="high-score">High Score: {highScore}</div>

      <style jsx>{`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 1rem;
          background: linear-gradient(to bottom, #e0f2fe, #f3e8ff);
        }

        .stats {
          text-align: center;
          margin-bottom: 1rem;
        }

        .stats-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
        }

        .trophy {
          width: 1.5rem;
          height: 1.5rem;
          color: #eab308;
        }

        .coin {
          font-size: 1.5rem;
        }

        .timer {
          font-size: 0.875rem;
        }

        .energy-bar {
          width: 12rem;
          height: 0.5rem;
          background-color: #e5e7eb;
          border-radius: 9999px;
          margin: 0 auto 0.5rem;
        }

        .energy-fill {
          height: 100%;
          background-color: #22c55e;
          border-radius: 9999px;
          transition: width 0.3s ease;
        }

        .challenge {
          font-size: 0.875rem;
          background-color: #fef9c3;
          padding: 0.5rem;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          animation: pulse 2s infinite;
        }

        .combo {
          font-size: 0.875rem;
          color: #9333ea;
          font-weight: bold;
          animation: pulse 2s infinite;
        }

        .pet-container {
          position: relative;
          width: 16rem;
          height: 16rem;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .pet {
          font-size: 4rem;
        }

        .reaction {
          position: absolute;
          font-size: 1.5rem;
          animation: float 1s ease-out forwards;
        }

        .points {
          font-size: 0.875rem;
        }

        .mood {
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .button {
          padding: 1rem;
          border-radius: 0.5rem;
          color: white;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.3s ease;
        }

        .button:active {
          transform: scale(0.95);
        }

        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .feed {
          background-color: #22c55e;
        }

        .feed:hover {
          background-color: #16a34a;
        }

        .play {
          background-color: #3b82f6;
        }

        .play:hover {
          background-color: #2563eb;
        }

        .sleep {
          background-color: #9333ea;
        }

        .sleep:hover {
          background-color: #7e22ce;
        }

        .game-over {
          text-align: center;
        }

        .title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .score,
        .coins {
          margin-bottom: 0.5rem;
        }

        .reset {
          background-color: #22c55e;
          padding: 0.75rem 1.5rem;
        }

        .reset:hover {
          background-color: #16a34a;
        }

        .high-score {
          margin-top: 2rem;
          font-size: 0.875rem;
          color: #4b5563;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) scale(0.5);
            opacity: 0;
          }
        }

        .bounce {
          animation: bounce 1s infinite;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        .pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default EmojiPetGame;
