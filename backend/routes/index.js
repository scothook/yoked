import workouts from "./workouts.js";
import workoutTypes from "./workoutTypes.js";
import movementTypes from "./movementTypes.js";

const router = express.Router();

router.use("/workouts", workouts);
router.use("/workout-types", workoutTypes);
router.use("/movement-types", movementTypes);

export default router;
