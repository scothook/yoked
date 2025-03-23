// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewWorkout from "./pages/NewWorkout";
import PreviousWorkouts from "./pages/PreviousWorkouts";
import Progress from "./pages/Progress";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-workout" element={<NewWorkout />} />
        <Route path="/previous-workouts" element={<PreviousWorkouts />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
};

export default App
