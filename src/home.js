// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
// } from "react-router-dom";
// import SandA from "./SandA";
// import Scart from "./Scart";
// import Checkout from "./Checkout";
// import First from "./App";
// import Cart from "./Cart";
// import Rcard from "./Rcard";
// import Gameacc from "./Gameacc";
// import Cust from "./Cust";

// const ProductList = ({ products }) => {
//   const navigate = useNavigate();

//   const inlineStyles = {
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
//       marginBottom: "30px",
//       fontWeight: "bold",
//       textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
//       letterSpacing: "2px",
//       fontFamily: "'Montserrat', sans-serif",
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
//     },
//   };

//   const handleProductClick = (product) => {
//     if (product.id === 3) {
//       navigate("/SandA");
//     } else if (product.id === 1) {
//       navigate("/first");
//     } else if (product.id === 4) {
//       navigate("/roomcards");
//     } else if (product.id === 5) {
//       navigate("/customweapons");
//     } else if (product.id === 6) {
//       navigate("/gameaccounts");
//     } else if (product.id === 2) {
//       navigate("/inhouse");
//     }
//   };

//   return (
//     <div style={inlineStyles.container}>
//       <div style={inlineStyles.logoContainer}>
//         <h1 style={inlineStyles.title}>Durger King</h1>
//         <h2 style={inlineStyles.tp}>Select our wide range of Game Services.</h2>
//       </div>
//       <div style={inlineStyles.productContainer}>
//         {products && products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               style={inlineStyles.productBox}
//               onClick={() => handleProductClick(product)}
//             >
//               <span style={{ fontSize: "40px" }}>{product.icon}</span>
//               <h3>
//                 {product.name} • ${product.price.toFixed(2)}
//               </h3>
//               <p style={{ fontSize: "14px", color: "#ffcc00" }}>
//                 {product.description}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p>No products available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [cart, setCart] = useState({});

//   const products = [
//     {
//       id: 1,
//       name: "Game Bet",
//       price: 1,
//       icon: "🎮",
//       type: "buy",
//       description: "Place your bets on exciting game matches.",
//     },
//     {
//       id: 2,
//       name: "In House Games",
//       price: 4.99,
//       icon: "🏠",
//       type: "add",
//       description: "Access our exclusive in-house game collection.",
//     },
//     {
//       id: 3,
//       name: "Skin & Avatars",
//       price: 1.49,
//       icon: "👤",
//       type: "add",
//       description: "Customize your in-game appearance.",
//     },
//     {
//       id: 4,
//       name: "Room Cards",
//       price: 3.49,
//       icon: "🃏",
//       type: "add",
//       description: "Get room cards for private game sessions.",
//     },
//     {
//       id: 5,
//       name: "Customized Weapons",
//       price: 3.99,
//       icon: "🔫",
//       type: "add",
//       description: "Upgrade your arsenal with unique weapons.",
//     },
//     {
//       id: 6,
//       name: "Game Account",
//       price: 7.99,
//       icon: "👤",
//       type: "add",
//       description: "Create a premium game account with extra benefits.",
//     },
//   ];

//   const products1 = [
//     {
//       id: 1,
//       name: "Basic Skin Pack",
//       price: 2.99,
//       icon: "🎨",
//       type: "add",
//       description: "A set of basic skins for your character.",
//     },
//     {
//       id: 2,
//       name: "Premium Avatar",
//       price: 5.99,
//       icon: "👑",
//       type: "add",
//       description: "Exclusive premium avatar for your profile.",
//     },
//     {
//       id: 3,
//       name: "Emote Bundle",
//       price: 3.49,
//       icon: "😎",
//       type: "add",
//       description: "A pack of fun emotes to express yourself in-game.",
//     },
//     {
//       id: 4,
//       name: "Weapon Skin",
//       price: 4.99,
//       icon: "🔫",
//       type: "add",
//       description: "Unique skin for your favorite weapon.",
//     },
//     {
//       id: 5,
//       name: "Character Outfit",
//       price: 6.99,
//       icon: "👕",
//       type: "add",
//       description: "Special outfit to make your character stand out.",
//     },
//   ];

