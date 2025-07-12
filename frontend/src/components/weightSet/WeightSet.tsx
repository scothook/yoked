import styles from "./WeightSet.module.css";
import RepSet from "../repSet/RepSet";

interface WeightSetProps {
    reps: number;
    weight: number;
    onRemove?: () => void;
}

export default function WeightSet({ reps, weight, onRemove }: WeightSetProps) {
    return (
        <div className={styles.weightSet}>
            <h4>{weight}</h4>
            <RepSet
                initialReps={reps}
            />
            <button className={styles.addRepSetBtn}>+</button>
            <button className={styles.removeWeightSetBtn} onClick={onRemove}>-</button>
        </div>
    )
}