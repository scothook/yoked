import { Movement } from './movement.ts'

export interface Workout {
  id: number;
  date: string; // Should be an ISO date string (e.g., "2025-03-22T10:00:00Z")
  body_weight: number;
  workout_type_name: string;
  movements: Movement[]; // Array of movements associated with this workout
  notes: string;
}