// React and core libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Third-party libraries
import { parseISO, format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Drawer from '@mui/material/Drawer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableRows from '@mui/icons-material/TableRows';

// Types & Utilities
import { useWorkouts } from "../hooks/useWorkouts.ts";
import { getFilteredWorkouts, getWorkoutDates, groupWorkoutsByDate } from "../utils/workoutFilters.ts";

// Components (ordered by relative importance or hierarchy)
import Layout from "../components/layout/Layout";
import PageHeader from "../components/pageHeader/PageHeader";
import WorkoutCard from "../components/workoutCard/WorkoutCard";
import WorkoutModal from "../components/dateWorkoutSelectorModal/DateWorkoutSelectorModal";

// Styles
import '../styles/WorkoutCalendar.css';

const PastWorkouts: React.FC = () => {
  const navigate = useNavigate(); // Navigation hook for routing
  const { workouts, loading, error } = useWorkouts(); // Custom hook to fetch workouts

  const [selectedWorkoutType, setSelectedWorkoutType] = useState("All"); // State for selected workout type

  const uniqueWorkoutTypes = ["All", ...new Set(workouts.map(workout => workout.workout_type_name))]; // Get unique workout types including "All"

  // Filter workouts based on selected workout type
  const filteredWorkouts = getFilteredWorkouts(workouts, selectedWorkoutType);
  const filteredWorkoutDates = getWorkoutDates(filteredWorkouts); //calendar only
  const filteredWorkoutsByDate = groupWorkoutsByDate(filteredWorkouts); //calendar only

  // Drawer stuff
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (newDrawerOpen: boolean) => () => {
    setDrawerOpen(newDrawerOpen);
  };

  // Calendar stuff
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDayClick = (date : Date) => {
    const workoutsByClickedDate = filteredWorkoutsByDate.get(date.toDateString()) || [];

    if (workoutsByClickedDate.length === 1) {
      navigate(`/current-workout/`, { state: { workoutId: workoutsByClickedDate[0].id }})
    } else if (workoutsByClickedDate.length > 1) {
      setSelectedDate(date);
      setDropdownVisible(true);
    } else {
      setSelectedDate(null);
      setDropdownVisible(false);
    }
  }

  return (
    <Layout>
      <PageHeader title="past workouts" cornerTitle="" variant="hamburger" cornerTitleOnClick={toggleDrawer(true)}/>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <div style={{ width: "100%"}}>
        <select
            value={selectedWorkoutType}
            onChange={(e) => setSelectedWorkoutType(e.target.value)}
            className="border px-2 py-1 mb-4"
          >
            {uniqueWorkoutTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
        </select>
        { showCalendarView ? (
        <div className='calendarCard'>
          <Calendar
            onClickDay={handleDayClick}
            tileClassName={({ date, view }) => {
              if (view === 'month' && filteredWorkoutDates.includes(date.toDateString())) {
                return 'workout-day';
              }
              return null;
            }}
          />
          {dropdownVisible && selectedDate && (
            <WorkoutModal
              workouts={filteredWorkoutsByDate.get(selectedDate.toDateString())}
              onClose={() => setDropdownVisible(false)}
              onSelect={(workout) => {
                navigate(`/current-workout/`, { state: { workoutId: workout.id }})
              }}
            />
          )}
        </div>
        
        ) : (
        <ul style={{width: "100%", textAlign: "center", padding: "0", display: "inline-block", justifyContent: "center", margin: "0 auto"}}>
          {filteredWorkouts
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
      <Drawer 
        anchor={'right'} 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
      >
        <div>
          <CalendarMonthIcon 
            className="calendarIcon" 
            onClick={() => {
              setShowCalendarView(true);
              toggleDrawer(false)();
            }}
          />
          Calendar
        </div>

        <div>
          <TableRows 
            className="tableIcon" 
            onClick={() => {
              setShowCalendarView(false); 
              toggleDrawer(false)();
            }}
          />
          Table
        </div>
      </Drawer>
    </Layout>
  );
};

export default PastWorkouts;
