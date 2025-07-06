import { useEffect, useState } from "react";
import { Workout } from "../types/workout";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("https://yoked-backend-production.up.railway.app/api/workouts");
        if (!response.ok) throw new Error("Failed to fetch workouts");

        const data: Workout[] = await response.json();
        const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setWorkouts(sorted);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return { workouts, loading, error };
};
