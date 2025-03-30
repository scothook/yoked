//import React from "react";
import styles from "./MovementCard.module.css";

interface MovementCardProps {
  name: string;
  weight: number;
  onRemove: () => void;
}

export default function MovementCard({ name, weight, onRemove }: MovementCardProps) {
  return (
    <div className={styles.movementCard}>
      <div className={styles.movementHeader}>
        <h3>{name}</h3>
        <button className={styles.removeBtn} onClick={onRemove}>
          &minus;
        </button>
      </div>
      <p>{weight} lbs</p>
    </div>
  );
}
