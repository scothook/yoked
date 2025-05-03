//import React from "react";
import styles from "./MovementCard.module.css";
import MovementHeader from "../movementHeader/MovementHeader.tsx";
//import WeightSet from "../weightSet/WeightSet";
import { Set } from "../types/set.ts";
import Button from "../button/Button";
import React from "react";

interface MovementCardProps {
  name: string;
  onRemove: () => void;
}

export default function MovementCard({ name, onRemove }: MovementCardProps) {
  const [sets, setSets] = React.useState<Set[]>([]);

  const addSet = () => {
    const newSet: Set = {
      id: Date.now(),
      weight: 105,
      reps: 8
    };
    setSets([...sets, newSet]);
  }

  return (
    <div className={styles.movementCard}>
      <MovementHeader
        name={name}
        onRemove={onRemove}
        />
      <div className={styles.setList}>
        {sets.map((set) => (
          <p>{set.id}</p>
        ))}
      </div>
      <div>
        <Button label="+" onClick={addSet} />
      </div>

      <button className={styles.addMovementBtn}>+</button>
    </div>
  );
}
