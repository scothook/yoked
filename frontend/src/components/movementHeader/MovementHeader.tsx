import styles from "./MovementHeader.module.css";

interface MovementHeaderProps {
    name: string;
}

export default function MovementHeader({ name }: MovementHeaderProps) {
    return (
        <div className={styles.movementHeader}>
            <h3>{name}</h3>
            <button>&minus;</button>
        </div>
    );
};