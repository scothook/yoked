import { useState } from "react";

const NewWorkoutButton = () => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchFeedback = async () => {
    setFeedback('Clicked');
  };

  return (
    <div>
      <button onClick={fetchFeedback}>New Workout</button>
      {feedback !== null && <p> {feedback}</p>}
    </div>
  );
};

export default NewWorkoutButton;
