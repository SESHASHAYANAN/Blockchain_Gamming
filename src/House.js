import React from "react";
import { useNavigate } from "react-router-dom";

const House = ({ cart, setCart, products }) => {
  const navigate = useNavigate();

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
    button: {
      padding: "5px 10px",
      margin: "5px",
      backgroundColor: "#ffcc00",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      color: "#000",
    },
    quantityButton: {
      padding: "3px 8px",
      margin: "3px",
      backgroundColor: "#ffcc00",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "12px",
      color: "#000",
    },
    orderButton: {
      marginTop: "20px",
      padding: "15px 30px",
      backgroundColor: "#28a745",
      borderRadius: "10px",
      border: "none",
      color: "#fff",
      fontSize: "18px",
      cursor: "pointer",
    },
  };

  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id] > 1) updatedCart[id] -= 1;
      else delete updatedCart[id];
      return updatedCart;
    });
  };

  return (
    <div style={inlineStyles.container}>
      <div style={inlineStyles.logoContainer}>
        <h1 style={inlineStyles.title}>Durger King</h1>
        <h2 style={inlineStyles.tp}>
          Select from our Skins & Avatars collection.
        </h2>
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
              {cart[product.id] ? (
                <div>
                  <button
                    style={inlineStyles.quantityButton}
                    onClick={() => removeFromCart(product.id)}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "20px" }}>{cart[product.id]}</span>
                  <button
                    style={inlineStyles.quantityButton}
                    onClick={() => addToCart(product.id)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  style={inlineStyles.button}
                  onClick={() => addToCart(product.id)}
                >
                  {product.type === "buy" ? "BUY" : "ADD"}
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <button
        style={inlineStyles.orderButton}
        onClick={() => navigate("/cart")}
      >
        VIEW ORDER
      </button>
    </div>
  );
};

export default House;
