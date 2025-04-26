// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
        <h1 className="header">yoked</h1>
        <Button label="new workout" onClick={() => navigate("/current-workout")}/>
        <Button label="past workouts" onClick={() => navigate("/past-workouts")}/>
        <Button label="progress tracker" onClick={() => navigate("/progress-tracker")}/>
    </Layout>
  );
};

export default Home;
