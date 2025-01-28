// Import express.js
require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");



// Create express app
var app = express();

app.use(express.json()); // For parsing JSON payloads
app.use(cors());
// Get the functions in the db.js file to use

// Create a route for root - /
app.get("/", function(req, res) {
    res.send("Hello world!");
});



// Replace these values with your actual bot credentials
const BOT_TOKEN = process.env.BOT_TOKEN; // Set this in Render's environment variables
const CHAT_ID = process.env.CHAT_ID; // Set this in Render's environment variables

app.post("/send-message", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.length > 500) {
            return res.status(400).json({ error: "Invalid message." });
        }

        const response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: message,
            }
        );

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
});

// Start the server on the PORT specified by Render or default to 3000

// Start server on port 3000
app.listen(3000,function(){
    console.log("Server running at http://127.0.0.1:3000/");
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
});

// Optional: Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled rejection at:", promise, "reason:", reason);
});
