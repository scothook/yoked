import { Set } from './set.ts'

export interface Movement {
  id: number;
  workout_id?: number; // Optional, used when creating a new workout
  notes: string; // Optional notes for the movement
  movement_type_id: number;
  movement_type_name: string;
  sets: Set[]; // Array of sets associated with this movement
}