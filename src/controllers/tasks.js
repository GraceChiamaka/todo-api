const pool = require("../db");
const {
  getTasksQuery,
  getTaskByIdQuery,
  createTaskQuery,
  updateTaskQuery,
  deleteTaskQuery,
} = require("../queries");

const getTasks = async (req, res) => {
  try {
    const tasks = await pool.query(getTasksQuery);
    return res.status(200).json({ data: tasks.rows });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await pool.query(getTaskByIdQuery, [id]);
    if (task.rowCount === 0) {
      res.status(400).json({ error: "Task not found" });
    }
    return res.status(200).json({ data: task.rows[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { user_id } = req.user.user_id;
    const { title, description, completed } = req.body;
    const createdTask = await pool.query(createTaskQuery, [
      user_id,
      title,
      description,
      completed,
    ]);
    return res.status(201).json({
      message: "New Task created successfully!",
      data: createdTask.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user.user_id;
    const { title, description, completed } = req.body;

    const verifyTask = await pool.query(getTaskByIdQuery, [id]);

    if (verifyTask.rowCount === 0)
      return res.status(400).json({ error: "Task not found" });
    const modifyTask = await pool.query(updateTaskQuery, [
      user_id,
      title,
      description,
      completed,
      id,
    ]);
    return res.status(200).json({
      message: "Task updated successfully!",
      data: modifyTask.rows,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const verifyTask = await pool.query(getTaskByIdQuery, [id]);
    if (verifyTask.rowCount === 0)
      return res.status(400).json({ error: "Task does not exist" });
    await pool.query(deleteTaskQuery, [id]);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
