import styles from "./WorkoutCard.module.css";
import { Movement } from "../../types/movement.tsx";

interface WorkoutSummaryCardProps {
    date: string; // e.g. '2025-04-06'
    bodyWeight?: number; // optional, in lbs or kg
    workoutType: string; // e.g. 'Push Day', 'Legs', 'Cardio'
    movements: Movement[]; // e.g. ['Bench Press 3x10', 'Overhead Press 3x8']
    notes?: string; // optional notes
    onClick?: () => void; // optional click handler
  }

export default function WorkoutCard({ date, bodyWeight, workoutType, movements, notes, onClick }: WorkoutSummaryCardProps) {
    return (
        <div className={styles.card} onClick={onClick}>
          <div className={styles.header}>
            <span>{new Date(date).toLocaleDateString()}</span>
            {bodyWeight && <span>{bodyWeight} lbs</span>}
          </div>
          <hr/>
          <div className={styles.workoutType}>{workoutType}</div>
          <ul className={styles.movements}>
            {movements.map(movement => (
              <li key={movement.id}>
                <div>
                  <p>
                    {movement.movement_type_name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {notes && <div className={styles.notes}>{notes}</div>}
      </div>
  );
}