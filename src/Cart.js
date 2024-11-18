import React from "react";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, products }) => {
  const navigate = useNavigate(); // Hook is used here, at the top of the component
  const cartItems = cart || {};
  const totalPrice = Object.keys(cartItems).reduce((acc, id) => {
    const product = products.find((p) => p.id === parseInt(id));
    return acc + cartItems[id] * product.price;
  }, 0);

  const inlineStyles = {
    container: {
      padding: "20px",
      backgroundColor: "#1c1c28",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    productRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #555",
    },
    productInfo: {
      display: "flex",
      alignItems: "center",
    },
    productIcon: {
      fontSize: "40px",
      marginRight: "10px",
    },
    productName: {
      fontSize: "18px",
    },
    productPrice: {
      fontSize: "18px",
    },
    payButton: {
      padding: "15px",
      backgroundColor: "#28a745",
      color: "#fff",
      fontSize: "20px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      width: "100%",
      textAlign: "center",
    },
  };

  return (
    <div style={inlineStyles.container}>
      <div>
        <h2 style={inlineStyles.title}>Your Order</h2>
        {Object.keys(cartItems).map((id) => {
          const product = products.find((p) => p.id === parseInt(id));
          return (
            <div key={id} style={inlineStyles.productRow}>
              <div style={inlineStyles.productInfo}>
                <span style={inlineStyles.productIcon}>{product.icon}</span>
                <span style={inlineStyles.productName}>
                  {product.name} x {cartItems[id]}
                </span>
              </div>
              <span style={inlineStyles.productPrice}>
                ${(product.price * cartItems[id]).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button
          style={inlineStyles.payButton}
          onClick={() => navigate("/checkout")} // This should navigate to /checkout
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
