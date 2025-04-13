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

app.get("/api/workout_types", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM workout_types;");
    res.json(result.rows); // Return the workout types
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

app.patch("/api/workouts/:id", async (req, res) => {
  const { id } = req.params;
  const fields = ['body_weight', 'workout_type_id', 'notes', 'date'];
  const values = [];
  const setClauses = [];

  fields.forEach((field, index) => {
    if (req.body[field] !== undefined) {
      setClauses.push(`${field} = $${values.length + 1}`);
      values.push(req.body[field]);
    }
  });

  if (setClauses.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  values.push(id);

  const query = `
    UPDATE workouts
    SET ${setClauses.join(", ")}
    WHERE id = $${values.length}
    RETURNING *;`;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update workout." });
  }
});

app.put("/api/workouts/:id", async (req, res) => {
  const { id } = req.params;
  const { body_weight, workout_type_id, notes, date } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE workouts
      SET body_weight = $1,
          workout_type_id = $2,
          notes = $3,
          date = $4
      WHERE id = $5
      RETURNING *;
      `,
      [body_weight, workout_type_id, notes, date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json(result.rows[0]); // Return the updated workout
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/workouts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`   
      SELECT 
          w.id, 
          w.date, 
          w.body_weight, 
          w.notes,
          wt.workout_type_name,
          wt.id AS workout_type_id, 
          COALESCE(json_agg(
              CASE 
                  WHEN m.id IS NOT NULL THEN 
                      json_build_object(
                          'id', m.id,
                          'movement_type_id', m.movement_type_id,
                          'movement_type_name', m.movement_type_name,
                          'sets', m.sets
                      )
                  ELSE NULL
              END
          ) FILTER (WHERE m.id IS NOT NULL), '[]') AS movements
      FROM workouts w
      JOIN workout_types wt ON w.workout_type_id = wt.id
      LEFT JOIN (
          SELECT 
              m.workout_id,
              m.id,
              m.movement_type_id,
              mt.movement_type_name,
              COALESCE(json_agg(
                  json_build_object('id', s.id, 'reps', s.reps, 'order', s.order, 'weight', s.weight)
              ) FILTER (WHERE s.id IS NOT NULL), '[]') AS sets
          FROM movements m
          LEFT JOIN movement_types mt ON m.movement_type_id = mt.id
          LEFT JOIN sets s ON s.movement_id = m.id
          GROUP BY m.workout_id, m.id, m.movement_type_id, mt.movement_type_name
      ) m ON m.workout_id = w.id
       where w.id = $1
      GROUP BY w.id, w.date, w.body_weight, wt.workout_type_name, wt.id;`, [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});


app.get("/api/workouts", async (req, res) => {
  try {
    const result = await pool.query(`   
      SELECT 
          w.id, 
          w.date, 
          w.body_weight, 
          w.notes,
          wt.workout_type_name, 
          wt.id AS workout_type_id,
          COALESCE(json_agg(
              CASE 
                  WHEN m.id IS NOT NULL THEN 
                      json_build_object(
                          'id', m.id,
                          'movement_type_id', m.movement_type_id,
                          'movement_type_name', m.movement_type_name,
                          'sets', m.sets
                      )
                  ELSE NULL
              END
          ) FILTER (WHERE m.id IS NOT NULL), '[]') AS movements
      FROM workouts w
      JOIN workout_types wt ON w.workout_type_id = wt.id
      LEFT JOIN (
          SELECT 
              m.workout_id,
              m.id,
              m.movement_type_id,
              mt.movement_type_name,
              COALESCE(json_agg(
                  json_build_object('id', s.id, 'reps', s.reps, 'order', s.order, 'weight', s.weight)
              ) FILTER (WHERE s.id IS NOT NULL), '[]') AS sets
          FROM movements m
          LEFT JOIN movement_types mt ON m.movement_type_id = mt.id
          LEFT JOIN sets s ON s.movement_id = m.id
          GROUP BY m.workout_id, m.id, m.movement_type_id, mt.movement_type_name
      ) m ON m.workout_id = w.id
      GROUP BY w.id, w.date, w.body_weight, wt.workout_type_name, wt.id;`
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