//   const roomCardProducts = [
//     {
//       id: 1,
//       name: "Standard Room Card",
//       price: 2.99,
//       icon: "🃏",
//       type: "add",
//       description: "Access to standard game rooms.",
//     },
//     {
//       id: 2,
//       name: "VIP Room Card",
//       price: 7.99,
//       icon: "🎭",
//       type: "add",
//       description: "Access to exclusive VIP game rooms.",
//     },
//     {
//       id: 3,
//       name: "Tournament Room Card",
//       price: 5.99,
//       icon: "🏆",
//       type: "add",
//       description: "Entry to tournament rooms.",
//     },
//     {
//       id: 4,
//       name: "Private Room Card",
//       price: 4.99,
//       icon: "🔐",
//       type: "add",
//       description: "Create your own private game room.",
//     },
//   ];

//   const customWeaponProducts = [
//     {
//       id: 1,
//       name: "Legendary Sword",
//       price: 9.99,
//       icon: "⚔️",
//       type: "add",
//       description: "A powerful customized sword.",
//     },
//     {
//       id: 2,
//       name: "Epic Bow",
//       price: 7.99,
//       icon: "🏹",
//       type: "add",
//       description: "Long-range customized bow.",
//     },
//     {
//       id: 3,
//       name: "Mythic Staff",
//       price: 8.99,
//       icon: "🪄",
//       type: "add",
//       description: "Magic-enhancing customized staff.",
//     },
//     {
//       id: 4,
//       name: "Rare Shield",
//       price: 6.99,
//       icon: "🛡️",
//       type: "add",
//       description: "Durable customized shield.",
//     },
//   ];

//   const gameAccountProducts = [
//     {
//       id: 1,
//       name: "Starter Account",
//       price: 4.99,
//       icon: "🌟",
//       type: "add",
//       description: "Basic game account with starter benefits.",
//     },
//     {
//       id: 2,
//       name: "Pro Account",
//       price: 9.99,
//       icon: "💎",
//       type: "add",
//       description: "Advanced account with pro-level perks.",
//     },
//     {
//       id: 3,
//       name: "Elite Account",
//       price: 14.99,
//       icon: "👑",
//       type: "add",
//       description: "Top-tier account with exclusive features.",
//     },
//   ];

//   const gameBetProducts = [
//     {
//       id: 1,
//       name: "Low Stakes Bet",
//       price: 1.0,
//       icon: "🎲",
//       type: "buy",
//       description: "Place a small bet on your favorite game.",
//     },
//     {
//       id: 2,
//       name: "Medium Stakes Bet",
//       price: 5.0,
//       icon: "💰",
//       type: "buy",
//       description: "Medium risk, medium reward betting option.",
//     },
//     {
//       id: 3,
//       name: "High Stakes Bet",
//       price: 10.0,
//       icon: "🏆",
//       type: "buy",
//       description: "High risk, high reward betting for the daring.",
//     },
//     {
//       id: 4,
//       name: "Tournament Bet",
//       price: 20.0,
//       icon: "🏅",
//       type: "buy",
//       description: "Bet on the outcome of a game tournament.",
//     },
//   ];

//   const inHouseGames = [
//     {
//       id: 1,
//       name: "Pixel Racer",
//       price: 4.99,
//       icon: "🏎️",
//       type: "add",
//       description: "Fast-paced retro racing game.",
//     },
//     {
//       id: 2,
//       name: "Dungeon Crawler",
//       price: 6.99,
//       icon: "🗡️",
//       type: "add",
//       description: "Explore endless dungeons and fight monsters.",
//     },
//     {
//       id: 3,
//       name: "Space Trader",
//       price: 5.99,
//       icon: "🚀",
//       type: "add",
//       description: "Build your galactic trading empire.",
//     },
//     {
//       id: 4,
//       name: "Puzzle Master",
//       price: 3.99,
//       icon: "🧩",
//       type: "add",
//       description: "Challenge your mind with intricate puzzles.",
//     },
//   ];

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ProductList products={products} />} />
//         <Route
//           path="/SandA"
//           element={<SandA cart={cart} setCart={setCart} products={products1} />}
//         />
//         <Route
//           path="/first"
//           element={
//             <First cart={cart} setCart={setCart} products={gameBetProducts} />
//           }
//         />
//         <Route
//           path="/roomcards"
//           element={
//             <Rcard cart={cart} setCart={setCart} products={roomCardProducts} />
//           }
//         />
//         <Route
//           path="/customweapons"
//           element={
//             <Cust
//               cart={cart}
//               setCart={setCart}
//               products={customWeaponProducts}
//             />
//           }
//         />
//         <Route
//           path="/gameaccounts"
//           element={
//             <Gameacc
//               cart={cart}
//               setCart={setCart}
//               products={gameAccountProducts}
//             />
//           }
//         />
//         <Route
//           path="/inhouse"
//           element={
//             <Cust cart={cart} setCart={setCart} products={inHouseGames} />
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <Scart
//               cart={cart}
//               products={[
//                 ...products,
//                 ...products1,
//                 ...roomCardProducts,
//                 ...customWeaponProducts,
//                 ...gameAccountProducts,
//                 ...gameBetProducts,
//                 ...inHouseGames,
//               ]}
//             />
//           }
//         />
//         <Route
//           path="/checkout"
//           element={
//             <Checkout
//               cart={cart}
//               products={[
//                 ...products,
//                 ...products1,
//                 ...roomCardProducts,
//                 ...customWeaponProducts,
//                 ...gameAccountProducts,
//                 ...gameBetProducts,
//                 ...inHouseGames,
//               ]}
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from "react";
import SandA from "./SandA";
import Scart from "./Scart";
import Checkout from "./Checkout";
import First from "./App";
import Cart from "./Cart"; // Ensure this import is correct
import Rcard from "./Rcard";
import Gameacc from "./Gameacc";
import Cust from "./Cust";

