// src/App.tsx
import React from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewWorkout from "./pages/NewWorkout";
import PreviousWorkouts from "./pages/PreviousWorkouts";
import Progress from "./pages/Progress";

const App: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-workout" element={<NewWorkout />} />
        <Route path="/previous-workouts" element={<PreviousWorkouts />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App
