/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

/* ------------------------------------------------------------------------- */
/*                                  Database                                 */
/* ------------------------------------------------------------------------- */

const prisma = new PrismaClient();

/* ------------------------------------------------------------------------- */
/*                          Controller Module "User"                         */
/* ------------------------------------------------------------------------- */

// READ (GET) - lấy danh sách tất cả các User hiện có trong DB
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};
