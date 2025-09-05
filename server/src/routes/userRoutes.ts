import { Router } from "express";

import { getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers); // READ

export default router;
