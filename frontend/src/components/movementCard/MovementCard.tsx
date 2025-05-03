//import React from "react";
import styles from "./MovementCard.module.css";
import MovementHeader from "../movementHeader/MovementHeader.tsx";
//import WeightSet from "../weightSet/WeightSet";
import { Set } from "../../types/set.ts";
import Button from "../button/Button";
import React from "react";
import SetTile from "../setTile/SetTile.tsx";

interface MovementCardProps {
  // id: number;
  // workoutId: number;
  // movementType
  // notes
  // sets: Set[];
  name: string;
  onRemove: () => void;
}

export default function MovementCard({ name, onRemove }: MovementCardProps) {
  const [sets, setSets] = React.useState<Set[]>([]);

  const addSet = () => {
    const newSet: Set = {
      id: Date.now(),
      weight: 105,
      reps: 8,
      order: 1
    };
    setSets([...sets, newSet]);
  }

  const removeSet = (id: number) => {
    setSets(sets.filter(set => set.id !== id));
  };

  return (
    <div className={styles.movementCard}>
      <MovementHeader
        name={name}
        onRemove={onRemove}
        />
      <div className={styles.setList}>
        {sets.map((set) => (
          <div>
          <p>{set.id}</p>
          <SetTile onRemove={() => removeSet(set.id)} initialWeight={105} initialReps={8}></SetTile>
          </div>
        ))}
      </div>
      <div>
        <Button label="+" onClick={addSet} />
      </div>
    </div>
  );
}
