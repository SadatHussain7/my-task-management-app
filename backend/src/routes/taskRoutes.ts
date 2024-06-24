import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/tasks", auth, createTask);
router.get("/tasks", auth, getTasks);
router.patch("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);

export default router;
