import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BetHome from "./BetHome"; // Your component for upcoming games
import App from "./App"; // Main app

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/buy" element={<Buy />} />
        <Route path="/enter-code" element={<Buy />} />{" "}
        {/* Assuming "BuyTokens" is imported */}
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
