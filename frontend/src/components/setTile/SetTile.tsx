import styles from "./SetTile.module.css";
import { useState } from "react";
//import RepSet from "../repSet/RepSet";

interface SetTileProps {
    // id: number;
    // movementId: number;
    // reps: number;
    // weight: number;
    // order: number;
    initialWeight: number;
    initialReps: number;

    onRemove: () => void;
}

export default function SetTile({ initialWeight, initialReps, onRemove }: SetTileProps) {
    const [reps, setReps] = useState(initialReps);
    const [weight, setWeight] = useState(initialWeight.toString());

    return (
        <div className={styles.SetTile}>
            <h4>setTile</h4>
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border p-2"
            />
            <button onClick={() => setReps(reps + 1)}>plus reps</button>
            <button onClick={() => setReps(reps - 1)}>minus reps</button>
            <h5>{reps}</h5>
            <button className={styles.addRepSetBtn} onClick={onRemove}>-</button>
        </div>
    )
}