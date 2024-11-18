// import React, { useState } from "react";

// const MobileUpcomingGames = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [betPlaced, setBetPlaced] = useState(null);
//   const [confirmationOpen, setConfirmationOpen] = useState(false);
//   const [selectedBet, setSelectedBet] = useState(null);
//   const [betAmount, setBetAmount] = useState("");

//   const games = [
//     // Traditional sports
//     {
//       gameType: "Football",
//       tournament: "Premier League",
//       date: "2024-11-16",
//       team1: { name: "Team A", emoji: "⚽", odds: 1.75 },
//       team2: { name: "Team B", emoji: "⚽", odds: 2.05 },
//     },
//     {
//       gameType: "Basketball",
//       tournament: "NBA Finals",
//       date: "2024-11-17",
//       team1: { name: "Team C", emoji: "🏀", odds: 1.55 },
//       team2: { name: "Team D", emoji: "🏀", odds: 2.35 },
//     },
//     {
//       gameType: "Football",
//       tournament: "La Liga",
//       date: "2024-11-18",
//       team1: { name: "Real Madrid", emoji: "⚽", odds: 1.85 },
//       team2: { name: "Barcelona", emoji: "⚽", odds: 2.1 },
//     },
//     {
//       gameType: "Basketball",
//       tournament: "EuroLeague",
//       date: "2024-11-19",
//       team1: { name: "Olympiacos", emoji: "🏀", odds: 1.65 },
//       team2: { name: "Fenerbahce", emoji: "🏀", odds: 2.25 },
//     },
//     {
//       gameType: "Tennis",
//       tournament: "Wimbledon",
//       date: "2024-11-20",
//       team1: { name: "Roger Federer", emoji: "🎾", odds: 1.7 },
//       team2: { name: "Rafael Nadal", emoji: "🎾", odds: 2.2 },
//     },
//     // Esports
//     {
//       gameType: "Esports",
//       tournament: "VALORANT Champions Tour",
//       date: "2024-11-21",
//       team1: { name: "Sentinels", emoji: "🎮", odds: 1.85 },
//       team2: { name: "Fnatic", emoji: "🎮", odds: 2.1 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "CS:GO Major",
//       date: "2024-11-22",
//       team1: { name: "NAVI", emoji: "💣", odds: 1.65 },
//       team2: { name: "G2 Esports", emoji: "💣", odds: 2.25 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "League of Legends Worlds",
//       date: "2024-11-23",
//       team1: { name: "T1", emoji: "🐉", odds: 1.7 },
//       team2: { name: "DWG KIA", emoji: "🐉", odds: 2.2 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "Dota 2 International",
//       date: "2024-11-24",
//       team1: { name: "OG", emoji: "🔥", odds: 1.9 },
//       team2: { name: "PSG.LGD", emoji: "🔥", odds: 2.0 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "Overwatch League",
//       date: "2024-11-25",
//       team1: { name: "Dallas Fuel", emoji: "🔫", odds: 1.75 },
//       team2: { name: "San Francisco Shock", emoji: "🔫", odds: 2.05 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "Rainbow Six Siege Invitational",
//       date: "2024-11-26",
//       team1: { name: "Team Empire", emoji: "🛡️", odds: 1.8 },
//       team2: { name: "Ninjas in Pyjamas", emoji: "🛡️", odds: 2.15 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "Rocket League Championship",
//       date: "2024-11-27",
//       team1: { name: "Team Vitality", emoji: "🚗", odds: 1.7 },
//       team2: { name: "NRG Esports", emoji: "🚗", odds: 2.2 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "Call of Duty League",
//       date: "2024-11-28",
//       team1: { name: "Atlanta FaZe", emoji: "🔫", odds: 1.75 },
//       team2: { name: "OpTic Texas", emoji: "🔫", odds: 2.05 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "Fortnite Championship Series",
//       date: "2024-11-29",
//       team1: { name: "Bugha", emoji: "🏹", odds: 1.85 },
//       team2: { name: "Mongraal", emoji: "🏹", odds: 2.15 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "PUBG Global Championship",
//       date: "2024-11-30",
//       team1: { name: "4AM", emoji: "🔫", odds: 1.6 },
//       team2: { name: "TSM", emoji: "🔫", odds: 2.3 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "Apex Legends Global Series",
//       date: "2024-12-01",
//       team1: { name: "TSM", emoji: "🏹", odds: 1.7 },
//       team2: { name: "NRG", emoji: "🏹", odds: 2.2 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "Hearthstone Grandmasters",
//       date: "2024-12-02",
//       team1: { name: "Thijs", emoji: "🃏", odds: 1.8 },
//       team2: { name: "Firebat", emoji: "🃏", odds: 2.1 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "FIFAe World Cup",
//       date: "2024-12-03",
//       team1: { name: "MSdossary", emoji: "⚽", odds: 1.75 },
//       team2: { name: "Tekkz", emoji: "⚽", odds: 2.05 },
//     },
//     {
//       gameType: "Esports",
//       tournament: "StarCraft II WCS",
//       date: "2024-12-04",
//       team1: { name: "Serral", emoji: "👾", odds: 1.85 },
//       team2: { name: "Maru", emoji: "👾", odds: 2.1 },
//     },
//   ];

