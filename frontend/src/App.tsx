// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CurrentWorkout from "./pages/CurrentWorkout";
import PastWorkouts from "./pages/PastWorkouts";
import ProgressTracker from "./pages/ProgressTracker";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/current-workout" element={<CurrentWorkout />} />
        <Route path="/past-workouts" element={<PastWorkouts />} />
        <Route path="/progress-tracker" element={<ProgressTracker />} />
      </Routes>
    </Router>
  );
};

export default App
