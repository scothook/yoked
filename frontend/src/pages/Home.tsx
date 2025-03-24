// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BaseballButton from "../BaseballButton";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (

    <div className="{styles.homeContainer}">
      <h1 className={styles.header}>yoked</h1>
        <BaseballButton />
        <Button label="New Workout" onClick={() => navigate("/new-workout")} className={styles.button}/>
        <Button label="Previous Workouts" onClick={() => navigate("/previous-workouts")} className={styles.button}/>
        <Button label="Progress" onClick={() => navigate("/progress")} className={styles.button}/>
    </div>
  );
};

export default Home;
