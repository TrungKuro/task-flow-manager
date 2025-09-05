"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeams = void 0;
const client_1 = require("@prisma/client");
/* ------------------------------------------------------------------------- */
/*                                  Database                                 */
/* ------------------------------------------------------------------------- */
const prisma = new client_1.PrismaClient();
/* ------------------------------------------------------------------------- */
/*                          Controller Module "Team"                         */
/* ------------------------------------------------------------------------- */
// READ (GET) - lấy danh sách tất cả các Team hiện có trong DB
const getTeams = async (req, res) => {
    try {
        const teams = await prisma.team.findMany();
        const teamsWithUsernames = await Promise.all(teams.map(async (team) => {
            const productOwner = await prisma.user.findUnique({
                where: { userId: team.productOwnerUserId },
                select: { username: true },
            });
            const projectManager = await prisma.user.findUnique({
                where: { userId: team.projectManagerUserId },
                select: { username: true },
            });
            return {
                ...team,
                productOwnerUsername: productOwner?.username,
                projectManagerUsername: projectManager?.username,
            };
        }));
        res.json(teamsWithUsernames);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving teams: ${error.message}` });
    }
};
exports.getTeams = getTeams;
