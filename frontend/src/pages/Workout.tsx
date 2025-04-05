// src/pages/Workout.tsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";
import MovementCard from "../components/movementCard/MovementCard";
import { Movement } from "../types/movement";
//import RepButton from "../components/repButton/RepButton";

const Workout: React.FC = () => {
  const navigate = useNavigate();

  const [movements, setMovements] = useState<Movement[]>([]);
  const [bodyWeight, setBodyWeight] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");

  const addMovement = () => {
    const newMovement: Movement = {
      movement_id: Date.now(),
      movement_type_id: 1,
      movement_type_name: "Chest Press",
      sets: []
    };
    console.log(newMovement);
    setMovements([...movements, newMovement]);
    console.log('hi');
  };

  const removeMovement = (id: number) => {
    setMovements(movements.filter((movement) => movement.movement_id !== id));
  };

  const handleSubmit = async () => {
    console.log("Submitting workout data...");
    const Workout = {
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
        body: JSON.stringify(Workout),
      });

      if (response.ok) {
        alert("Workout saved!");
        setBodyWeight("");
        setWorkoutType("");
        setNotes("");
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
        <div className="space-y-4">
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
        <div className="movementList">
          {movements.map((movement) => (
            <MovementCard
              key={movement.movement_id}
              name={movement.movement_type_name}
              weight={105}
              onRemove={() => removeMovement(movement.movement_id)}
            />
          ))}

        </div>
        <div>
          <Button label="+" onClick={addMovement}/>
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2"
          />
        </div>
        <Button label="Save" onClick={handleSubmit}/>
      </div>
    </Layout>
  );
};

export default Workout;
