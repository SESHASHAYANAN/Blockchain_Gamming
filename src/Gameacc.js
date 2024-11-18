// import React, { lazy, Suspense, useState, useEffect } from "react";

// // Lazy load each Play component (keeping your existing imports)
// const playComponents = [
//   lazy(() => import("./Play")),
//   lazy(() => import("./Play2")),
//   lazy(() => import("./Play3")),
//   lazy(() => import("./Play4")),
//   lazy(() => import("./Play5")),
//   lazy(() => import("./Play6")),
//   lazy(() => import("./Play7")),
//   lazy(() => import("./Play8")),
//   lazy(() => import("./Play9")),
//   lazy(() => import("./Play10")),
//   lazy(() => import("./Play11")),
//   lazy(() => import("./Play12")),
//   lazy(() => import("./Play13")),
//   lazy(() => import("./Play14")),
//   lazy(() => import("./Play15")),
//   lazy(() => import("./Play16")),
// ];

// const products = [
//   {
//     id: 1,
//     name: "Alien Invasion",
//     price: 1,
//     icon: "🚀",
//     description: "Alien Rocket: Blast off to an intergalactic adventure!",
//   },
//   {
//     id: 2,
//     name: "Kill Flying",
//     price: 4.99,
//     icon: "😈",
//     description: "Take aim, conquer the skies!",
//   },
//   {
//     id: 3,
//     name: "Emoji Space Odyssey",
//     price: 1.49,
//     icon: "👤",
//     description: "Defend the galaxy with emojis!",
//   },
//   {
//     id: 4,
//     name: "Room Cards",
//     price: 3.49,
//     icon: "🕵️",
//     description: "Are you ready to solve a mystery?",
//   },
//   {
//     id: 5,
//     name: "Emoji Mystery Manor",
//     price: 3.99,
//     icon: "🔫",
//     description: "Upgrade your arsenal with unique weapons.",
//   },
//   {
//     id: 6,
//     name: "Ecosystem Evolution",
//     price: 7.99,
//     icon: "🌍",
//     description: "Build a thriving ecosystem balance.",
//   },
//   {
//     id: 7,
//     name: "Cattyyy",
//     price: 5.99,
//     icon: "😸",
//     description: "Play and take care of Cattyyy",
//   },
//   {
//     id: 8,
//     name: "Alien Odyssey",
//     price: 9.99,
//     icon: " 👾",
//     description: "The Aliens Are Invading",
//   },
//   {
//     id: 9,
//     name: "Odyssey Trip",
//     price: 2.99,
//     icon: "👽",
//     description: "Unlock space for new adventures.",
//   },
//   {
//     id: 10,
//     name: "Bikerrrr",
//     price: 1.99,
//     icon: "🚲",
//     description: "Show off with cool bike stunt during gameplay.",
//   },
//   {
//     id: 11,
//     name: "XO",
//     price: 2.49,
//     icon: "😵‍💫",
//     description: "Play XOXO.",
//   },
//   {
//     id: 12,
//     name: "Battle Royal",
//     price: 6.49,
//     icon: "⚔️",
//     description: "Beat ur friends and conquer",
//   },
//   {
//     id: 13,
//     name: "Battle",
//     price: 10.99,
//     icon: "🏴‍☠️",
//     description: "Find the treasure.",
//   },
//   {
//     id: 14,
//     name: "Jungle Safari Adventure",
//     price: 15.99,
//     icon: "🐾",
//     description: "The Jungle is yours",
//   },
//   {
//     id: 15,
//     name: "Galactic Space Race",
//     price: 4.49,
//     icon: " 🌌",
//     description: "Get random rewards with special loot crates.",
//   },
//   {
//     id: 16,
//     name: "Treasure Island Quest",
//     price: 19.99,
//     icon: "🏝️",
//     description: "Enjoy Treasure Island Quest.",
//   },
// ];

