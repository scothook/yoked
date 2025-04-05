//import React from "react";
import styles from "./MovementCard.module.css";
import MovementHeader from "../movementHeader/MovementHeader.tsx";
import WeightSet from "../weightSet/WeightSet";
//import { Set } from "../types/set";

interface MovementCardProps {
  name: string;
  weight: number;
  onRemove: () => void;
}

export default function MovementCard({ name, weight, onRemove }: MovementCardProps) {
  return (
    <div className={styles.movementCard}>
      <MovementHeader
        name={name}
        onRemove={onRemove}
        />
      <div className={styles.weightSetList}>
      <WeightSet
        weight={weight}/>
      </div>

      <button className={styles.addMovementBtn}>+</button>
    </div>
  );
}
