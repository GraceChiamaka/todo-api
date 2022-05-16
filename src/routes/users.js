const { Router } = require("express");
const { getUsers, getUser, createUser } = require("../controllers/users");
const { authenticateToken } = require("../middleware/authorization");

const router = Router();

router.get("/", authenticateToken, getUsers);
router.post("/", createUser);
router.get("/:id", getUser);

module.exports = router;
