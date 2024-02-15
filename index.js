// Import required modules
const express = require("express"); // Import Express.js framework
const mongoose = require("mongoose"); // Import Mongoose library for MongoDB interactions
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)
require("dotenv").config(); // Load environment variables from a .env file

// Initialize Express app
const app = express(); // Create an instance of Express application

// Middleware setup
app.use(
  cors({
    // origin: "http://merntodolist.vercel.app",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // credentials: true,
  })
); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  // Connect to MongoDB using the provided URI
  useNewUrlParser: true, // Use the new URL parser (deprecated)
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine (deprecated)
});
const connection = mongoose.connection; // Get the default connection
connection.once("open", () => {
  // Event listener for when the database connection is established
  console.log("MongoDB database connection established successfully"); // Log a success message
});

// Define routes
const todoRouter = require("./routes/todo"); // Import the todo routes module
app.use("/todos", todoRouter); // Mount the todo routes at the /todos URL prefix

// Start the server
const PORT = process.env.PORT || 5000; // Get the port from environment variables, default to 5000
app.listen(PORT, () => {
  // Start the Express server and listen for incoming requests
  console.log(`Server is running on port ${PORT}`); // Log a message indicating the server is running
});
