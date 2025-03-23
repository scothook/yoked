// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BaseballButton from "../BaseballButton";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (

    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1>yoked</h1>
      <BaseballButton />
      <Button label="New Workout" onClick={() => navigate("/new-workout")} />
      <Button label="Previous Workouts" onClick={() => navigate("/previous-workouts")} />
      <Button label="Progress" onClick={() => navigate("/progress")} />
    </div>
  );
};

export default Home;
