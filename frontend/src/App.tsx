// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CurrentWorkout from "./pages/CurrentWorkout";
import PreviousWorkouts from "./pages/PreviousWorkouts";
import Progress from "./pages/Progress";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/current-workout" element={<CurrentWorkout />} />
        <Route path="/previous-workouts" element={<PreviousWorkouts />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
};

export default App
