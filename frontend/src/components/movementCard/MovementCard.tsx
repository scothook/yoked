//import React from "react";
import styles from "./MovementCard.module.css";
import MovementHeader from "../movementHeader/MovementHeader.tsx";
//import WeightSet from "../weightSet/WeightSet";
import { Set } from "../../types/set.ts";
import Button from "../button/Button";
import React from "react";
import SetTile from "../setTile/SetTile.tsx";
import { Movement } from "../../types/movement.ts";

interface MovementCardProps {
  // id: number;
  // workoutId: number;
  // movementType
  // notes
  // sets: Set[];
  movement: Movement;
  index: number;
  onUpdate: (fields: Partial<Movement>) => void;
  onRemove: () => void;
  onUpdateSet: (setIndex: number, fields: Partial<Set>) => void;
  onRemoveSet: (setIndex: number) => void;
  onAddSet: () => void;
}

export default function MovementCard({ movement, index, onUpdate, onRemove, onUpdateSet, onRemoveSet, onAddSet }: MovementCardProps) {
  const [sets, setSets] = React.useState<Set[]>([]);
  //const [movementType, setMovementType] = React.useState(initialMovementType);
  //const MovementTypes = ["Chest Press", "Low Row", "Squat"];

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
        name={movement.movement_type_name}
        onRemove={onRemove}
        />
      <div className={styles.setList}>
        {sets.map((set) => (
          <SetTile key={set.id} onRemove={() => removeSet(set.id)} initialWeight={105} initialReps={8}></SetTile>
        ))}
        {movement.sets.map((set, setIndex) => (
          <SetTile
            key={set.id}
            set={set}
            index={setIndex}
            onUpdate={(fields) => onUpdateSet(setIndex, fields)}
            onRemove={() => onRemoveSet(setIndex)}
          />
        ))}
      </div>
      {index}
      <div>
        <Button label="+" onClick={addSet} />
      </div>
    </div>
  );
}
