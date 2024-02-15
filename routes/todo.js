// Import necessary modules
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo"); // Import the Todo model

// Route to get all todos
router.get("/", async (req, res) => {
  try {
    // Fetch all todos from the database
    const todos = await Todo.find();
    res.json(todos); // Send the todos as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle any errors
  }
});

// Route to create a new todo
router.post("/", async (req, res) => {
  // Create a new Todo object based on the request body
  const todo = new Todo({
    text: req.body.text, // Extract todo text from request body
  });

  try {
    // Save the new todo to the database
    const newTodo = await todo.save();
    res.status(201).json(newTodo); // Send the newly created todo as a JSON response
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle validation errors
  }
});

// Route to delete a todo by its ID
// Route to delete a todo by its ID
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); // Find the todo by its ID
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" }); // If todo is not found, return 404 error
    }
    await Todo.deleteOne({ _id: req.params.id }); // Remove the todo
    res.json({ message: "Todo deleted" }); // Send success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});


module.exports = router;