const ProductList = ({ products, setView }) => {
  const inlineStyles = {
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

  const handleProductClick = (product) => {
    if (product.id === 3) {
      setView("SandA");
    } else if (product.id === 1) {
      setView("First");
    } else if (product.id === 4) {
      setView("Rcard");
    } else if (product.id === 5) {
      setView("Cust");
    } else if (product.id === 6) {
      setView("Gameacc");
    } else if (product.id === 2) {
      setView("Inhouse");
    } else if (product.id === "cart") {
      setView("Cart");
    }
  };

  return (
    <div style={inlineStyles.container}>
      <div style={inlineStyles.logoContainer}>
        <h1 style={inlineStyles.title}>Durger King</h1>
        <h2 style={inlineStyles.tp}>Select our wide range of Game Services.</h2>
      </div>
      <div style={inlineStyles.productContainer}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              style={inlineStyles.productBox}
              onClick={() => handleProductClick(product)}
            >
              <span style={{ fontSize: "40px" }}>{product.icon}</span>
              <h3>
                {product.name} • ${product.price.toFixed(2)}
              </h3>
              <p style={{ fontSize: "14px", color: "#ffcc00" }}>
                {product.description}
              </p>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState("ProductList");
  const [cart, setCart] = useState({});

  const products = [
    {
      id: 1,
      name: "Game Bet",
      price: 1,
      icon: "🎮",
      type: "buy",
      description: "Place your bets on exciting game matches.",
    },
    {
      id: 2,
      name: "In House Games",
      price: 4.99,
      icon: "🏠",
      type: "add",
      description: "Access our exclusive in-house game collection.",
    },
    {
      id: 3,
      name: "Skin & Avatars",
      price: 1.49,
      icon: "👤",
      type: "add",
      description: "Customize your in-game appearance.",
    },
    {
      id: 4,
      name: "Room Cards",
      price: 3.49,
      icon: "🃏",
      type: "add",
      description: "Get room cards for private game sessions.",
    },
    {
      id: 5,
      name: "Customized Weapons",
      price: 3.99,
      icon: "🔫",
      type: "add",
      description: "Upgrade your arsenal with unique weapons.",
    },
    {
      id: 6,
      name: "Game Account",
      price: 7.99,
      icon: "👤",
      type: "add",
      description: "Create a premium game account with extra benefits.",
    },
    {
      id: "cart",
      name: "Cart",
      price: 0,
      icon: "🛒",
      type: "view",
      description: "View items in your cart.",
    },
  ];

  const renderView = () => {
    switch (view) {
      case "SandA":
        return <SandA cart={cart} setCart={setCart} products={products} />;
      case "First":
        return <First cart={cart} setCart={setCart} products={products} />;
      case "Rcard":
        return <Rcard cart={cart} setCart={setCart} products={products} />;
      case "Cust":
        return <Cust cart={cart} setCart={setCart} products={products} />;
      case "Gameacc":
        return <Gameacc cart={cart} setCart={setCart} products={products} />;
      case "Scart":
        return <Scart cart={cart} setCart={setCart} products={products} />;
      case "Checkout":
        return <Checkout cart={cart} products={products} />;
      case "Cart": // Added this case for loading the Cart component
        return <Cart cart={cart} setCart={setCart} products={products} />;
      default:
        return <ProductList products={products} setView={setView} />;
    }
  };

  return <div>{renderView()}</div>;
};

export default App;
