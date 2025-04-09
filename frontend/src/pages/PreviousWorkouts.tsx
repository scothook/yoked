import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Workout } from "../types/workout"; // Import the interface
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";
import WorkoutCard from "../components/workoutCard/WorkoutCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styles from "./PreviousWorkouts.module.css"; // Import your CSS file

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
      <div className="header" style={{ marginRight: "auto"}}>
        <div className="header-title" style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={() => navigate(-1)} variant="back"><ArrowBackIcon/></Button>
          <h2 style={{   position: "absolute", left: "50%", transform: "translateX(-50%)", minWidth: "220px" }}>previous workouts</h2>
        </div>
        <div className={styles.controls}>
          <label className={styles.toggleLabel}>
              <input type="checkbox" className={styles.viewToggle}/>
              <span className={styles.toggleSlider}></span>
          </label>
          <button className={styles.filterIcon}><FilterAltIcon/></button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
      <ul style={{ textAlign: "center", padding: "0", display: "inline-block", justifyContent: "center" }}>
        {workouts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(workout => (
          <li key={workout.id} style={{listStyleType: "none", display: "inlineBlock", margin: "10px"}}>
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
