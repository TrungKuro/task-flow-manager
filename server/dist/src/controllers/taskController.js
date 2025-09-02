"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
/* ------------------------------------------------------------------------- */
/*                                  Database                                 */
/* ------------------------------------------------------------------------- */
const prisma = new client_1.PrismaClient();
/* ------------------------------------------------------------------------- */
/*                          Controller Module "Task"                         */
/* ------------------------------------------------------------------------- */
// READ (GET) - lấy danh sách tất cả các Task hiện có trong DB
const getTasks = async (req, res) => {
    const { projectId } = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            },
        });
        res.json(tasks);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving tasks: ${error.message}` });
    }
};
exports.getTasks = getTasks;
// CREATE (POST) - tạo mới một Task trong DB
const createTask = async (req, res) => {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating a task: ${error.message}` });
    }
};
exports.createTask = createTask;
