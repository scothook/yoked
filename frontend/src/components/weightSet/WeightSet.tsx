import { useState } from "react";
import styles from "./WeightSet.module.css";

interface WeightSetProps {
  reps: number;
  weight: number;
  onRemove?: () => void;
  onChange?: (updatedSet: { reps: number; weight: number }) => void;
}

export default function WeightSet({ reps, weight, onRemove, onChange }: WeightSetProps) {
  const [editableWeight, setEditableWeight] = useState(weight);
  const [editableReps, setEditableReps] = useState(reps);

  // Optional: Inform parent of changes when either value changes
/*  useEffect(() => {
    if (onUpdate) {
      onUpdate({ reps: editableReps, weight: editableWeight });
    }
  }, [editableReps, editableWeight]);*/

  return (
    <div className={styles.weightSet}>
      <input
        type="number"
        value={editableWeight}
        onChange={(e) => {
            const newWeight = Number(e.target.value);
            setEditableWeight(newWeight);
            onChange?.({ reps: editableReps, weight: newWeight });
        }}
        className={styles.input}
        aria-label="Weight"
      />
      <span>lbs | </span>
      <input
        type="number"
        value={editableReps}
        onChange={(e) => {
            const newReps = Number(e.target.value);
            setEditableReps(newReps);
            onChange?.({ reps: newReps, weight: editableWeight });
        }}
        className={styles.input}
        aria-label="Reps"
      />
      <button className={styles.removeWeightSetBtn} onClick={onRemove}>-</button>
    </div>
  );
}
