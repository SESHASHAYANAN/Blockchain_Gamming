import React, { useState, useEffect } from "react";

const EmojiEcosystemEvolution = () => {
  const [gameState, setGameState] = useState("start");
  const [ecosystem, setEcosystem] = useState({});
  const [resources, setResources] = useState({
    water: 50,
    nutrients: 50,
    sunlight: 50,
  });
  const [turn, setTurn] = useState(0);
  const [message, setMessage] = useState("");

  const organisms = {
    "🌱": {
      name: "Seedling",
      cost: { water: 10, nutrients: 5, sunlight: 5 },
      produces: { oxygen: 1 },
    },
    "🌿": {
      name: "Herb",
      cost: { water: 15, nutrients: 10, sunlight: 10 },
      produces: { oxygen: 2 },
    },
    "🌳": {
      name: "Tree",
      cost: { water: 25, nutrients: 20, sunlight: 15 },
      produces: { oxygen: 5 },
    },
    "🐛": {
      name: "Caterpillar",
      cost: { water: 5, nutrients: 10 },
      consumes: { "🌱": 1 },
      produces: { nutrients: 2 },
    },
    "🐝": {
      name: "Bee",
      cost: { water: 10, nutrients: 15 },
      helps: ["🌱", "🌿", "🌳"],
      produces: { nutrients: 3 },
    },
    "🦋": {
      name: "Butterfly",
      cost: { water: 15, nutrients: 20 },
      helps: ["🌱", "🌿", "🌳"],
      produces: { nutrients: 4 },
    },
  };

  const startGame = () => {
    setGameState("playing");
    setEcosystem({});
    setResources({ water: 50, nutrients: 50, sunlight: 50 });
    setTurn(0);
    setMessage(
      "Welcome to Emoji Ecosystem Evolution! Build a thriving ecosystem."
    );
  };

  const addOrganism = (emoji) => {
    const organism = organisms[emoji];
    if (canAfford(organism.cost)) {
      setEcosystem({ ...ecosystem, [emoji]: (ecosystem[emoji] || 0) + 1 });
      deductResources(organism.cost);
      setMessage(`Added ${organism.name} to your ecosystem!`);
    } else {
      setMessage(`Not enough resources to add ${organism.name}.`);
    }
  };

  const canAfford = (cost) => {
    return Object.entries(cost).every(
      ([resource, amount]) => resources[resource] >= amount
    );
  };

  const deductResources = (cost) => {
    const newResources = { ...resources };
    Object.entries(cost).forEach(([resource, amount]) => {
      newResources[resource] -= amount;
    });
    setResources(newResources);
  };

  const nextTurn = () => {
    setTurn(turn + 1);
    updateResources();
    checkWinCondition();
  };

  const updateResources = () => {
    const newResources = {
      ...resources,
      water: resources.water + 10,
      sunlight: resources.sunlight + 10,
    };
    Object.entries(ecosystem).forEach(([emoji, count]) => {
      const organism = organisms[emoji];
      if (organism.produces) {
        Object.entries(organism.produces).forEach(([resource, amount]) => {
          newResources[resource] =
            (newResources[resource] || 0) + amount * count;
        });
      }
      if (organism.consumes) {
        Object.entries(organism.consumes).forEach(([consumedEmoji, amount]) => {
          if (ecosystem[consumedEmoji] >= amount * count) {
            setEcosystem((prev) => ({
              ...prev,
              [consumedEmoji]: prev[consumedEmoji] - amount * count,
            }));
          }
        });
      }
      if (organism.helps) {
        organism.helps.forEach((helpedEmoji) => {
          if (ecosystem[helpedEmoji]) {
            newResources.nutrients += count;
          }
        });
      }
    });
    setResources(newResources);
  };

  const checkWinCondition = () => {
    if (
      ecosystem["🌱"] >= 5 &&
      ecosystem["🌿"] >= 3 &&
      ecosystem["🌳"] >= 2 &&
      ecosystem["🐛"] >= 3 &&
      ecosystem["🐝"] >= 2 &&
      ecosystem["🦋"] >= 1
    ) {
      setGameState("won");
      setMessage(
        "Congratulations! You've created a thriving and balanced ecosystem!"
      );
    } else if (turn >= 30) {
      setGameState("lost");
      setMessage("Your ecosystem couldn't sustain itself. Try again!");
    }
  };

  const renderOrganisms = () => {
    return Object.keys(organisms).map((emoji) => (
      <button
        key={emoji}
        onClick={() => addOrganism(emoji)}
        style={{ margin: "0.5rem", fontSize: "2rem", cursor: "pointer" }}
      >
        {emoji} {ecosystem[emoji] || 0}
      </button>
    ));
  };

  const renderResources = () => {
    return Object.entries(resources).map(([resource, amount]) => (
      <span key={resource} style={{ margin: "0.5rem" }}>
        {resource}: {amount}
      </span>
    ));
  };

  const renderGameContent = () => {
    switch (gameState) {
      case "start":
        return (
          <div>
            <p>
              Welcome to Emoji Ecosystem Evolution! Build a thriving ecosystem
              balance.
            </p>
            <button
              onClick={startGame}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Start Evolution 🌍
            </button>
          </div>
        );
      case "playing":
        return (
          <div>
            <p>{message}</p>
            <div style={{ margin: "1rem 0" }}>
              <p>Ecosystem:</p>
              {renderOrganisms()}
            </div>
            <div style={{ margin: "1rem 0" }}>
              <p>Resources:</p>
              {renderResources()}
            </div>
            <p>Turn: {turn}/30</p>
            <button
              onClick={nextTurn}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Next Turn ⏭️
            </button>
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
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h1>Emoji Ecosystem Evolution 🌍🌱🐝</h1>
      {renderGameContent()}
    </div>
  );
};

export default EmojiEcosystemEvolution;
