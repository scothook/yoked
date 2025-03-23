// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BaseballButton from "../BaseballButton";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
    <BaseballButton />
      <Button label="New Workout" onClick={() => navigate("/new-workout")} />
      <Button label="Previous Workouts" onClick={() => navigate("/previous-workouts")} />
      <Button label="Progress Data" onClick={() => navigate("/progress-data")} />
    </div>
  );
};

export default Home;
