const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON

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
app.get("/api/standings", (req, res) => {
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
/*
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");


const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Railway
});

app.use(cors());
app.use(express.json());

// Fetch standings from database
app.get("/api/standings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Fetch a single team by key
app.get("/api/standings/:teamKey", async (req, res) => {
  try {
    const { teamKey } = req.params;
    const result = await pool.query("SELECT * FROM standings WHERE Key = $1", [
      teamKey.toUpperCase(),
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Team not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/