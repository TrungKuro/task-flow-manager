"use strict";
// File này là [Entry Point] chính của [Express.js] Server
// Cấu hình các "Middleware", đăng ký "Routes" và khởi động Server Backend
// Cung cấp APIs cho ứng dụng "Task Flow Manager"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* ------------------------------------------------------------------------- */
const express_1 = __importDefault(require("express")); // "Framework Web" cho [Node.js]
const dotenv_1 = __importDefault(require("dotenv")); // Load "biến môi trường" từ file (.env)
const body_parser_1 = __importDefault(require("body-parser")); // Parse request body (JSON, URL-encoded)
const cors_1 = __importDefault(require("cors")); // Cho phép "cross-origin requests" từ Frontend
const helmet_1 = __importDefault(require("helmet")); // Bảo mật headers HTTP
const morgan_1 = __importDefault(require("morgan")); // HTTP request logger middleware
// import { Request, Response } from "express";
/* ------------------------------------------------------------------------- */
/*                               ROUTE IMPORTS                               */
/* ------------------------------------------------------------------------- */
// TODO: Import các "Route Handlers" khi tạo APIs [EndPoints]
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
// import searchRoutes from "./routes/searchRoutes";
// import userRoutes from "./routes/userRoutes";
// import teamRoutes from "./routes/teamRoutes";
/* ------------------------------------------------------------------------- */
/*                               CONFIGURATIONS                              */
/* ------------------------------------------------------------------------- */
// TODO: Cấu hình các "Middleware" cho Express App
dotenv_1.default.config(); // Load các biến môi trường từ file (.env)
const app = (0, express_1.default)(); // Khởi tạo Express Application
// "Middleware" setup theo thứ tự xử lý "request"
app.use(express_1.default.json()); // Parse JSON request bodies
app.use((0, helmet_1.default)()); // Thêm security headers (XSS protection, etc.)
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" })); // Cho phép cross-origin resource sharing
app.use((0, morgan_1.default)("common")); // Log HTTP requests với format 'common'
app.use(body_parser_1.default.json()); // Parse JSON bodies (duplicate với express.json())
app.use(body_parser_1.default.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use((0, cors_1.default)()); // Enable CORS cho tất cả routes
/* ------------------------------------------------------------------------- */
/*                                   ROUTES                                  */
/* ------------------------------------------------------------------------- */
// TODO: Định nghĩa các API [EndPoints]
// Route mặc định - kiểm tra Server hoạt động
app.get("/", (req, res) => {
    res.send("This is Home Route");
});
// Các API Routes khác:
app.use("/projects", projectRoutes_1.default);
app.use("/tasks", taskRoutes_1.default);
// app.use("/users", userRoutes);
// app.use("/teams", teamRoutes);
// app.use("/search", searchRoutes);
/* ------------------------------------------------------------------------- */
/*                                   SERVER                                  */
/* ------------------------------------------------------------------------- */
// TODO: Cấu hình và khởi động Server
// Lấy Port từ "biến môi trường" hoặc default là 3000
const port = Number(process.env.PORT) || 3000;
// Khởi động Server Listen trên tất cả Network Interfaces (0.0.0.0)
// Phù hợp cho Deployment (Docker, Cloud Services)
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on Port ${port}`);
});
