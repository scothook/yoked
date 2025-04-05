import styles from "./RepSet.module.css";

interface RepButtonProps {
  initialReps: number;
}

export default function RepSet({ initialReps }: RepButtonProps) {
  return (
    <button className={styles.repButton}>{initialReps}</button>
  )
}

/*import { useState, useRef } from "react";
import styles from "./RepButton.module.css";

interface RepButtonProps {
  initialReps: number;
}

export default function RepButton({ initialReps }: RepButtonProps) {
  const [reps, setReps] = useState(initialReps);
  const [showAdjust, setShowAdjust] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    holdTimer.current = setTimeout(() => setShowAdjust(true), 500);
  };

  const handleMouseUp = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  return (
    <div className={styles.repButtonContainer}>
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={styles.repButton}
      >
        {reps}
      </button>
      {showAdjust && (
        <div className={styles.adjustButtons}>
          <button onClick={() => setReps(reps - 1)} className={styles.adjustBtn}>
            -
          </button>
          <button onClick={() => setReps(reps + 1)} className={styles.adjustBtn}>
            +
          </button>
        </div>
      )}
    </div>
  );
}
*/