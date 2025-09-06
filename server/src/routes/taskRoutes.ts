import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  getUserTasks,
} from "../controllers/taskControllers";

const router = Router();

router.get("/", getTasks); // READ
router.post("/", createTask); // CREATE
router.patch("/:taskId/status", updateTaskStatus); // UPDATE "status"
router.get("/user/:userId", getUserTasks); // READ "user"

export default router;
