import React, { useState, useEffect } from "react";

// Mock AEON Protocol Configuration
const AEON_PROTOCOL = {
  version: "1.0.0",
  networkId: "aeon-mainnet",
  confirmationBlocks: 6,
  minConfirmationTime: 2000, // ms
  maxConfirmationTime: 5000, // ms
  fees: {
    standard: 0.001,
    fast: 0.002,
    instant: 0.003,
  },
};

// Mock AEON Node endpoints
const AEON_NODES = {
  primary: "node1.aeon.network",
  backup: ["node2.aeon.network", "node3.aeon.network"],
  currentNode: "node1.aeon.network",
};

// Mock AEON payment states
const PAYMENT_STATES = {
  PENDING: "PENDING",
  CONFIRMING: "CONFIRMING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};

// Mock wallets with AEON protocol support
const mockWallets = [
  {
    id: "wallet1",
    name: "Wallet Alpha",
    balance: 1000,
    aeonAddress: "ae1qw2e3r4t5y6u7i8o9p0",
    protocolVersion: AEON_PROTOCOL.version,
  },
  {
    id: "wallet2",
    name: "Wallet Beta",
    balance: 500,
    aeonAddress: "ae9h8g7f6d5s4a3",
    protocolVersion: AEON_PROTOCOL.version,
  },
  {
    id: "wallet3",
    name: "Wallet Gamma",
    balance: 750,
    aeonAddress: "ae2w3e4r5t6y7u8i9o0",
    protocolVersion: AEON_PROTOCOL.version,
  },
];

// Cryptocurrency prices (mock data)
const cryptoPrices = {
  AEON: 0.5,
  BTC: 40000,
  ETH: 2500,
  USDT: 1,
  ADA: 1.5,
  SOL: 30,
  DOGE: 0.2,
  DOT: 5,
  LTC: 100,
  UNI: 20,
  MATIC: 1.2,
  LINK: 15,
  BNB: 300,
  AVAX: 50,
  XRP: 0.8,
  AAVE: 150,
  FTM: 0.3,
  HBAR: 0.15,
  ALGO: 0.25,
  COMP: 80,
  ZRX: 0.25,
  MKR: 600,
  // ... other cryptocurrencies
};

const BuyToken = () => {
  const [balance, setBalance] = useState(100);
  const [amount, setAmount] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("AEON");
  const [transactions, setTransactions] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [walletId, setWalletId] = useState(mockWallets[0].id);
  const [selectedWallet, setSelectedWallet] = useState(mockWallets[0]);
  const [paymentSpeed, setPaymentSpeed] = useState("standard");
  const [processingState, setProcessingState] = useState(null);

  // Simulate AEON protocol transaction processing
  const processAeonTransaction = async (amount, speed) => {
    setProcessingState(PAYMENT_STATES.PENDING);

    // Simulate network validation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProcessingState(PAYMENT_STATES.CONFIRMING);

    // Simulate confirmation time based on selected speed
    const confirmationTime =
      speed === "instant"
        ? AEON_PROTOCOL.minConfirmationTime
        : AEON_PROTOCOL.maxConfirmationTime;

    await new Promise((resolve) => setTimeout(resolve, confirmationTime));

    // 95% success rate simulation
    if (Math.random() > 0.05) {
      setProcessingState(PAYMENT_STATES.COMPLETED);
      return true;
    } else {
      setProcessingState(PAYMENT_STATES.FAILED);
      throw new Error("Transaction failed");
    }
  };

  const handleBuy = async () => {
    try {
      const transactionId = `aeon-${Date.now()}`;
      const cost = amount * cryptoPrices[selectedCrypto];
      const fee = AEON_PROTOCOL.fees[paymentSpeed];
      const totalCost = cost + fee;
      const date = new Date().toLocaleString();

      // Process AEON protocol transaction
      await processAeonTransaction(amount, paymentSpeed);

      // Update balance and transaction history
      setBalance(balance + totalCost);
      setTransactions([
        ...transactions,
        {
          id: transactionId,
          amount,
          crypto: selectedCrypto,
          status: "Completed",
          fee,
          date,
          protocol: "AEON",
          speed: paymentSpeed,
          node: AEON_NODES.currentNode,
        },
      ]);
      setTransactionStatus(`Transaction completed: ${transactionId}`);
    } catch (error) {
      setTransactionStatus(`Error: ${error.message}`);
    }
  };

  const handleUnstake = async () => {
    try {
      const transactionId = `aeon-unstake-${Date.now()}`;
      const unstakeAmount = amount * cryptoPrices[selectedCrypto];
      const fee = AEON_PROTOCOL.fees[paymentSpeed];
      const totalAmount = unstakeAmount + fee;
      const date = new Date().toLocaleString();

      if (balance >= totalAmount) {
        // Process AEON protocol transaction
        await processAeonTransaction(amount, paymentSpeed);

        setBalance(balance - totalAmount);
        setTransactions([
          ...transactions,
          {
            id: transactionId,
            amount,
            crypto: selectedCrypto,
            status: "Unstaked",
            fee,
            date,
            protocol: "AEON",
            speed: paymentSpeed,
            node: AEON_NODES.currentNode,
          },
        ]);
        setTransactionStatus(`Unstake completed: ${transactionId}`);
      } else {
        setTransactionStatus("Insufficient balance to unstake");
      }
    } catch (error) {
      setTransactionStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        backgroundColor: "#1c1c1e",
        color: "white",
        fontFamily: "Arial, sans-serif",
        borderRadius: "8px",
      }}
    >
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        AEON Protocol Crypto Exchange
      </h2>

      {/* Protocol Info */}
      <div
        style={{
          backgroundColor: "#2c2c2e",
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>
          Protocol Info
        </h3>
        <p>Version: {AEON_PROTOCOL.version}</p>
        <p>Network: {AEON_PROTOCOL.networkId}</p>
        <p>Current Node: {AEON_NODES.currentNode}</p>
      </div>

      {/* Wallet Selection */}
      <div style={{ marginBottom: "15px" }}>
        <label>Choose Wallet:</label>
        <select
          onChange={(e) => {
            const selected = mockWallets.find(
              (wallet) => wallet.id === e.target.value
            );
            setSelectedWallet(selected);
            setWalletId(selected.id);
          }}
          value={walletId}
          style={{
            padding: "8px",
            marginLeft: "10px",
            borderRadius: "4px",
            backgroundColor: "#2c2c2e",
            color: "white",
            border: "1px solid #3c3c3e",
          }}
        >
          {mockWallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.name} - Balance: ${wallet.balance}
            </option>
          ))}
        </select>
      </div>

      {/* Transaction Speed Selection */}
      <div style={{ marginBottom: "15px" }}>
        <label>Transaction Speed:</label>
        <select
          value={paymentSpeed}
          onChange={(e) => setPaymentSpeed(e.target.value)}
          style={{
            padding: "8px",
            marginLeft: "10px",
            borderRadius: "4px",
            backgroundColor: "#2c2c2e",
            color: "white",
            border: "1px solid #3c3c3e",
          }}
        >
          <option value="standard">
            Standard (Fee: {AEON_PROTOCOL.fees.standard} AEON)
          </option>
          <option value="fast">
            Fast (Fee: {AEON_PROTOCOL.fees.fast} AEON)
          </option>
          <option value="instant">
            Instant (Fee: {AEON_PROTOCOL.fees.instant} AEON)
          </option>
        </select>
      </div>

      {/* Cryptocurrency selection */}
      <div style={{ marginBottom: "15px" }}>
        <label>Cryptocurrency:</label>
        <select
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
          style={{
            padding: "8px",
            marginLeft: "10px",
            borderRadius: "4px",
            backgroundColor: "#2c2c2e",
            color: "white",
            border: "1px solid #3c3c3e",
          }}
        >
          {Object.keys(cryptoPrices).map((crypto) => (
            <option key={crypto} value={crypto}>
              {crypto} - ${cryptoPrices[crypto]}
            </option>
          ))}
        </select>
      </div>

      {/* Amount input */}
      <div style={{ marginBottom: "20px" }}>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          style={{
            padding: "8px",
            marginLeft: "10px",
            width: "100px",
            borderRadius: "4px",
            backgroundColor: "#2c2c2e",
            color: "white",
            border: "1px solid #3c3c3e",
          }}
        />
      </div>

      {/* Processing State */}
      {processingState && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            backgroundColor:
              processingState === PAYMENT_STATES.COMPLETED
                ? "#1a472a"
                : "#2c2c2e",
          }}
        >
          <p>Processing State: {processingState}</p>
          {processingState === PAYMENT_STATES.CONFIRMING && (
            <p>Confirming blocks: {AEON_PROTOCOL.confirmationBlocks}</p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleBuy}
          style={{
            backgroundColor: "#4f46e5",
            padding: "10px 20px",
            borderRadius: "4px",
            color: "white",
            marginRight: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Buy
        </button>
        <button
          onClick={handleUnstake}
          style={{
            backgroundColor: "#ef4444",
            padding: "10px 20px",
            borderRadius: "4px",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Unstake
        </button>
      </div>

      {/* Transaction Status */}
      <div
        style={{
          padding: "10px",
          backgroundColor: "#2c2c2e",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        <p>Transaction Status: {transactionStatus}</p>
      </div>

      {/* Profile Section */}
      <div
        style={{
          padding: "15px",
          borderRadius: "4px",
          backgroundColor: "#292b2f",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Profile
        </h3>
        <p>Wallet ID: {walletId}</p>
        <p>AEON Address: {selectedWallet.aeonAddress}</p>
        <p>Current Balance: ${balance.toFixed(2)}</p>
      </div>

      {/* Transaction History */}
      <div>
        <h3
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}
        >
          Transaction History
        </h3>
        <ul style={{ padding: 0, listStyle: "none" }}>
          {transactions.map((tx, index) => (
            <li
              key={index}
              style={{
                padding: "15px",
                borderRadius: "4px",
                backgroundColor:
                  tx.status === "Completed" ? "#1a472a" : "#4a1d1d",
                marginBottom: "10px",
              }}
            >
              <p>ID: {tx.id}</p>
              <p>Protocol: {tx.protocol}</p>
              <p>Speed: {tx.speed}</p>
              <p>Node: {tx.node}</p>
              <p>Crypto: {tx.crypto}</p>
              <p>
                Amount: {tx.amount} {tx.crypto}
              </p>
              <p>Fee: {tx.fee} AEON</p>
              <p>Status: {tx.status}</p>
              <p>Date: {tx.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BuyToken;
