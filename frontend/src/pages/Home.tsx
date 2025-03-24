// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
        <h1>yoked</h1>
        <Button label="New Workout" onClick={() => navigate("/new-workout")}/>
        <Button label="Previous Workouts" onClick={() => navigate("/previous-workouts")}/>
        <Button label="Progress" onClick={() => navigate("/progress")}/>
    </Layout>
  );
};

export default Home;
