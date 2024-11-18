import React, { useState, useEffect } from "react";

const EmojiMysteryManor = () => {
  const [gameState, setGameState] = useState("start");
  const [currentRoom, setCurrentRoom] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [cluesFound, setCluesFound] = useState(0);
  const [message, setMessage] = useState("");
  const [accusation, setAccusation] = useState(null);

  const rooms = [
    { name: "Living Room", emoji: "🛋️", clue: "🔍", suspect: "👨‍👩‍👧‍👦" },
    { name: "Kitchen", emoji: "🍳", clue: "🔪", suspect: "👨‍🍳" },
    { name: "Bedroom", emoji: "🛏️", clue: "💍", suspect: "👵" },
    { name: "Study", emoji: "📚", clue: "📜", suspect: "🧑‍💼" },
    { name: "Garden", emoji: "🌷", clue: "🔧", suspect: "👩‍🌾" },
  ];

  const startGame = () => {
    setGameState("playing");
    setCurrentRoom(null);
    setInventory([]);
    setCluesFound(0);
    setMessage(
      "Welcome to Emoji Mystery Manor! A valuable 💎 has been stolen. Can you solve the case?"
    );
  };

  const enterRoom = (room) => {
    setCurrentRoom(room);
    setMessage(`You are now in the ${room.name} ${room.emoji}`);
  };

  const searchForClues = () => {
    if (currentRoom && !inventory.includes(currentRoom.clue)) {
      setInventory([...inventory, currentRoom.clue]);
      setCluesFound(cluesFound + 1);
      setMessage(`You found a clue: ${currentRoom.clue}`);
    } else {
      setMessage("No new clues found in this room.");
    }
  };

  const interviewSuspect = () => {
    if (currentRoom) {
      setMessage(
        `You interview the suspect ${currentRoom.suspect}. They seem nervous...`
      );
    } else {
      setMessage("There's no one to interview here.");
    }
  };

  const makeAccusation = (suspect) => {
    setAccusation(suspect);
    if (suspect === "👨‍🍳" && cluesFound >= 4) {
      setGameState("won");
      setMessage(
        "Congratulations! You solved the case! The chef 👨‍🍳 was the culprit!"
      );
    } else {
      setGameState("lost");
      setMessage("Your accusation was incorrect. The real culprit got away!");
    }
  };

  const renderRooms = () => {
    return rooms.map((room, index) => (
      <button
        key={index}
        onClick={() => enterRoom(room)}
        style={{ margin: "0.5rem", fontSize: "2rem", cursor: "pointer" }}
      >
        {room.emoji}
      </button>
    ));
  };

  const renderGameContent = () => {
    switch (gameState) {
      case "start":
        return (
          <div>
            <p>
              Welcome to Emoji Mystery Manor! Are you ready to solve a mystery?
            </p>
            <button
              onClick={startGame}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Start Investigation 🕵️
            </button>
          </div>
        );
      case "playing":
        return (
          <div>
            <p>{message}</p>
            <div style={{ margin: "1rem 0" }}>
              <p>Rooms:</p>
              {renderRooms()}
            </div>
            <div style={{ margin: "1rem 0" }}>
              <p>
                Current Room:{" "}
                {currentRoom
                  ? `${currentRoom.name} ${currentRoom.emoji}`
                  : "Not in a room"}
              </p>
              <button
                onClick={searchForClues}
                style={{
                  margin: "0.5rem",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Search for Clues 🔍
              </button>
              <button
                onClick={interviewSuspect}
                style={{
                  margin: "0.5rem",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Interview Suspect 🗣️
              </button>
            </div>
            <div style={{ margin: "1rem 0" }}>
              <p>Inventory: {inventory.join(" ")}</p>
              <p>Clues Found: {cluesFound}/5</p>
            </div>
            <div style={{ margin: "1rem 0" }}>
              <p>Make an Accusation:</p>
              {rooms.map((room, index) => (
                <button
                  key={index}
                  onClick={() => makeAccusation(room.suspect)}
                  style={{
                    margin: "0.5rem",
                    fontSize: "2rem",
                    cursor: "pointer",
                  }}
                >
                  {room.suspect}
                </button>
              ))}
            </div>
          </div>
        );
      case "won":
      case "lost":
        return (
          <div>
            <p>{message}</p>
            <button
              onClick={startGame}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Play Again 🔄
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="game-container"
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h1>Emoji Mystery Manor 🏚️🕵️</h1>
      {renderGameContent()}
    </div>
  );
};

export default EmojiMysteryManor;
