// src/pages/Workout.tsx
import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";
import MovementCard from "../components/movementCard/MovementCard";
import { Movement } from "../types/movement";
import { Workout } from "../types/workout";
import PageHeader from "../components/pageHeader/PageHeader";
//import RepButton from "../components/repButton/RepButton";

const CurrentWorkout: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [workoutId, setWorkoutId] = useState(location.state?.workoutId ?? "");

  const [workout, setWorkout] = useState<Workout | null>(null);
  //const [workoutId, setWorkoutId] = useState<number | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [bodyWeight, setBodyWeight] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchWorkout = async () => {
      if (!workoutId) {
        console.log("No workout ID provided");
        return;
      }

      try {
        const res = await fetch(`https://yoked-backend-production.up.railway.app/api/workouts/${workoutId}`);
        const data = await res.json();
        setWorkout(data[0]);
      } catch (err) {
        console.error("Error fetching workout:", err);
      }
    };

    fetchWorkout();
  }, [workoutId])

  const addMovement = () => {
    const newMovement: Movement = {
      id: Date.now(),
      movement_type_id: 1,
      movement_type_name: "Chest Press",
      sets: []
    };
    console.log(newMovement);
    setMovements([...movements, newMovement]);
    console.log('hi');
  };

  const removeMovement = (id: number) => {
    setMovements(movements.filter((movement) => movement.id !== id));
  };
/*
  const getWorkoutData = async () => {
    try {
      const response = await fetch("https://yoked-backend-production.up.railway.app/api/workouts");
      const data = await response.json();
      //setWorkout(data[0]);
      console.log(workout);
      //setWorkoutId(data[0].workout_id);
    } catch (error) {
      console.error("Error fetching workout data:", error);
    }
  }; */

  const handleSubmit = async () => {
    console.log("Submitting workout data...");
    const WorkoutSubmission = {
      body_weight: parseFloat(bodyWeight),
      workout_type_id: parseFloat(workoutType),
      notes,
      date
    };

    try {
      const res = workoutId
        ? await fetch(`https://yoked-backend-production.up.railway.app/api/workouts/${workoutId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(WorkoutSubmission),
          })
        : await fetch("https://yoked-backend-production.up.railway.app/api/workouts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(WorkoutSubmission),
          });
  
      const data = await res.json();
      console.log("Workout saved:", data);
  
      // ✅ If just created a new workout, store the new ID
      if (!workoutId && data.id) {
        setWorkoutId(data.id);
      }
    } catch (err) {
      console.error("Error saving workout", err);
    }
/*
    try {
      const response = await fetch("https://yoked-backend-production.up.railway.app/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(WorkoutSubmission),
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
    } */
  };

  return (
    <Layout>
      <PageHeader title={workout ? new Date(workout.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }) : 'new workout'}/>
      <Button label="← Back" onClick={() => navigate(-1)}/>
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
              key={movement.id}
              name={movement.movement_type_name}
              weight={105}
              onRemove={() => removeMovement(movement.id)}
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

export default CurrentWorkout;
