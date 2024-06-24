const Task = require("../models/task");

// Create a new task
exports.createTask = async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get all tasks or filter by status
exports.getTasks = async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  try {
    const tasks = await Task.find(filter);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "status"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
