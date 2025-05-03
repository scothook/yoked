import styles from "./SetTile.module.css";
//import RepSet from "../repSet/RepSet";

interface WeightSetProps {
    onRemove: () => void;
}

export default function WeightSet({ onRemove }: WeightSetProps) {
    return (
        <div className={styles.weightSet}>
            <h4>setTile</h4>
            <button className={styles.addRepSetBtn} onClick={onRemove}>-</button>
        </div>
    )
}