const sqlite3 = require("sqlite3").verbose(); // Connects to the SQLite database.
const express = require("express"); // Creates the server.
const cors = require("cors"); // Allows communication between frontend and backend.
const path = require("path"); // Helps locate files.

// CREATE THE SERVER.
const app = express(); // Creates the web server.

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000; // Uses Render's port when deployed and port 3000 locally.

// CONNECT THE SERVER TO THE DATABASE.
const db = new sqlite3.Database("./sidequest.db", (err) => {

    if (err) {
        console.error("Database connection error:", err.message);
        return;
    }

    console.log("Connected to the SQLite database.");

    // CREATE THE TABLE IF IT DOESN'T EXIST ALREADY.
    db.run(`
        CREATE TABLE IF NOT EXISTS SIDE_QUESTS (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            habit TEXT NOT NULL,
            status TEXT NOT NULL,
            xp INTEGER NOT NULL
        )
    `, (createErr) => {

        if (createErr) {
            console.error("Error creating table:", createErr.message);
        } else {
            console.log("SIDE_QUESTS table checked/created.");
        }

    });

});

// START THE SERVER.
app.listen(PORT, "0.0.0.0", () => {

    console.log(`API server running on port ${PORT}`);

});

// POST /quests (CREATE).
app.post("/quests", (req, res) => {

    // Gets the habit information sent from the frontend.
    const { habit, xp } = req.body;

    // Checks that the required information has been provided.
    if (!habit || xp === undefined || xp === null) {

        return res.status(400).json({
            error: "Bad Request",
            message: "Habit and XP are required."
        });

    }

    // New quests start with an Active status.
    const status = "Active";

    // Adds the accepted Side Quest to the database.
    const query = `
        INSERT INTO SIDE_QUESTS (habit, status, xp)
        VALUES (?, ?, ?)
    `;

    db.run(query, [habit, status, xp], function (err) {

        if (err) {

            console.error("Error adding Side Quest:", err.message);

            return res.status(500).json({
                error: "Failed to add Side Quest :(",
                message: err.message
            });

        }

        res.status(201).json({

            message: "Side Quest successfully added :)",
            id: this.lastID,

            quest: {
                habit,
                status,
                xp
            }

        });

    });

});

// GET /quests (READ).
app.get("/quests", (req, res) => {

    // Requests all Side Quests from the database.
    const query = `SELECT * FROM SIDE_QUESTS`;

    db.all(query, [], (err, rows) => {

        if (err) {

            console.error("Error fetching Side Quests:", err.message);

            return res.status(500).json({
                error: "Failed to fetch Side Quests",
                message: err.message
            });

        }

        res.status(200).json(rows);

    });

});

// PATCH /quests/:id (UPDATE).
app.patch("/quests/:id", (req, res) => {

    // Gets the ID of the Side Quest from the URL.
    const { id } = req.params;

    // Updates the status of the Side Quest to Completed.
    const query = `
        UPDATE SIDE_QUESTS
        SET status = ?
        WHERE id = ?
    `;

    db.run(query, ["Completed", id], function (err) {

        if (err) {

            console.error("Error completing Side Quest:", err.message);

            return res.status(500).json({
                error: "Failed to complete Side Quest :(",
                message: err.message
            });

        }

        // Checks whether a Side Quest with this ID exists.
        if (this.changes === 0) {

            return res.status(404).json({
                message: `Side Quest with ID ${id} not found.`
            });

        }

        res.status(200).json({

            message: "Side Quest completed successfully :)"

        });

    });

});

// DELETE /quests/:id.
app.delete("/quests/:id", (req, res) => {

    console.log("DELETE route was reached for ID:", req.params.id);

    // Gets the ID of the Side Quest from the URL.
    const { id } = req.params;

    // Deletes the selected Side Quest from the database.
    const query = "DELETE FROM SIDE_QUESTS WHERE id = ?";

    db.run(query, [id], function (err) {

        if (err) {

            console.error("Error deleting Side Quest:", err.message);

            return res.status(500).json({
                error: "Failed to delete Side Quest :(",
                message: err.message
            });

        }

        // Checks whether a Side Quest with this ID exists.
        if (this.changes === 0) {

            return res.status(404).json({
                message: `Side Quest with ID ${id} not found.`
            });

        }

        // Sends a successful response to the frontend.
        res.status(200).json({
            message: "Side Quest deleted successfully! 😊"
        });

    });

});

// GET /xp (READ TOTAL XP).
app.get("/xp", (req, res) => {

    // Adds the XP from all completed Side Quests.
    const query = `
        SELECT COALESCE(SUM(xp), 0) AS totalXP
        FROM SIDE_QUESTS
        WHERE status = 'Completed'
    `;

    db.get(query, [], (err, result) => {

        if (err) {

            console.error("Error calculating total XP:", err.message);

            return res.status(500).json({
                error: "Failed to calculate total XP",
                message: err.message
            });

        }

        // Returns the total XP to the frontend.
        res.status(200).json({
            totalXP: result.totalXP
        });

    });

});