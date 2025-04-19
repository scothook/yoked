import React from 'react';
import styles from './dateWorkoutSelectorModal.module.css';

interface DateWorkoutSelectorModalProps {
    workouts: { id: string; workout_type_name: string }[]; // Adjust the type according to your workout structure
    onClose: () => void;
    onSelect: (workout: { id: string; workout_type_name: string }) => void; // Adjust the type according to your workout structure
    date: string; // Date in string format (e.g., "YYYY-MM-DD")
};

const DateWorkoutSelectorModal: React.FC<DateWorkoutSelectorModalProps> = ({ workouts, onClose, onSelect, date }) => {
    return (
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div className="modal card" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-lg font-semibold mb-4">Workouts for {date}</h2>
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="hover:bg-black/10 rounded-lg p-2 cursor-pointer"
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