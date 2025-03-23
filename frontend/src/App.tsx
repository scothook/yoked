// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewWorkout from "./pages/NewWorkout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-workout" element={<NewWorkout />} />
      </Routes>
    </Router>
  );
};

export default App
