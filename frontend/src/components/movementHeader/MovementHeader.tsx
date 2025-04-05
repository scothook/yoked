import styles from "./MovementHeader.module.css";

interface MovementHeaderProps {
    name: string;
    onRemove: () => void;
}

export default function MovementHeader({ name, onRemove }: MovementHeaderProps) {
    return (
        <div className={styles.movementHeader}>
            <h3>{name}</h3>
            <button className={styles.removeMovementBtn} onClick={onRemove}>&minus;</button>
        </div>
    );
};