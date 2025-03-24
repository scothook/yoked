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
          <li key={workout.id}>
            <strong>{workout.id}</strong> - {new Date(workout.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default PreviousWorkouts;
