import React, { useEffect, useState } from "react";
import { parseISO, format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import { Workout } from "../types/workout"; // Import the interface
import Layout from "../components/layout/Layout";
import WorkoutCard from "../components/workoutCard/WorkoutCard";
import PageHeader from "../components/pageHeader/PageHeader";
import WorkoutModal from "../components/dateWorkoutSelectorModal/DateWorkoutSelectorModal";
import '../styles/WorkoutCalendar.css'

const PreviousWorkouts: React.FC = () => {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  const workoutsByDate = workouts.reduce((map, workout) => {
    const dateKey = new Date(parseISO(workout.date)).toDateString();
  
    if (!map.has(dateKey)) {
      map.set(dateKey, []);
    }
  
    map.get(dateKey).push(workout);
    return map;
  }, new Map());  

  const handleDayClick = (date : Date) => {
    const workoutsByClickedDate = workoutsByDate.get(date.toDateString()) || [];

    console.log(workoutsByClickedDate);
    if (workoutsByClickedDate.length === 1) {
      navigate(`/current-workout/`, { state: { workoutId: workoutsByClickedDate[0].id }})
    } else if (workoutsByClickedDate.length > 1) {
      setSelectedDate(date);
      setDropdownVisible(true);
    } else {
      setSelectedDate(null);
      setDropdownVisible(false);
    }

    if (workoutsByClickedDate) {
      //navigate(`/current-workout/`, { state: { workoutId: workoutByDate.id }})
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
        <div className='calendarCard'>
          <Calendar
            onClickDay={handleDayClick}
            tileClassName={({ date, view }) => {
              if (view === 'month' && workoutDates.includes(date.toDateString())) {
                return 'workout-day';
              }
              return null;
            }}
          />
          {dropdownVisible && selectedDate && (
            <WorkoutModal
              workouts={workoutsByDate.get(selectedDate.toDateString())}
              onClose={() => setDropdownVisible(false)}
              onSelect={(workout) => {
                console.log(workout);
                navigate(`/current-workout/`, { state: { workoutId: workout.id }})
              }}
            />
          )}
        </div>
        
      ) : (
        <ul style={{width: "95%", textAlign: "center", padding: "0", display: "inline-block", justifyContent: "center", margin: "0 auto"}}>
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
