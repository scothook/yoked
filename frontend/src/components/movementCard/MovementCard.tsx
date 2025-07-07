//import React from "react";
import styles from "./MovementCard.module.css";
import MovementHeader from "../movementHeader/MovementHeader.tsx";
import WeightSet from "../weightSet/WeightSet";
//import { Set } from "../types/set";

interface MovementCardProps {
  name: string;
  weight: number;
  notes: string;
  onChange?: (updatedMovement: Partial<MovementCardProps>) => void;
  onRemove: () => void;
}

export default function MovementCard({ name, weight, notes, onChange, onRemove }: MovementCardProps) {
  return (
    <div className={styles.movementCard}>
      <MovementHeader
        name={name}
        onRemove={onRemove}
        />
      <div className={styles.weightSetList}>
      <WeightSet
        weight={weight}/>
      <textarea
            value={notes}
            style={{ width: '100%', height: '150px', padding: '8px' }}
            onChange={(e) => onChange?.({ notes: e.target.value })}
        />
      </div>
    </div>
  );
}
