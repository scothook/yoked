import { Set } from './set.ts'

export interface Movement {
  id: number;
  movement_type_id: number;
  movement_type_name: string;
  sets: Set[]; // Array of sets associated with this movement
}