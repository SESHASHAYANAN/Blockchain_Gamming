import React, { useState } from "react";

const Wea = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [purchasedNFTs, setPurchasedNFTs] = useState([]);
  const [walletId] = useState("0x123ABC456DEF"); // Mock wallet ID
  const [successMessage, setSuccessMessage] = useState("");
  const [view, setView] = useState("products"); // Tracks the current view: "products" or "purchases"

  const nftItems = [
    {
      id: 1,
      emoji: "🔫",
      name: "Gun Skin - Red Fury",
      game: "Fortnite",
      owner: "Epic Games",
      price: 0.05,
    },
    {
      id: 2,
      emoji: "🎮",
      name: "Premium Game Pass",
      game: "Call of Duty",
      owner: "Activision",
      price: 0.1,
    },
    {
      id: 3,
      emoji: "🛡️",
      name: "Exclusive Shield",
      game: "World of Warcraft",
      owner: "Blizzard",
      price: 0.08,
    },
    {
      id: 4,
      emoji: "🚗",
      name: "Racing Car Skin",
      game: "Need for Speed",
      owner: "EA Games",
      price: 0.12,
    },
    {
      id: 5,
      emoji: "⚔️",
      name: "Legendary Sword",
      game: "Elden Ring",
      owner: "FromSoftware",
      price: 0.09,
    },
    {
      id: 6,
      emoji: "🎩",
      name: "Wizard Hat",
      game: "Harry Potter RPG",
      owner: "Portkey Games",
      price: 0.07,
    },
  ];

  const handlePurchase = () => {
    const transactionId = `txn-${Date.now()}`;
    setPurchasedNFTs([...purchasedNFTs, { ...selectedNFT, transactionId }]);
    setSuccessMessage(`Successfully purchased ${selectedNFT.name}!`);
    setSelectedNFT(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "250px" : "70px",
          backgroundColor: "#1e1e1e",
          transition: "width 0.3s",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          {sidebarOpen ? "←" : "→"}
        </button>
        <ul style={{ listStyleType: "none", padding: 0, width: "100%" }}>
          <li
            style={{
              padding: "15px",
              textAlign: sidebarOpen ? "left" : "center",
              cursor: "pointer",
            }}
            onClick={() => setView("products")}
          >
            🏠 {sidebarOpen && "Home"}
          </li>
          <li
            style={{
              padding: "15px",
              textAlign: sidebarOpen ? "left" : "center",
              cursor: "pointer",
            }}
            onClick={() => setView("products")}
          >
            🎮 {sidebarOpen && "Games"}
          </li>
          <li
            style={{
              padding: "15px",
              textAlign: sidebarOpen ? "left" : "center",
              cursor: "pointer",
            }}
            onClick={() => setView("purchases")}
          >
            🛒 {sidebarOpen && "Purchases"}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <header
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
            borderBottom: "1px solid #333",
            paddingBottom: "10px",
          }}
        >
          {view === "products"
            ? "NFT Game Assets Marketplace"
            : "Your Purchased Products"}
        </header>
        <main
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {view === "products"
            ? nftItems.map((nft) => (
                <div
                  key={nft.id}
                  style={{
                    backgroundColor: "#1e1e1e",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0px 8px 20px rgba(0, 0, 0, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0px 4px 10px rgba(0, 0, 0, 0.5)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {nft.emoji}
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      marginBottom: "10px",
                      color: "#f0f0f0",
                      textAlign: "center",
                    }}
                  >
                    {nft.name}
                  </h3>
                  <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                    <strong>Game:</strong> {nft.game}
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                    <strong>Owner:</strong> {nft.owner}
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "10px" }}>
                    <strong>Price:</strong> {nft.price} ETH
                  </div>
                  <button
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#444",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={() => setSelectedNFT(nft)}
                  >
                    Buy Now
                  </button>
                </div>
              ))
            : purchasedNFTs.map((nft) => (
                <div
                  key={nft.transactionId}
                  style={{
                    backgroundColor: "#1e1e1e",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {nft.emoji}
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      marginBottom: "10px",
                      color: "#f0f0f0",
                      textAlign: "center",
                    }}
                  >
                    {nft.name}
                  </h3>
                  <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                    <strong>Game:</strong> {nft.game}
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                    <strong>Transaction ID:</strong> {nft.transactionId}
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "10px" }}>
                    <strong>Price:</strong> {nft.price} ETH
                  </div>
                </div>
              ))}
        </main>
        {selectedNFT && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#1e1e1e",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                width: "90%",
                maxWidth: "400px",
              }}
            >
              <h3>{selectedNFT.name}</h3>
              <p>
                <strong>Game:</strong> {selectedNFT.game}
              </p>
              <p>
                <strong>Price:</strong> {selectedNFT.price} ETH
              </p>
              <p>
                <strong>Wallet ID:</strong> {walletId}
              </p>
              <button
                style={{
                  margin: "10px",
                  padding: "10px",
                  backgroundColor: "#28a745",
                  border: "none",
                  color: "white",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={handlePurchase}
              >
                Confirm Purchase
              </button>
              <button
                style={{
                  margin: "10px",
                  padding: "10px",
                  backgroundColor: "#dc3545",
                  border: "none",
                  color: "white",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => setSelectedNFT(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {successMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Wea;
