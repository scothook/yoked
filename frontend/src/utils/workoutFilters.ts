import { parseISO } from "date-fns";
import { Workout } from "../types/workout";

export const getFilteredWorkouts = (workouts: Workout[], selectedType: string): Workout[] => {
  return selectedType === "All"
    ? workouts
    : workouts.filter(w => w.workout_type_name === selectedType);
};

export const getWorkoutDates = (workouts: Workout[]): string[] => {
  return workouts.map(w => new Date(parseISO(w.date)).toDateString());
};

export const groupWorkoutsByDate = (workouts: Workout[]): Map<string, Workout[]> => {
  return workouts.reduce((map, workout) => {
    const dateKey = new Date(parseISO(workout.date)).toDateString();
    if (!map.has(dateKey)) map.set(dateKey, []);
    map.get(dateKey)!.push(workout);
    return map;
  }, new Map<string, Workout[]>());
};
