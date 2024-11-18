import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// Importing Components
import Wea from "./Wea"; // Direct import
const Game = lazy(() => import("./Gameacc")); // renamed component import
const BuyTokens = lazy(() => import("./BuyToken"));
const BetHome = lazy(() => import("./BetHome"));

// HomePage component with cards and navigation logic
const HomePage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      maxWidth: "100%",
      margin: "0 auto",
    },
    logoContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      fontSize: "36px",
      color: "#ffcc00",
      marginBottom: "10px",
      fontWeight: "bold",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
      letterSpacing: "2px",
      fontFamily: "'Montserrat', sans-serif",
    },
    tp: {
      fontSize: "24px",
      color: "#000000",
      marginBottom: "30px",
      fontWeight: "bold",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
      letterSpacing: "2px",
      fontFamily: "'Montserrat', sans-serif",
    },
    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      width: "100%",
      maxWidth: "800px",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
      backgroundColor: "#2d2d3a",
      borderRadius: "10px",
      textAlign: "center",
      color: "#fff",
      cursor: "pointer",
    },
    cardIcon: {
      fontSize: "48px",
      marginBottom: "10px",
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    cardDescription: {
      fontSize: "14px",
      color: "#ffcc00",
    },
  };

  const cards = [
    {
      icon: "💰",
      title: "Buy",
      description: "Purchase Using AEON",
      path: "/buy", // Navigate to BuyTokens
    },
    {
      icon: "🎮",
      title: "Play",
      description: "Start playing your favorite games",
      path: "/Game", // Navigate to Play
    },
    {
      icon: " 💸",
      title: "Bet",
      description: "Bet on your Favorite Teams",
      path: "/enter-code", // Navigate to BetHome
    },
    {
      icon: "🏠",
      title: "Marketplace",
      description: "Explore our marketplace",
      path: "/Home", // Navigate to Wea
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <h1 style={styles.title}>ORCA</h1>
        <h2 style={styles.tp}>
          Select our wide range of Game And Game Services.
        </h2>
      </div>
      <div style={styles.cardContainer}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(card.path)}
          >
            <span style={styles.cardIcon}>{card.icon}</span>
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component with Routing
const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/buy" element={<BuyTokens />} />
          <Route path="/enter-code" element={<BetHome />} />
          <Route path="/Home" element={<Wea />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
