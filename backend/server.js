const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require('dotenv').config({ path: './.env' });


const app = express();
const PORT = 5000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON

// Database Connection Pool
const pool = new Pool({
  connectionString: process.env.YOKED_DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Railway SSL
});

// 🔍 Test Route
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📌 Example: Baseball Test
app.get("/api/standings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/api/workouts", async (req, res) => {
  try {
    const { body_weight, workout_type_id, notes, date } = req.body;

    const result = await pool.query(
      "INSERT INTO workouts (body_weight, workout_type_id, notes, date) VALUES ($1, $2, $3, $4) RETURNING *;",
      [body_weight, workout_type_id, notes, date]
    );

    res.status(201).json(result.rows[0]); // Return the new workout
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/workouts", async (req, res) => {
  try {
    const result = await pool.query(`   
      SELECT 
          w.workout_id, 
          w.date, 
          w.body_weight, 
          wt.workout_type_name, 
          json_agg(
              json_build_object(
                  'movement_id', m.movement_id,
                  'movement_type_id', m.movement_type_id,
                  'movement_type_name', m.movement_type_name,
                  'sets', m.sets
              )
          ) AS movements
      FROM workouts w
      JOIN workout_types wt ON w.workout_type_id = wt.workout_type_id
      JOIN (
          SELECT 
              m.workout_id,
              m.movement_id,
              m.movement_type_id,
              mt.movement_type_name,  -- Now selecting movement_type_name inside the subquery
              json_agg(
                  json_build_object('set_id', s.set_id, 'reps', s.reps, 'order', s.order)
              ) AS sets
          FROM movements m
          LEFT JOIN movement_types mt ON m.movement_type_id = mt.movement_type_id
          LEFT JOIN sets s ON s.movement_id = m.movement_id
          GROUP BY m.workout_id, m.movement_id, m.movement_type_id, mt.movement_type_name
      ) m ON m.workout_id = w.workout_id
      GROUP BY w.workout_id, w.date, w.body_weight, wt.workout_type_name;`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Sample Baseball Standings Data
const standings = [
  {
    Season: 2024,
    TeamID: 10,
    Key: "CLE",
    City: "Cleveland",
    Name: "Guardians",
    League: "AL",
    Division: "Central",
    Wins: 92,
    Losses: 69,
    LeagueRank: 1,
  },
  {
    Season: 2024,
    TeamID: 5,
    Key: "KC",
    City: "Kansas City",
    Name: "Royals",
    League: "AL",
    Division: "Central",
    Wins: 86,
    Losses: 76,
    LeagueRank: 2,
  },
];

// API endpoint to get all standings
app.get("/api/standings-old", (req, res) => {
  res.json(standings);
});

// API endpoint to get a specific team by key (e.g., "CLE")
app.get("/api/standings/:teamKey", (req, res) => {
  const teamKey = req.params.teamKey.toUpperCase();
  const team = standings.find((t) => t.Key === teamKey);

  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ message: "Team not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
