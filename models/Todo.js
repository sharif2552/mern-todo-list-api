// Import mongoose library for creating schemas and models
const mongoose = require("mongoose");

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Define the schema for the Todo collection
const todoSchema = new Schema(
  {
    // Define the 'text' field with the type 'String' and mark it as required
    text: {
      type: String,
      required: true,
    },
    // Define the 'completed' field with the type 'Boolean' and set default value as 'false'
    completed: {
      type: Boolean,
      default: false,
    },
  },
  // Add a timestamp to each document to track when it was created and updated
  { timestamps: true }
);

// Create a Todo model using the schema
const Todo = mongoose.model("Todo", todoSchema);

// Export the Todo model to be used in other parts of the application
module.exports = Todo;