// // ProductList component
// const ProductList = ({ onSelect, totalEarnings }) => {
//   const styles = {
//     container: {
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: "10px",
//       maxWidth: "100%",
//       margin: "0 auto",
//     },
//     logoContainer: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     title: {
//       fontSize: "36px",
//       color: "#ffcc00",
//       marginBottom: "10px",
//       fontWeight: "bold",
//       textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
//       letterSpacing: "2px",
//       fontFamily: "'Montserrat', sans-serif",
//     },
//     tp: {
//       fontSize: "24px",
//       color: "#000000",
//       marginBottom: "10px",
//       fontWeight: "bold",
//       textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
//       letterSpacing: "2px",
//       fontFamily: "'Montserrat', sans-serif",
//     },
//     earnings: {
//       fontSize: "20px",
//       color: "#ffcc00",
//       marginBottom: "20px",
//       fontWeight: "bold",
//       textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
//       letterSpacing: "2px",
//       fontFamily: "'Montserrat', sans-serif",
//       padding: "10px",
//       backgroundColor: "rgba(0, 0, 0, 0.2)",
//       borderRadius: "10px",
//     },
//     productContainer: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
//       gap: "10px",
//       width: "100%",
//     },
//     productBox: {
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: "15px",
//       backgroundColor: "#2d2d3a",
//       borderRadius: "10px",
//       textAlign: "center",
//       color: "#fff",
//       cursor: "pointer",
//       transition: "transform 0.2s",
//       "&:hover": {
//         transform: "scale(1.05)",
//       },
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.logoContainer}>
//         <h1 style={styles.title}>EMPEROR CASTLE </h1>
//         <h2 style={styles.tp}>Play Single and Multiplayer Games.</h2>
//         <div style={styles.earnings}>
//           💰 Total Earnings: ${totalEarnings.toFixed(2)}
//         </div>
//       </div>
//       <div style={styles.productContainer}>
//         {products.map((product) => (
//           <div
//             key={product.id}
//             style={styles.productBox}
//             onClick={() => onSelect(product.id)}
//           >
//             <span style={{ fontSize: "40px" }}>{product.icon}</span>
//             <h3>
//               {product.name} • ${product.price.toFixed(2)}
//             </h3>
//             <p style={{ fontSize: "14px", color: "#ffcc00" }}>
//               {product.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Main App Component without Routing
// const App = () => {
//   const [selectedPlay, setSelectedPlay] = useState(null);
//   const [totalEarnings, setTotalEarnings] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     let timer;

//     if (selectedPlay !== null && !isPlaying) {
//       setIsPlaying(true);
//       console.log("Game started:", products[selectedPlay].name);

//       timer = setTimeout(() => {
//         const gamePrice = products[selectedPlay].price;
//         setTotalEarnings((prevEarnings) => {
//           const newEarnings = prevEarnings + gamePrice;
//           console.log(
//             `Adding ${gamePrice} to earnings. New total: ${newEarnings}`
//           );
//           return newEarnings;
//         });
//       }, 60000); // 60000 ms = 1 minute

//       console.log("Timer started for:", products[selectedPlay].name);
//     }

//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//         console.log("Timer cleared");
//       }
//     };
//   }, [selectedPlay, isPlaying]);

//   const handleSelectProduct = (id) => {
//     setSelectedPlay(id - 1);
//     setIsPlaying(false); // Reset playing state for new game
//     console.log("Selected product:", products[id - 1].name);
//   };

//   const handleBack = () => {
//     setSelectedPlay(null);
//     setIsPlaying(false);
//     console.log("Returned to menu");
//   };

