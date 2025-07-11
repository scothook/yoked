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
import { MovementType } from "../types/movementType.ts";
import PageHeader from "../components/pageHeader/PageHeader";
//import RepButton from "../components/repButton/RepButton";

const CurrentWorkout: React.FC = () => {
  const location = useLocation();
  const [workoutId, setWorkoutId] = useState(location.state?.workoutId ?? "");
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [movementTypes, setMovementTypes] = useState<MovementType[]>([]);

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
    };

    async function fetchMovementTypes() {
      const res = await fetch("https://yoked-backend-production.up.railway.app/api/movement_types");
      const data = await res.json();
      setMovementTypes(data);
    };

    fetchWorkout();
    fetchWorkoutTypes();
    fetchMovementTypes();
  }, [workoutId])

  const addMovement = () => {
    const newMovement: Movement = {
      id: Date.now(),
      movement_type_id: 1,
      movement_type_name: "Chest Press",
      notes: "",
      sets: []
    };
    setMovements([...movements, newMovement]);
  };

  const removeMovement = (id: number) => {
    setMovements(movements.filter((movement) => movement.id !== id));
  };

  const handleSubmit = async () => {
    const WorkoutSubmission = {
      body_weight: bodyWeight === "" ? undefined : parseFloat(bodyWeight),
      workout_type_id: workoutType === "" ? undefined : workoutType,
      notes: notes === "" ? undefined : notes,
      date: date === "" ? undefined : date,
      movements: movements.map((movement) => ({
        id: movement.id,
        workout_id: workoutId || undefined, // If creating a new workout, this will be undefined
        notes: movement.notes || "movement notes",
        movement_type_id: movement.movement_type_id,
        movement_type_name: movement.movement_type_name
      }))
    };
    console.log("Submitting workout data...", WorkoutSubmission);

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
      console.log("Workout saved.", data);
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
      <ul style={{width: "100%", textAlign: "center", padding: "0", display: "inline-block", justifyContent: "center", margin: "0 auto"}}>
        <li style={{listStyleType: "none", display: "inlineBlock", margin: "1rem"}}>
          <WorkoutCard
            workoutTypes={workoutTypes}
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
                  id={movement.id}
                  movement_type_name={movement.movement_type_name}
                  movement_type_id={movement.movement_type_id}
                  weight={105} // Placeholder weight, replace with actual logic
                  notes={movement.notes}
                  movementTypes={movementTypes}
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
        </li>
      </ul>
    </Layout>
  );
};

export default CurrentWorkout;
