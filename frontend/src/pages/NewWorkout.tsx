// src/pages/NewWorkout.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";
import styles from "./Home.module.css";

const NewWorkout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className={styles.header}>Start a New Workout</h1>
      <Button label="Back" onClick={() => navigate("/")}/>
    </Layout>
  );
};

export default NewWorkout;
