/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

/* ------------------------------------------------------------------------- */
/*                                  Database                                 */
/* ------------------------------------------------------------------------- */

const prisma = new PrismaClient();

/* ------------------------------------------------------------------------- */
/*                        Controller Module "Project"                        */
/* ------------------------------------------------------------------------- */

// READ (GET) - lấy danh sách tất cả các Project hiện có trong DB
export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};

// CREATE (POST) - tạo mới một Project trong DB
export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};
