const express = require("express");
const { Router } = express;
const { authenticateToken } = require("../middleware/authorization");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const router = Router();

router.get("/", authenticateToken, getTasks);
router.get("/:id", authenticateToken, getTask);
router.post("/", authenticateToken, createTask);
router.put("/:id", authenticateToken, updateTask);
router.delete("/:id", authenticateToken, deleteTask);

module.exports = router;
