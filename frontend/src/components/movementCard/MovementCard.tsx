//import React from "react";
import styles from "./MovementCard.module.css";
import MovementHeader from "../movementHeader/MovementHeader.tsx";
import WeightSet from "../weightSet/WeightSet";
import { MovementType } from "../../types/movementType.ts";
//import { Set } from "../types/set";

interface MovementCardProps {
  children?: React.ReactNode;
  name: string;
  weight: number;
  notes: string;
  movementTypes?: MovementType[];
  onChange?: (updatedMovement: Partial<MovementCardProps>) => void;
  onRemove: () => void;
}

export default function MovementCard({ children, name, weight, notes, movementTypes, onChange, onRemove }: MovementCardProps) {
  return (
    <div className={styles.movementCard}>
      {name}
      <MovementHeader
        name={name}
        onRemove={onRemove}
        />
      <select
        value={name}
        onChange={(e) => onChange?.({ name: e.target.value })}
        className="border p-2"
      >
        {movementTypes && movementTypes.map((type) => (
          <option key={type.id} value={type.movement_type_name}>
            {type.movement_type_name}
          </option>
        ))}
      </select>
      <div className={styles.weightSetList}>
      <WeightSet
        weight={weight}/>
      <textarea
            value={notes}
            style={{ width: '100%', height: '150px', padding: '8px' }}
            onChange={(e) => onChange?.({ notes: e.target.value })}
        />
      </div>
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
}
