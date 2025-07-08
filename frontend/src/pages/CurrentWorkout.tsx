// src/pages/Workout.tsx
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";
import MovementCard from "../components/movementCard/MovementCard";
import WorkoutCard from "../components/workoutCard/WorkoutCard";
import { Movement } from "../types/movement";
import { Workout } from "../types/workout";
import { WorkoutType } from "../types/workoutType";
import PageHeader from "../components/pageHeader/PageHeader";
//import RepButton from "../components/repButton/RepButton";

const CurrentWorkout: React.FC = () => {
  const location = useLocation();
  const [workoutId, setWorkoutId] = useState(location.state?.workoutId ?? "");
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);

  //const [loading, setLoading] = useState(true);
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
        setBodyWeight("100");
        setWorkoutType("1");
        setNotes("notes");
        setDate("2025-06-06");
        return;
      }

      try {
        const res = await fetch(`https://yoked-backend-production.up.railway.app/api/workouts/${workoutId}`);
        const data = await res.json();
        const workoutJson = data[0];
        setWorkout(workoutJson);
        console.log("Fetched workout:", workoutJson);
        const formattedDate = new Date(workoutJson.date).toISOString().split('T')[0];
        setDate(formattedDate);
        setBodyWeight(workoutJson.body_weight);
        setWorkoutType(workoutJson.workout_type_id);
        setNotes(workoutJson.notes);
        setMovements(workoutJson.movements || []);
      } catch (err) {
        console.error("Error fetching workout:", err);
      } finally {
        //setLoading(false);
      }
    };

    async function fetchWorkoutTypes() {
      const res = await fetch("https://yoked-backend-production.up.railway.app/api/workout_types");
      const data = await res.json();
      setWorkoutTypes(data);
      console.log("Fetched workout types:", data);
    };

    fetchWorkout();
    fetchWorkoutTypes();
  }, [workoutId])

  const addMovement = () => {
    const newMovement: Movement = {
      id: Date.now(),
      movement_type_id: 1,
      movement_type_name: "Chest Press",
      notes: "",
      sets: []
    };
    console.log(newMovement);
    setMovements([...movements, newMovement]);
  };

  const removeMovement = (id: number) => {
    setMovements(movements.filter((movement) => movement.id !== id));
  };

  const handleSubmit = async () => {
    console.log("Submitting workout data...");
    console.log(movements);
    const WorkoutSubmission = {
      body_weight: bodyWeight === "" ? undefined : parseFloat(bodyWeight),
      workout_type_id: workoutType === "" ? undefined : workoutType,
      notes: notes === "" ? undefined : notes,
      date: date === "" ? undefined : date,
      movements: movements.map((movement) => ({
        id: movement.id,
        workout_id: workoutId || undefined, // If creating a new workout, this will be undefined
        notes: movement.notes || "page notes",
        movement_type_id: movement.movement_type_id
      }))
    };

    try {
      const res = workoutId
        ? await fetch(`https://yoked-backend-production.up.railway.app/api/workouts/${workoutId}`, {
            method: "PATCH",
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
      alert("Workout saved!");
  
      // ✅ If just created a new workout, store the new ID
      if (!workoutId && data.id) {
        setWorkoutId(data.id);
      }
    } catch (err) {
      console.error("Error saving workout", err);
      alert("Something went wrong while saving the workout.");
    }
  };

  return (
    <Layout>
          <PageHeader 
            title={workout ? workoutTypes.find(type => type.id === Number(workoutType))?.workout_type_name || "Generic Workout" : 'new workout'} 
            //cornerTitle={date ? `${+date.split('-')[1]}/${+date.split('-')[2]}` : ''} 
            //cornerTitleOnClick={() => {}}
            variant={"save"}
            cornerTitleOnClick={handleSubmit}
          />
            
      <WorkoutCard
        date={date}
        bodyWeight={parseInt(bodyWeight)}
        workoutType={workoutType}
        movements={movements}
        notes={notes}
        editable={true}
        onChange={(updated) => {
          if (updated.date) setDate(updated.date);
          if (updated.bodyWeight) setBodyWeight(updated.bodyWeight.toString());
          if (updated.workoutType) setWorkoutType(updated.workoutType);
          if (updated.notes) setNotes(updated.notes);
        }}
        onClick={() => {}}
      >
        {movements.length > 0 ? (
          movements.map((movement) => (
            <MovementCard
              key={movement.id}
              name={movement.movement_type_name}
              weight={105} // Placeholder weight, replace with actual logic
              notes={movement.notes}
              onChange={(updatedMovement) => {
                setMovements(movements.map(m => m.id === movement.id ? { ...m, ...updatedMovement } : m));
              }}
              onRemove={() => removeMovement(movement.id)}
            />
          ))
        ) : (
          <div className="text-gray-500">No movements added yet</div>
        )}
        <div>
          <Button label="+" onClick={addMovement}/>
        </div>
      </WorkoutCard>
      <div className="space-y-4">
        <div>
          <select
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
            className="border p-2"
          >
            {workoutTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.workout_type_name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default CurrentWorkout;
