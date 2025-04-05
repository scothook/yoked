import styles from "./WeightSet.module.css";
import RepSet from "../repSet/RepSet";

interface WeightSetProps {
    weight: number;
}

export default function WeightSet({ weight }: WeightSetProps) {
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
        </div>
    )
}