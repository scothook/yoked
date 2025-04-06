import { RepSet } from './repSet.ts'

export interface Movement {
  movement_id: number;
  movement_type_id: number;
  movement_type_name: string;
  sets: RepSet[]; // Array of sets associated with this movement
}