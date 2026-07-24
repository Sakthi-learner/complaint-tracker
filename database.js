const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create/Open the database
const db = new sqlite3.Database(
    path.join(__dirname, "complaints.db"),
    (err) => {
        if (err) {
            console.log("Database connection failed:", err.message);
        } else {
            console.log("Connected to SQLite database.");
        }
    }
);

// Create the complaints table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS complaints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            status TEXT DEFAULT 'Open',
            date TEXT NOT NULL
        )
    `);
});

module.exports = db;