//   const styles = {
//     container: {
//       backgroundColor: "#1a1a1a",
//       color: "white",
//       minHeight: "100vh",
//       position: "relative",
//     },
//     header: {
//       padding: "16px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       borderBottom: "1px solid #333",
//     },
//     headerTitle: {
//       fontSize: "20px",
//       fontWeight: "bold",
//     },
//     menuButton: {
//       backgroundColor: "#333",
//       border: "none",
//       padding: "8px 12px",
//       borderRadius: "8px",
//       color: "white",
//       cursor: "pointer",
//     },
//     sidebar: {
//       position: "fixed",
//       top: 0,
//       left: isSidebarOpen ? 0 : "-250px",
//       width: "250px",
//       height: "100%",
//       backgroundColor: "#222",
//       transition: "left 0.3s ease",
//       padding: "16px",
//     },
//     sidebarCloseButton: {
//       backgroundColor: "#333",
//       border: "none",
//       padding: "8px 12px",
//       borderRadius: "8px",
//       color: "white",
//       cursor: "pointer",
//       position: "absolute",
//       top: "16px",
//       right: "16px",
//     },
//     main: {
//       padding: "16px",
//       marginTop: "16px",
//     },
//     gameList: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "16px",
//     },
//     gameCard: {
//       backgroundColor: "#2a2a2a",
//       padding: "16px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
//     },
//     tournamentInfo: {
//       display: "flex",
//       justifyContent: "space-between",
//       fontSize: "14px",
//       marginBottom: "8px",
//     },
//     matchup: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "16px",
//     },
//     team: {
//       display: "flex",
//       alignItems: "center",
//     },
//     teamLeft: {
//       justifyContent: "flex-start",
//     },
//     teamRight: {
//       justifyContent: "flex-end",
//     },
//     teamName: {
//       fontSize: "16px",
//       fontWeight: "bold",
//       marginLeft: "8px",
//     },
//     teamEmoji: {
//       fontSize: "24px",
//     },
//     vs: {
//       fontSize: "16px",
//       fontWeight: "bold",
//       color: "#999",
//     },
//     oddsContainer: {
//       display: "flex",
//       justifyContent: "space-between",
//       marginBottom: "16px",
//     },
//     oddsButton: {
//       backgroundColor: "#3a3a3a",
//       border: "none",
//       padding: "8px 12px",
//       borderRadius: "8px",
//       color: "white",
//       cursor: "pointer",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     oddsLabel: {
//       fontSize: "14px",
//       color: "#999",
//     },
//     oddsValue: {
//       fontSize: "16px",
//       fontWeight: "bold",
//       color: "#fff",
//     },
//     betContainer: {
//       marginTop: "8px",
//       display: "flex",
//       flexDirection: "column",
//       gap: "8px",
//     },
//     coinPrice: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontSize: "14px",
//       color: "#999",
//     },
//     betInput: {
//       width: "100%",
//       padding: "8px",
//       backgroundColor: "#3a3a3a",
//       border: "none",
//       borderRadius: "8px",
//       color: "white",
//       fontSize: "14px",
//     },
//     betButton: {
//       backgroundColor: "#1e90ff",
//       padding: "8px 12px",
//       border: "none",
//       borderRadius: "8px",
//       color: "white",
//       cursor: "pointer",
//       textAlign: "center",
//       fontSize: "14px",
//     },
//     confirmationPopup: {
//       position: "fixed",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       backgroundColor: "#333",
//       padding: "20px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
//       zIndex: 1000,
//     },
//     popupButton: {
//       backgroundColor: "#1e90ff",
//       border: "none",
//       padding: "10px 20px",
//       margin: "5px",
//       borderRadius: "8px",
//       color: "white",
//       cursor: "pointer",
//     },
//     overlay: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       zIndex: 999,
//     },
//     placedBet: {
//       marginTop: "16px",
//       backgroundColor: "#444",
//       padding: "8px",
//       borderRadius: "8px",
//       color: "#fff",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       flexDirection: "column",
//     },
//     moneySymbol: {
//       fontSize: "24px",
//       marginBottom: "8px",
//     },
//     placedBetInfo: {
//       fontSize: "16px",
//     },
//   };

