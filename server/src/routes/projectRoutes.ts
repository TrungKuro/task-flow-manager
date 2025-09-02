import { Router } from "express";
import { getProjects, createProject } from "../controllers/projectControllers";

const router = Router();

router.get("/", getProjects); // READ
router.post("/", createProject); // CREATE

export default router;
