//import React from "react";
import styles from "./MovementCard.module.css";
import MovementHeader from "../movementHeader/MovementHeader.tsx";
import WeightSet from "../weightSet/WeightSet";
import { MovementType } from "../../types/movementType.ts";
//import { Set } from "../types/set";

interface MovementCardProps {
  children?: React.ReactNode;
  id: number;
  movement_type_name: string;
  movement_type_id: number;
  weight: number;
  notes: string;
  movementTypes?: MovementType[];
  onChange?: (updatedMovement: Partial<MovementCardProps>) => void;
  onRemove: () => void;
}

export default function MovementCard({ children, movement_type_name, weight, notes, movementTypes, onChange, onRemove }: MovementCardProps) {
  return (
    <div className={styles.movementCard}>
      {movement_type_name}
      <MovementHeader
        name={movement_type_name}
        onRemove={onRemove}
        />
      <select
        value={movement_type_name}
        onChange={(e) => {
          const selectedName = e.target.value;
          const selectedType = movementTypes?.find(type => type.movement_type_name === selectedName);
          onChange?.({
            movement_type_name: selectedName,
            movement_type_id: selectedType?.id, // include this
          });
        }}
      >
        {movementTypes?.map((type) => (
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
