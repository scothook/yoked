// src/pages/NewWorkout.tsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";

const NewWorkout: React.FC = () => {
  const navigate = useNavigate();

  const [bodyWeight, setBodyWeight] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newWorkout = {
      body_weight: parseFloat(bodyWeight),
      workout_type_id: parseFloat(workoutType),
      notes,
      date: new Date().toISOString().split("T")[0], // Autopopulates today's date
    };

    try {
      const response = await fetch("https://yoked-backend-production.up.railway.app/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
      });

      if (response.ok) {
        alert("Workout saved!");
        setBodyWeight("");
        setWorkoutType("");
        setNotes("");
      } else {
        alert("Failed to save workout.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <Layout>
      <h1>Start a New Workout</h1>
      <Button label="Back" onClick={() => navigate("/")}/>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Body Weight (lbs):</label>
          <input
            type="number"
            value={bodyWeight}
            onChange={(e) => setBodyWeight(e.target.value)}
            className="border p-2"
          />
        </div>
        <div>
          <label>Workout Type:</label>
          <input
            type="number"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
            className="border p-2"
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Save Workout</button>
      </form>
    </Layout>

    
  );
};

export default NewWorkout;