//   // Add styles for the back button
//   const backButtonStyle = {
//     padding: "10px 20px",
//     fontSize: "16px",
//     backgroundColor: "#ffcc00",
//     color: "#2d2d3a",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     margin: "10px",
//     fontWeight: "bold",
//     transition: "background-color 0.3s",
//     "&:hover": {
//       backgroundColor: "#ffd700",
//     },
//   };

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       {selectedPlay === null ? (
//         <ProductList
//           onSelect={handleSelectProduct}
//           totalEarnings={totalEarnings}
//         />
//       ) : (
//         <div>
//           <button style={backButtonStyle} onClick={handleBack}>
//             Back to Games
//           </button>
//           {React.createElement(playComponents[selectedPlay])}
//         </div>
//       )}
//     </Suspense>
//   );
// };

// export default App;
import React, { lazy, Suspense, useState, useEffect } from "react";

// Lazy load components remain the same
const playComponents = [
  lazy(() => import("./Play")),
  lazy(() => import("./Play2")),
  lazy(() => import("./Play3")),
  lazy(() => import("./Play4")),
  lazy(() => import("./Play5")),
  lazy(() => import("./Play6")),
  lazy(() => import("./Play7")),
  lazy(() => import("./Play8")),
  lazy(() => import("./Play9")),
  lazy(() => import("./Play10")),
  lazy(() => import("./Play11")),
  lazy(() => import("./Play12")),
  lazy(() => import("./Play13")),
  lazy(() => import("./Play14")),
  lazy(() => import("./Play15")),
  lazy(() => import("./Play16")),
];

// Products array remains the same
const products = [
  {
    id: 1,
    name: "Alien Invasion",
    price: 1,
    icon: "🚀",
    description: "Alien Rocket: Blast off to an intergalactic adventure!",
  },
  {
    id: 2,
    name: "Kill Flying",
    price: 4.99,
    icon: "😈",
    description: "Take aim, conquer the skies!",
  },
  {
    id: 3,
    name: "Emoji Space Odyssey",
    price: 1.49,
    icon: "👤",
    description: "Defend the galaxy with emojis!",
  },
  {
    id: 4,
    name: "Room Cards",
    price: 3.49,
    icon: "🕵️",
    description: "Are you ready to solve a mystery?",
  },
  {
    id: 5,
    name: "Emoji Mystery Manor",
    price: 3.99,
    icon: "🔫",
    description: "Upgrade your arsenal with unique weapons.",
  },
  {
    id: 6,
    name: "Ecosystem Evolution",
    price: 7.99,
    icon: "🌍",
    description: "Build a thriving ecosystem balance.",
  },
  {
    id: 7,
    name: "Cattyyy",
    price: 5.99,
    icon: "😸",
    description: "Play and take care of Cattyyy",
  },
  {
    id: 8,
    name: "Alien Odyssey",
    price: 9.99,
    icon: " 👾",
    description: "The Aliens Are Invading",
  },
  {
    id: 9,
    name: "Odyssey Trip",
    price: 2.99,
    icon: "👽",
    description: "Unlock space for new adventures.",
  },
  {
    id: 10,
    name: "Bikerrrr",
    price: 1.99,
    icon: "🚲",
    description: "Show off with cool bike stunt during gameplay.",
  },
  {
    id: 11,
    name: "XO",
    price: 2.49,
    icon: "😵‍💫",
    description: "Play XOXO.",
  },
  {
    id: 12,
    name: "Battle Royal",
    price: 6.49,
    icon: "⚔️",
    description: "Beat ur friends and conquer",
  },
  {
    id: 13,
    name: "Battle",
    price: 10.99,
    icon: "🏴‍☠️",
    description: "Find the treasure.",
  },
  {
    id: 14,
    name: "Jungle Safari Adventure",
    price: 15.99,
    icon: "🐾",
    description: "The Jungle is yours",
  },
  {
    id: 15,
    name: "Galactic Space Race",
    price: 4.49,
    icon: " 🌌",
    description: "Get random rewards with special loot crates.",
  },
  {
    id: 16,
    name: "Treasure Island Quest",
    price: 19.99,
    icon: "🏝️",
    description: "Enjoy Treasure Island Quest.",
  },
];

// Game component
const Game = ({ gameIndex, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds = 1 minute
  const [moneyEarned, setMoneyEarned] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1 && !moneyEarned) {
          setMoneyEarned(true);
          onBack(products[gameIndex].price); // Pass earned money back
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameIndex, moneyEarned, onBack]);

  return (
    <div>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#ffcc00",
          color: "#2d2d3a",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "10px",
          fontWeight: "bold",
        }}
        onClick={() => onBack(0)}
      >
        Back to Games
      </button>
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "10px",
          backgroundColor: "#ffcc00",
          borderRadius: "5px",
          color: "#2d2d3a",
          fontWeight: "bold",
        }}
      >
        Time left: {timeLeft}s
      </div>
      {React.createElement(playComponents[gameIndex])}
    </div>
  );
};

// ProductList component remains mostly the same
const ProductList = ({ onSelect, totalEarnings }) => {
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
      marginBottom: "10px",
      fontWeight: "bold",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
      letterSpacing: "2px",
      fontFamily: "'Montserrat', sans-serif",
    },
    earnings: {
      fontSize: "20px",
      color: "#ffcc00",
      marginBottom: "20px",
      fontWeight: "bold",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
      letterSpacing: "2px",
      fontFamily: "'Montserrat', sans-serif",
      padding: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
    },
    productContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
      gap: "10px",
      width: "100%",
    },
    productBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "15px",
      backgroundColor: "#2d2d3a",
      borderRadius: "10px",
      textAlign: "center",
      color: "#fff",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <h1 style={styles.title}>EMPEROR CASTLE </h1>
        <h2 style={styles.tp}>Play Single and Multiplayer Games.</h2>
        <div style={styles.earnings}>
          💰 Total Earnings: ${totalEarnings.toFixed(2)}
        </div>
      </div>
      <div style={styles.productContainer}>
        {products.map((product) => (
          <div
            key={product.id}
            style={styles.productBox}
            onClick={() => onSelect(product.id)}
          >
            <span style={{ fontSize: "40px" }}>{product.icon}</span>
            <h3>
              {product.name} • ${product.price.toFixed(2)}
            </h3>
            <p style={{ fontSize: "14px", color: "#ffcc00" }}>
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [selectedPlay, setSelectedPlay] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const handleSelectProduct = (id) => {
    setSelectedPlay(id - 1);
  };

  const handleBack = (earnedAmount) => {
    if (earnedAmount > 0) {
      setTotalEarnings((prev) => prev + earnedAmount);
    }
    setSelectedPlay(null);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {selectedPlay === null ? (
        <ProductList
          onSelect={handleSelectProduct}
          totalEarnings={totalEarnings}
        />
      ) : (
        <Game gameIndex={selectedPlay} onBack={handleBack} />
      )}
    </Suspense>
  );
};

export default App;
