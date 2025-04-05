//import React from "react";
import styles from "./MovementCard.module.css";
import MovementHeader from "../movementHeader/movementHeader";

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
        />
        <button className={styles.removeBtn} onClick={onRemove}>
          &minus;
        </button>
      <p>{weight} lbs</p>
    </div>
  );
}
