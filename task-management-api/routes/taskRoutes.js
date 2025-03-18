const express = require("express");
const { createTask, getTasks, updateTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/tasks", authMiddleware, createTask);
router.get("/tasks", authMiddleware, getTasks);
router.put("/tasks/:taskId", authMiddleware, updateTask);
module.exports = router;