//   const handleBetClick = (game, team) => {
//     if (betAmount === "") return alert("Please enter a bet amount");
//     setSelectedBet({ game, team });
//     setConfirmationOpen(true);
//   };

//   const handleConfirmBet = () => {
//     setBetPlaced({ ...selectedBet, amount: betAmount });
//     setConfirmationOpen(false);
//     setBetAmount(""); // Reset input field
//   };

//   return (
//     <div style={styles.container}>
//       {confirmationOpen && (
//         <>
//           <div style={styles.overlay}></div>
//           <div style={styles.confirmationPopup}>
//             <p>
//               Confirm your bet on {selectedBet.team.name} in{" "}
//               {selectedBet.game.tournament}?
//             </p>
//             <button style={styles.popupButton} onClick={handleConfirmBet}>
//               Yes
//             </button>
//             <button
//               style={styles.popupButton}
//               onClick={() => setConfirmationOpen(false)}
//             >
//               No
//             </button>
//           </div>
//         </>
//       )}

//       <header style={styles.header}>
//         <span style={styles.headerTitle}>Upcoming Games</span>
//         <button
//           style={styles.menuButton}
//           onClick={() => setIsSidebarOpen(true)}
//         >
//           Menu
//         </button>
//       </header>

//       <div style={styles.sidebar}>
//         <button
//           style={styles.sidebarCloseButton}
//           onClick={() => setIsSidebarOpen(false)}
//         >
//           Close
//         </button>
//       </div>

//       <main style={styles.main}>
//         <div style={styles.gameList}>
//           {games.map((game, index) => (
//             <div key={index} style={styles.gameCard}>
//               <div style={styles.tournamentInfo}>
//                 <span>
//                   {game.gameType} {game.tournament}
//                 </span>
//                 <span>{game.date}</span>
//               </div>

//               <div style={styles.matchup}>
//                 <div style={{ ...styles.team, ...styles.teamLeft }}>
//                   <span style={styles.teamEmoji}>{game.team1.emoji}</span>
//                   <span style={styles.teamName}>{game.team1.name}</span>
//                 </div>
//                 <span style={styles.vs}>vs</span>
//                 <div style={{ ...styles.team, ...styles.teamRight }}>
//                   <span style={styles.teamName}>{game.team2.name}</span>
//                   <span style={styles.teamEmoji}>{game.team2.emoji}</span>
//                 </div>
//               </div>

//               <div style={styles.oddsContainer}>
//                 <button
//                   style={styles.oddsButton}
//                   onClick={() => handleBetClick(game, game.team1)}
//                 >
//                   <span style={styles.oddsLabel}>Odds</span>
//                   <span style={styles.oddsValue}>{game.team1.odds}</span>
//                 </button>
//                 <button
//                   style={styles.oddsButton}
//                   onClick={() => handleBetClick(game, game.team2)}
//                 >
//                   <span style={styles.oddsLabel}>Odds</span>
//                   <span style={styles.oddsValue}>{game.team2.odds}</span>
//                 </button>
//               </div>

