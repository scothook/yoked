import styles from "./WeightSet.module.css";
import RepSet from "../repSet/RepSet";

interface WeightSetProps {
    weight: number;
    onRemove?: () => void;
}

export default function WeightSet({ weight, onRemove }: WeightSetProps) {
    return (
        <div className={styles.weightSet}>
            <h4>{weight}</h4>
            <RepSet
                initialReps={5}
            />
            <RepSet
                initialReps={5}
            />
            <button className={styles.addRepSetBtn}>+</button>
            <button className={styles.removeWeightSetBtn} onClick={onRemove}>-</button>
        </div>
    )
}