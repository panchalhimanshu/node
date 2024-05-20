const mongoose = require("mongoose");

// Define the MongoDB connection URL
// const mongoURL = "mongodb+srv://workdheerajmathur:admin@cluster0.rhjmktm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoURL ="mongodb+srv://data:data@data.mnq5c5u.mongodb.net/?retryWrites=true&w=majority&appName=data"
// Set up MongoDB connection
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection and disconnection
db.on('connected', () => {
    console.log("MongoDB is connected");
});

db.on('disconnected', () => {
    console.log("MongoDB is disconnected");
});

db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

module.exports = db;
