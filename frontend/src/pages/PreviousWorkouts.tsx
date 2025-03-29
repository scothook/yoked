import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Workout } from "../types/workout"; // Import the interface
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";

const PreviousWorkouts: React.FC = () => {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("https://yoked-backend-production.up.railway.app/api/workouts");
        if (!response.ok) throw new Error("Failed to fetch workouts");

        const data: Workout[] = await response.json();

        const sortedWorkouts = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setWorkouts(sortedWorkouts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <Layout>
      <h1>Previous Workouts</h1>
      <Button label="Back" onClick={() => navigate("/")}/>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout.workout_id}>
            <strong>{workout.workout_id}</strong> - {new Date(workout.date).toLocaleDateString()} - {workout.body_weight} lbs - {workout.type_name}
          </li>
        ))}
      </ul>

      <div>
      <h1>Workouts</h1>
      <ul>
        {workouts.map(workout => (
          <li key={workout.workout_id}>
            <div>
              <h2>{new Date(workout.date).toLocaleDateString()}</h2>
              <p>Body Weight: {workout.body_weight} lbs</p>
              <p>Workout Type: {workout.workout_type_name}</p>
              <h3>Movements:</h3>
              <ul>
                {workout.movements.map(movement => (
                  <li key={movement.movement_id}>
                    <div>
                      <h4>{movement.movement_type_name}</h4>
                      <h5>Sets:</h5>
                      <ul>
                        {movement.sets.map(set => (
                          <li key={set.set_id}>
                            Set {set.set_id}: {set.reps} reps
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
};

export default PreviousWorkouts;
