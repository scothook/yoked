import styles from "./WorkoutCard.module.css";
import { Movement } from "../../types/movement.tsx";
import { WorkoutType } from "../../types/workoutType.tsx";
import Card from "../card/Card.tsx";

interface WorkoutSummaryCardProps {
    children?: React.ReactNode;
    workoutTypes?: WorkoutType[];
    date: string; // e.g. '2025-04-06'
    bodyWeight?: number; // optional, in lbs or kg
    workoutType: string; // e.g. 'Push Day', 'Legs', 'Cardio'
    movements: Movement[]; // e.g. ['Bench Press 3x10', 'Overhead Press 3x8']
    notes?: string; // optional notes
    editable?: boolean; // optional prop to indicate if the card is editable
    onClick?: () => void; // optional click handler
    onChange?: (updated: Partial<WorkoutCardData>) => void; // optional change handler
  }

  type WorkoutCardData = {
    date: string;
    bodyWeight?: number;
    workoutType: string;
    notes?: string;
  };

export default function WorkoutCard({ children, workoutTypes, date, bodyWeight, workoutType, movements, notes, editable, onClick, onChange }: WorkoutSummaryCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={`${styles.workoutCard} ${editable ? styles.editable : ''}`}
    >
      <div className={styles.header}>
        {editable ? (
          <input
            type="date"
            value={date}
            onChange={(e) => onChange?.({ date: e.target.value })}
          />
        ) : (
          <span>{date}</span>
        )}

        {editable ? (
          <input
            type="number"
            value={bodyWeight || ''}
            placeholder="Body weight"
            onChange={(e) => onChange?.({ bodyWeight: Number(e.target.value) })}
          />
        ) : (
          bodyWeight && <span>{bodyWeight} lbs</span>
        )}
      </div>
      <hr />
      <div className={styles.workoutType}>
        {editable ? (
          <select
            value={workoutType}
            onChange={(e) => onChange?.({ workoutType: e.target.value })}
            className="border p-2"
          >
            {workoutTypes && workoutTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.workout_type_name}
              </option>
            ))}
          </select>
        ) : (
          workoutType
        )}
      </div>

      <ul className={styles.movements}>
        {movements.map((movement) => (
          <li className={styles.movementItem} key={movement.id}>
            <div>{movement.movement_type_name}</div>
          </li>
        ))}
      </ul>

      {notes &&
        (editable ? (
          <textarea
            value={notes}
            style={{ width: '100%', height: '150px', padding: '8px' }}
            onChange={(e) => onChange?.({ notes: e.target.value })}
          />
        ) : (
          <div className={styles.notes}>{notes}</div>
        ))}
      {children && <div className={styles.children}>{children}</div>}
    </Card>
  );
}