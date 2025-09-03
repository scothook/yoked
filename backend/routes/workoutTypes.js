import express from "express";
import

const router = express.Router();

router.

app.get("/api/workout_types", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM workout_types;");
    res.json(result.rows); // Return the workout types
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default router;