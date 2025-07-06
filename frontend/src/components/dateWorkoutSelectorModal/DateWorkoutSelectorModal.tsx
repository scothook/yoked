import React from 'react';
import styles from './dateWorkoutSelectorModal.module.css';
import { Workout } from '../../types/workout'; // Adjust path as needed

interface DateWorkoutSelectorModalProps {
  workouts: Workout[] | undefined;
  onClose: () => void;
  onSelect: (workout: Workout) => void;
}

const DateWorkoutSelectorModal: React.FC<DateWorkoutSelectorModalProps> = ({
  workouts,
  onClose,
  onSelect,
}) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {workouts && workouts.map((workout) => (
          <div
            key={workout.id}
            className={styles.workoutOption}
            onClick={() => {
              onSelect(workout);
              onClose();
            }}
          >
            {workout.workout_type_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateWorkoutSelectorModal;