//               <div style={styles.betContainer}>
//                 <input
//                   type="text"
//                   value={betAmount}
//                   onChange={(e) => setBetAmount(e.target.value)}
//                   placeholder="Enter bet amount"
//                   style={styles.betInput}
//                 />
//                 <button
//                   style={styles.betButton}
//                   onClick={() => handleBetClick(game, game.team1)}
//                 >
//                   Place Bet
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {betPlaced && (
//           <div style={styles.placedBet}>
//             <div style={styles.moneySymbol}>💰</div>
//             <div style={styles.placedBetInfo}>
//               Bet placed on {betPlaced.team.name} for {betPlaced.amount}!
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MobileUpcomingGames;

import React, { useState } from "react";

const MobileUpcomingGames = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [placedBets, setPlacedBets] = useState([]); // Track all placed bets
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // Confirmation popup
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  const games = [
    {
      gameType: "Football",
      tournament: "Premier League",
      date: "2024-11-16",
      team1: { name: "Team A", emoji: "⚽", odds: 1.75 },
      team2: { name: "Team B", emoji: "⚽", odds: 2.05 },
    },
    {
      gameType: "Basketball",
      tournament: "NBA Finals",
      date: "2024-11-17",
      team1: { name: "Team X", emoji: "🏀", odds: 2.1 },
      team2: { name: "Team Y", emoji: "🏀", odds: 1.9 },
    },
    {
      gameType: "Cricket",
      tournament: "World Cup",
      date: "2024-11-18",
      team1: { name: "Team India", emoji: "🏏", odds: 1.6 },
      team2: { name: "Team Australia", emoji: "🏏", odds: 2.2 },
    },
    {
      gameType: "Tennis",
      tournament: "Wimbledon",
      date: "2024-11-19",
      team1: { name: "Player A", emoji: "🎾", odds: 1.8 },
      team2: { name: "Player B", emoji: "🎾", odds: 2.0 },
    },
    {
      gameType: "Baseball",
      tournament: "World Series",
      date: "2024-11-20",
      team1: { name: "Team Red", emoji: "⚾", odds: 2.5 },
      team2: { name: "Team Blue", emoji: "⚾", odds: 1.5 },
    },
    {
      gameType: "Hockey",
      tournament: "Stanley Cup",
      date: "2024-11-21",
      team1: { name: "Team Polar", emoji: "🏒", odds: 1.7 },
      team2: { name: "Team Ice", emoji: "🏒", odds: 2.3 },
    },
    {
      gameType: "Rugby",
      tournament: "Six Nations",
      date: "2024-11-22",
      team1: { name: "Team Alpha", emoji: "🏉", odds: 2.2 },
      team2: { name: "Team Beta", emoji: "🏉", odds: 1.8 },
    },
    {
      gameType: "Soccer",
      tournament: "Champions League",
      date: "2024-11-23",
      team1: { name: "Team Star", emoji: "⚽", odds: 1.9 },
      team2: { name: "Team Comet", emoji: "⚽", odds: 2.1 },
    },
    {
      gameType: "Golf",
      tournament: "The Masters",
      date: "2024-11-24",
      team1: { name: "Player C", emoji: "⛳", odds: 2.0 },
      team2: { name: "Player D", emoji: "⛳", odds: 1.8 },
    },
    {
      gameType: "Boxing",
      tournament: "Heavyweight Championship",
      date: "2024-11-25",
      team1: { name: "Fighter 1", emoji: "🥊", odds: 1.6 },
      team2: { name: "Fighter 2", emoji: "🥊", odds: 2.4 },
    },
    {
      gameType: "eSports",
      tournament: "CS:GO Major",
      date: "2024-11-26",
      team1: { name: "Team Cyber", emoji: "🎮", odds: 1.8 },
      team2: { name: "Team Virtual", emoji: "🎮", odds: 2.2 },
    },
    {
      gameType: "Formula 1",
      tournament: "Grand Prix",
      date: "2024-11-27",
      team1: { name: "Driver X", emoji: "🏎️", odds: 1.9 },
      team2: { name: "Driver Y", emoji: "🏎️", odds: 2.1 },
    },
    {
      gameType: "Volleyball",
      tournament: "World Cup",
      date: "2024-11-28",
      team1: { name: "Team Spiker", emoji: "🏐", odds: 1.8 },
      team2: { name: "Team Blocker", emoji: "🏐", odds: 2.2 },
    },
    {
      gameType: "Swimming",
      tournament: "World Aquatics",
      date: "2024-11-29",
      team1: { name: "Swimmer A", emoji: "🏊", odds: 1.7 },
      team2: { name: "Swimmer B", emoji: "🏊", odds: 2.3 },
    },
    {
      gameType: "Cycling",
      tournament: "Tour de France",
      date: "2024-11-30",
      team1: { name: "Cyclist 1", emoji: "🚴", odds: 1.6 },
      team2: { name: "Cyclist 2", emoji: "🚴", odds: 2.4 },
    },
    {
      gameType: "Chess",
      tournament: "World Championship",
      date: "2024-12-01",
      team1: { name: "Player 1", emoji: "♟️", odds: 2.0 },
      team2: { name: "Player 2", emoji: "♟️", odds: 1.8 },
    },
    {
      gameType: "Badminton",
      tournament: "All England Open",
      date: "2024-12-02",
      team1: { name: "Shuttler A", emoji: "🏸", odds: 1.7 },
      team2: { name: "Shuttler B", emoji: "🏸", odds: 2.3 },
    },
    {
      gameType: "Wrestling",
      tournament: "Olympics",
      date: "2024-12-03",
      team1: { name: "Wrestler X", emoji: "🤼", odds: 1.9 },
      team2: { name: "Wrestler Y", emoji: "🤼", odds: 2.1 },
    },
    {
      gameType: "MMA",
      tournament: "UFC Fight Night",
      date: "2024-12-04",
      team1: { name: "Fighter Alpha", emoji: "🥋", odds: 2.2 },
      team2: { name: "Fighter Beta", emoji: "🥋", odds: 1.8 },
    },
    {
      gameType: "Darts",
      tournament: "World Darts Championship",
      date: "2024-12-05",
      team1: { name: "Player M", emoji: "🎯", odds: 2.0 },
      team2: { name: "Player N", emoji: "🎯", odds: 1.8 },
    },
  ];

  const placeBet = () => {
    if (selectedBet && betAmount) {
      setPlacedBets([...placedBets, { ...selectedBet, amount: betAmount }]);
      setSuccessMessage("Bet placed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      setBetAmount("");
      setSelectedBet(null);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        color: "white",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #333",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Upcoming Games</h1>
        <button
          style={{
            backgroundColor: "#333",
            padding: "8px 12px",
            borderRadius: "8px",
            color: "white",
          }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close" : "Open"} Bets
        </button>
      </header>

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: isSidebarOpen ? 0 : "-250px",
          width: "250px",
          height: "100%",
          backgroundColor: "#222",
          padding: "16px",
          transition: "left 0.3s ease",
        }}
      >
        <h2
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}
        >
          Bets Placed
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {placedBets.map((bet, index) => (
            <li
              key={index}
              style={{
                marginBottom: "16px",
                backgroundColor: "#2a2a2a",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <div>{`${bet.team1.name} vs ${bet.team2.name}`}</div>
              <div>{`Bet Amount: $${bet.amount}`}</div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Games List */}
      <main
        style={{
          padding: "16px",
          marginLeft: isSidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        {games.map((game, index) => (
          <div
            key={index}
            style={{
              marginBottom: "16px",
              padding: "16px",
              backgroundColor: "#333",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              {game.gameType}
            </h3>
            <div style={{ fontSize: "14px", marginBottom: "8px" }}>
              {game.tournament}
            </div>
            <div style={{ fontSize: "14px", marginBottom: "8px" }}>
              {game.date}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div>{`${game.team1.emoji} ${game.team1.name} (Odds: ${game.team1.odds})`}</div>
                <div>{`${game.team2.emoji} ${game.team2.name} (Odds: ${game.team2.odds})`}</div>
              </div>
              <button
                style={{
                  backgroundColor: "#444",
                  padding: "8px",
                  borderRadius: "8px",
                  color: "white",
                }}
                onClick={() => setSelectedBet(game)}
              >
                Place Bet
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Bet Modal */}
      {selectedBet && (
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#222",
            padding: "16px",
            borderRadius: "8px",
            zIndex: 1000,
          }}
        >
          <h4 style={{ fontSize: "16px", marginBottom: "8px" }}>Place Bet</h4>
          <div
            style={{ marginBottom: "8px" }}
          >{`${selectedBet.team1.name} vs ${selectedBet.team2.name}`}</div>
          <input
            type="number"
            placeholder="Enter amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              marginBottom: "8px",
              border: "none",
              backgroundColor: "#333",
              color: "white",
            }}
          />
          <button
            style={{
              backgroundColor: "#444",
              padding: "8px",
              borderRadius: "8px",
              color: "white",
              width: "100%",
            }}
            onClick={placeBet}
          >
            Confirm Bet
          </button>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#28a745",
            padding: "16px",
            borderRadius: "8px",
            zIndex: 1000,
          }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default MobileUpcomingGames;
