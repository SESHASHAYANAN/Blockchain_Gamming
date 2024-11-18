import React, { useState, useEffect } from "react";

const emojiSet = [
  "😊",
  "😊",
  "😎",
  "😎",
  "🐶",
  "🐶",
  "🍕",
  "🍕",
  "🎮",
  "🎮",
  "🚗",
  "🚗",
];

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

const Game = () => {
  const [shuffledEmojis, setShuffledEmojis] = useState(
    shuffleArray([...emojiSet])
  );
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (matchedCards.length === emojiSet.length) {
      alert(`You've completed level ${level}! Moving to the next level.`);
      setLevel(level + 1);
      resetGame();
    }
  }, [matchedCards, level]);

  const handleCardClick = (index) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      if (
        shuffledEmojis[newFlippedCards[0]] ===
        shuffledEmojis[newFlippedCards[1]]
      ) {
        setMatchedCards([...matchedCards, ...newFlippedCards]);
        setPoints(points + 10);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const resetGame = () => {
    setShuffledEmojis(shuffleArray([...emojiSet]));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setPoints(points + 50); // Bonus for completing level
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Emoji Memory Game</h1>
      <p style={styles.points}>Points: {points}</p>
      <p style={styles.level}>Level: {level}</p>
      <p style={styles.moves}>Moves: {moves}</p>
      <div style={styles.grid}>
        {shuffledEmojis.map((emoji, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              backgroundColor:
                flippedCards.includes(index) || matchedCards.includes(index)
                  ? "#fff"
                  : "#ccc",
            }}
            onClick={() => handleCardClick(index)}
          >
            {(flippedCards.includes(index) || matchedCards.includes(index)) &&
              emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  header: {
    fontSize: "2em",
    marginBottom: "20px",
    color: "#333",
  },
  points: {
    fontSize: "1.2em",
    margin: "10px 0",
  },
  level: {
    fontSize: "1.2em",
    margin: "10px 0",
  },
  moves: {
    fontSize: "1.2em",
    margin: "10px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 100px)",
    gridGap: "10px",
  },
  card: {
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5em",
    cursor: "pointer",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s ease",
  },
};

export default Game;
