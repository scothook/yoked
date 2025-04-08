import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Workout } from "../types/workout"; // Import the interface
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";
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
      <ul>
        {workouts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(workout => (
          <li key={workout.id}>
            <div>
              <Button label="View" onClick={() => navigate(`/current-workout/`, { state: { workoutId: workout.id }})}/>
              <h2>{new Date(workout.date).toLocaleDateString()}</h2>
              <h3>Body Weight: {workout.body_weight} lbs</h3>
              <h3>{workout.workout_type_name}</h3>
              <p>{workout.notes}</p>
              <ul>
                {workout.movements.map(movement => (
                  <li key={movement.id}>
                    <div>
                      <p>
                        {movement.movement_type_name}
                      </p>
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
