// GameRote.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlayHome from "./PlayHome";
import Play from "./Play";
import Play2 from "./Play2";
import Play3 from "./Play3";
// Continue importing up to Play16
import Play4 from "./Play4";
import Play5 from "./Play5";
import Play6 from "./Play6";
import Play7 from "./Play7";
import Play8 from "./Play8";
import Play9 from "./Play9";
import Play10 from "./Play10";
import Play11 from "./Play11";
import Play12 from "./Play12";
import Play13 from "./Play13";
import Play14 from "./Play14";
import Play15 from "./Play15";
import Play16 from "./Play16";

const GameRote = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayHome />} />
        <Route path="/play/1" element={<Play />} />
        <Route path="/play/2" element={<Play2 />} />
        <Route path="/play/3" element={<Play3 />} />
        <Route path="/play/4" element={<Play4 />} />
        <Route path="/play/5" element={<Play5 />} />
        <Route path="/play/6" element={<Play6 />} />
        <Route path="/play/7" element={<Play7 />} />
        <Route path="/play/8" element={<Play8 />} />
        <Route path="/play/9" element={<Play9 />} />
        <Route path="/play/10" element={<Play10 />} />
        <Route path="/play/11" element={<Play11 />} />
        <Route path="/play/12" element={<Play12 />} />
        <Route path="/play/13" element={<Play13 />} />
        <Route path="/play/14" element={<Play14 />} />
        <Route path="/play/15" element={<Play15 />} />
        <Route path="/play/16" element={<Play16 />} />
      </Routes>
    </Router>
  );
};

export default GameRote;
