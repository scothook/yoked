import React, { useEffect, useState } from "react";
import { parseISO, format } from 'date-fns';
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
  const [showCalendarView, setShowCalendarView] = useState(false);

  const workoutDates = workouts.map(w => new Date(parseISO(w.date)).toDateString());

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("https://yoked-backend-production.up.railway.app/api/workouts");
        if (!response.ok) throw new Error("Failed to fetch workouts");

        const data: Workout[] = await response.json();

        const sortedWorkouts = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        console.log(data[0].date);

        setWorkouts(sortedWorkouts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowCalendarView(e.target.checked);
  };

  const workoutsByDate = new Map(
    workouts.map(w => [new Date(w.date).toDateString(), w])
  );

  const handleDayClick = (date : Date) => {
    const workoutByDate = workoutsByDate.get(date.toDateString())
    if (workoutByDate) {
      navigate(`/current-workout/`, { state: { workoutId: workoutByDate.id }})
    }
  }

  return (
    <Layout>
      <PageHeader title="previous workouts" cornerTitle=""/>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <label className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          checked={showCalendarView}
          onChange={handleToggle}
        />
      </label>
      <div style={{ width: "100%"}}>
      { showCalendarView ? (
        <Calendar
          onClickDay={handleDayClick}
          tileClassName={({ date, view }) => {
            if (view === 'month' && workoutDates.includes(date.toDateString())) {
              return 'workout-day';
            }
            return null;
          }}
        />
      ) : (
        <ul style={{width: "95%", textAlign: "center", padding: "0", display: "inline-block", justifyContent: "center" }}>
          {workouts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map(workout => (
            <li key={workout.id} style={{listStyleType: "none", display: "inlineBlock", margin: "1rem"}}>
              <WorkoutCard
                date={format(parseISO(workout.date), "M/d")}
                bodyWeight={workout.body_weight}
                workoutType={workout.workout_type_name}
                movements={workout.movements}
                notes={workout.notes}
                onClick={() => navigate(`/current-workout/`, { state: { workoutId: workout.id }})}
                />
            </li>
          ))}
        </ul>
      )}
    </div>
    </Layout>
  );
};

export default PreviousWorkouts;
