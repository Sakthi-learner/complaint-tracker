const express = require("express");
const path = require("path");
const db = require("./database"); 
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve all frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Open login page when visiting localhost:3000
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});
// Get all complaints
app.get("/complaints", (req, res) => {
    db.all("SELECT * FROM complaints ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(rows);
    });
});

// Add a new complaint
app.post("/complaints", (req, res) => {

    const { title, description, category } = req.body;

    const date = new Date().toLocaleDateString();

    db.run(
        `INSERT INTO complaints (title, description, category, status, date)
         VALUES (?, ?, ?, 'Open', ?)`,
        [title, description, category, date],
        function (err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Complaint submitted successfully!"
            });
        }
    );
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
