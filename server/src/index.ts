// File này là [Entry Point] chính của [Express.js] Server
// Cấu hình các "Middleware", đăng ký "Routes" và khởi động Server Backend
// Cung cấp APIs cho ứng dụng "Task Flow Manager"

/* ------------------------------------------------------------------------- */

import express from "express"; // "Framework Web" cho [Node.js]
import dotenv from "dotenv"; // Load "biến môi trường" từ file (.env)
import bodyParser from "body-parser"; // Parse request body (JSON, URL-encoded)
import cors from "cors"; // Cho phép "cross-origin requests" từ Frontend
import helmet from "helmet"; // Bảo mật headers HTTP
import morgan from "morgan"; // HTTP request logger middleware

// import { Request, Response } from "express";

/* ------------------------------------------------------------------------- */
/*                               ROUTE IMPORTS                               */
/* ------------------------------------------------------------------------- */
// TODO: Import các "Route Handlers" khi tạo APIs [EndPoints]

import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import searchRoutes from "./routes/searchRoutes";
import userRoutes from "./routes/userRoutes";
// import teamRoutes from "./routes/teamRoutes";

/* ------------------------------------------------------------------------- */
/*                               CONFIGURATIONS                              */
/* ------------------------------------------------------------------------- */
// TODO: Cấu hình các "Middleware" cho Express App

dotenv.config(); // Load các biến môi trường từ file (.env)
const app = express(); // Khởi tạo Express Application

// "Middleware" setup theo thứ tự xử lý "request"
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Thêm security headers (XSS protection, etc.)
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Cho phép cross-origin resource sharing
app.use(morgan("common")); // Log HTTP requests với format 'common'
app.use(bodyParser.json()); // Parse JSON bodies (duplicate với express.json())
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS cho tất cả routes

/* ------------------------------------------------------------------------- */
/*                                   ROUTES                                  */
/* ------------------------------------------------------------------------- */
// TODO: Định nghĩa các API [EndPoints]

// Route mặc định - kiểm tra Server hoạt động
app.get("/", (req, res) => {
  res.send("This is Home Route");
});

// Các API Routes khác:
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
// app.use("/teams", teamRoutes);

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
