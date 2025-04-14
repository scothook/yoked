import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import { Workout } from "../types/workout"; // Import the interface
import Layout from "../components/layout/Layout";
import WorkoutCard from "../components/workoutCard/WorkoutCard";
import PageHeader from "../components/pageHeader/PageHeader";
import '../styles/WorkoutCalendar.css'

const PreviousWorkouts: React.FC = () => {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const workoutDates = workouts.map(w => new Date(w.date).toDateString());

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
      <PageHeader title="previous workouts" cornerTitle=""/>
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
        <Calendar
          tileClassName={({ date, view }) => {
            if (view === 'month' && workoutDates.includes(date.toDateString())) {
              return 'workout-day';
            }
            return null;
          }}
          />
    </div>
    </Layout>
  );
};

export default PreviousWorkouts;
