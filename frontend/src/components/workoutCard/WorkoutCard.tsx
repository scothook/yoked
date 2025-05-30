import styles from "./WorkoutCard.module.css";
import { Movement } from "../../types/movement.tsx";
import Card from "../card/Card.tsx";

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
    <Card onClick={onClick}>
      <div className={styles.header}>
      <span>{date}</span>
        {bodyWeight && <span>{bodyWeight} lbs</span>}
      </div>
      <hr/>
      <div className={styles.workoutType}>{workoutType}</div>
      <ul className={styles.movements}>
        {movements.map(movement => (
          <li className={styles.movementItem} key={movement.id}>
            <div>
                {movement.movement_type_name}
            </div>
          </li>
        ))}
      </ul>
      {notes && <div className={styles.notes}>{notes}</div>}
  </Card>
  );
}