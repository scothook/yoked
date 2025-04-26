// src/pages/Progress.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";

const ProgressTracker: React.FC = () => {
    const navigate = useNavigate();
  return (
    <Layout>
      <h1>progress tracker</h1>
      <Button label="← Back" onClick={() => navigate(-1)}/>
  </Layout>
  )
};

export default ProgressTracker;
