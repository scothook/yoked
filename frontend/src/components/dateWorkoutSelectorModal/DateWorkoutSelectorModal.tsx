import React from 'react';
import styles from './dateWorkoutSelectorModal.module.css';

interface DateWorkoutSelectorModalProps {
    workouts: { id: string; workout_type_name: string }[]; // Adjust the type according to your workout structure
    onClose: () => void;
    onSelect: (workout: { id: string; workout_type_name: string }) => void; // Adjust the type according to your workout structure
};

const DateWorkoutSelectorModal: React.FC<DateWorkoutSelectorModalProps> = ({ workouts, onClose, onSelect }) => {
    return (
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          {workouts.map((workout) => (
            <div className={styles.workoutOption}
              key={workout.id}
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