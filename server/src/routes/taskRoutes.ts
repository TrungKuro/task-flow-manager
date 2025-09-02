import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../controllers/taskControllers";

const router = Router();

router.get("/", getTasks); // READ
router.post("/", createTask); // CREATE
router.patch("/:taskId/status", updateTaskStatus); // UPDATE "status"

export default router;
