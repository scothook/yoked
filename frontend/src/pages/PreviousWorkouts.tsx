import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Workout } from "../types/workout"; // Import the interface
import Layout from "../components/layout/Layout";
import WorkoutCard from "../components/workoutCard/WorkoutCard";
import PageHeader from "../components/pageHeader/PageHeader";

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
      <PageHeader title="previous workouts" />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div style={{ width: "100%"}}>
        <ul style={{width: "95%", textAlign: "center", padding: "0", display: "inline-block", justifyContent: "center" }}>
          {workouts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map(workout => (
            <li key={workout.id} style={{listStyleType: "none", display: "inlineBlock", margin: "1rem"}}>
              <WorkoutCard
                date={workout.date} // Placeholder date
                bodyWeight={workout.body_weight} // Placeholder body weight
                workoutType={workout.workout_type_name} // Placeholder workout type
                movements={workout.movements} // Placeholder movements
                notes={workout.notes} // Placeholder notes
                onClick={() => navigate(`/current-workout/`, { state: { workoutId: workout.id }})}
                />
            </li>
          ))}
        </ul>
    </div>
    </Layout>
  );
};

export default PreviousWorkouts;
