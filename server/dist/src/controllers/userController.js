"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const client_1 = require("@prisma/client");
/* ------------------------------------------------------------------------- */
/*                                  Database                                 */
/* ------------------------------------------------------------------------- */
const prisma = new client_1.PrismaClient();
/* ------------------------------------------------------------------------- */
/*                        Controller Module "User"                        */
/* ------------------------------------------------------------------------- */
// READ (GET) - lấy danh sách tất cả các User hiện có trong DB
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
};
exports.getUsers = getUsers;
