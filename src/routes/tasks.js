const express = require("express");
const { Router } = express;
const { authenticateToken } = require("../middleware/authorization");
const { getTasks } = require("../controllers/tasks");
const router = Router();

router.get("/", authenticateToken, getTasks);
