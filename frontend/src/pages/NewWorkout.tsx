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
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newWorkout = {
      body_weight: parseFloat(bodyWeight),
      workout_type_id: parseFloat(workoutType),
      notes,
      date
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
      <h1>new workout</h1>
      <Button label="Back" onClick={() => navigate("/")}/>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2"
          />
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
        
          <div>
            <label>Movement 1</label>
          </div>
          <div>
            <label>Movement 2</label>
          </div>

        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2"
          />
        </div>
        <Button label="Save" onClick={() => handleSubmit}/>
      </form>
    </Layout>
  );
};

export default NewWorkout;
