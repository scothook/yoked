export interface Workout {
  workout_id: number;
  date: string; // Should be an ISO date string (e.g., "2025-03-22T10:00:00Z")
  body_weight: number;
  workout_type_name: string;
  movements: Movement[]; // Array of movements associated with this workout
}

export interface Movement {
  movement_id: number;
  movement_type_id: number;
  movement_type_name: string;
  sets: Set[]; // Array of sets associated with this movement
}

export interface Set {
  set_id: number;
  reps: number;
}
