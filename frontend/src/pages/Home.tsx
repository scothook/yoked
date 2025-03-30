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
        <Button label="new workout" onClick={() => navigate("/new-workout")}/>
        <Button label="previous workouts" onClick={() => navigate("/previous-workouts")}/>
        <Button label="data" onClick={() => navigate("/progress")}/>
    </Layout>
  );
};

export default Home;
