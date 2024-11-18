import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const Checkout = ({ cart, setCart, products = [], onUpdateCart }) => {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const cartProducts = products.filter((product) => localCart[product.id]);

  const handleProductClick = (id) => {
    if (expandedProduct === id) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(id);
    }
  };

  const handleRemoveItem = (product) => {
    const newCart = { ...localCart };
    if (newCart[product.id] > 1) {
      newCart[product.id]--;
    } else {
      delete newCart[product.id];
    }

    setLocalCart(newCart);

    if (typeof setCart === "function") {
      setCart(newCart);
    } else if (typeof onUpdateCart === "function") {
      onUpdateCart(newCart);
    } else {
      console.warn(
        "Neither setCart nor onUpdateCart is provided as a function. Cart updates may not persist."
      );
    }
  };

  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.price * localCart[product.id];
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
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#2d2d3a",
      padding: "10px",
      borderRadius: "10px",
      marginBottom: "20px",
      textAlign: "center",
    },
    orderInfo: {
      fontSize: "14px",
      color: "#ccc",
    },
    productList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      width: "100%",
      marginBottom: "10px",
    },
    productItem: {
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#333",
      borderRadius: "10px",
      marginBottom: "10px",
      cursor: "pointer",
      marginTop: "10px",
    },
    expandedDescription: {
      padding: "10px",
      backgroundColor: "#444",
      borderRadius: "10px",
      marginTop: "5px",
    },
    productIcon: {
      fontSize: "30px",
      marginRight: "10px",
    },
    payButton: {
      padding: "15px",
      backgroundColor: "#28a745",
      color: "#fff",
      fontSize: "18px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      width: "100%",
      textAlign: "center",
    },
    removeButton: {
      backgroundColor: "transparent",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      marginLeft: "10px",
    },
  };

  return (
    <div style={inlineStyles.container}>
      <div style={inlineStyles.header}>
        <img
          src="https://via.placeholder.com/100"
          alt="Restaurant Logo"
          style={{ width: "50px", height: "50px", marginBottom: "10px" }}
        />
        <h2>Order Details</h2>
        <p style={inlineStyles.orderInfo}>Your items from the cart</p>
      </div>

      <ul style={inlineStyles.productList}>
        {cartProducts.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartProducts.map((product) => (
            <li key={product.id}>
              <div
                style={inlineStyles.productItem}
                onClick={() => handleProductClick(product.id)}
              >
                <span>
                  <span style={inlineStyles.productIcon}>{product.icon}</span>
                  {product.name} x {localCart[product.id]}
                </span>
                <span>
                  ${(product.price * localCart[product.id]).toFixed(2)}
                  <button
                    style={inlineStyles.removeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(product);
                    }}
                  >
                    <X size={16} />
                  </button>
                </span>
              </div>
              {expandedProduct === product.id && (
                <div style={inlineStyles.expandedDescription}>
                  {product.description}
                </div>
              )}
            </li>
          ))
        )}
      </ul>

      <div>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button style={inlineStyles.payButton}>
          PAY ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
