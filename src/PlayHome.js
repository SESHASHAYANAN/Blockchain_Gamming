import React, { useState } from "react";

const ProductList = ({ products }) => {
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

  return (
    <div style={inlineStyles.container}>
      <div style={inlineStyles.logoContainer}>
        <h1 style={inlineStyles.title}>Durger King</h1>
        <h2 style={inlineStyles.tp}>Select our wide range of Game Services.</h2>
      </div>
      <div style={inlineStyles.productContainer}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={inlineStyles.productBox}>
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

const PlayHome = () => {
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
      id: 7,
      name: "Tournament Entry",
      price: 5.99,
      icon: "🏆",
      type: "add",
      description: "Compete in high-stakes tournaments.",
    },
    {
      id: 8,
      name: "Game Credits",
      price: 9.99,
      icon: "💰",
      type: "buy",
      description: "Buy game credits to enhance your gameplay.",
    },
    {
      id: 9,
      name: "Exclusive Map Packs",
      price: 2.99,
      icon: "🗺️",
      type: "add",
      description: "Unlock exclusive maps for new adventures.",
    },
    {
      id: 10,
      name: "Emotes & Gestures",
      price: 1.99,
      icon: "🙌",
      type: "add",
      description: "Show off with cool emotes during gameplay.",
    },
    {
      id: 11,
      name: "Voice Pack",
      price: 2.49,
      icon: "🎤",
      type: "add",
      description: "Get new voice packs to customize your character.",
    },
    {
      id: 12,
      name: "Special Events Pass",
      price: 6.49,
      icon: "🎫",
      type: "buy",
      description: "Participate in time-limited special events.",
    },
    {
      id: 13,
      name: "Battle Pass",
      price: 10.99,
      icon: "🔥",
      type: "buy",
      description: "Earn exclusive rewards with the battle pass.",
    },
    {
      id: 14,
      name: "Game Merchandise",
      price: 15.99,
      icon: "👕",
      type: "buy",
      description: "Purchase game-themed merchandise.",
    },
    {
      id: 15,
      name: "Loot Crates",
      price: 4.49,
      icon: "📦",
      type: "buy",
      description: "Get random rewards with special loot crates.",
    },
    {
      id: 16,
      name: "VIP Membership",
      price: 19.99,
      icon: "⭐",
      type: "buy",
      description: "Enjoy premium benefits with VIP membership.",
    },
  ];

  return <ProductList products={products} />;
};

export default PlayHome;
