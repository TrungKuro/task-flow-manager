"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectControllers_1 = require("../controllers/projectControllers");
const router = (0, express_1.Router)();
router.get("/", projectControllers_1.getProjects); // READ
router.post("/", projectControllers_1.createProject); // CREATE
exports.default = router;
