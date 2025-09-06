// File cấu hình PM2 (Process Manager 2) cho Node.js application
// PM2 là tool quản lý process, giúp keep app running, auto-restart, load balancing
// File này định nghĩa các app instances và cấu hình môi trường cho deployment

/* ------------------------------------------------------------------------- */
/*                                 PM2 CONFIG                                 */
/* ------------------------------------------------------------------------- */

module.exports = {
  apps: [
    {
      // Tên của application instance trong PM2
      name: "project-management",

      // Script/command để chạy app
      // Sử dụng npm thay vì trực tiếp node để có thể chạy npm scripts
      script: "npm",

      // Arguments truyền cho script
      // "run dev" sẽ chạy npm run dev (development mode với hot reload)
      args: "run dev",

      // Biến môi trường cho app instance này
      env: {
        NODE_ENV: "development", // Chế độ development
      },

      // TODO: Có thể thêm các cấu hình khác:
      // instances: 1,              // Số instance chạy song song
      // autorestart: true,         // Tự động restart khi crash
      // watch: false,              // Watch file changes và restart
      // max_memory_restart: "1G",  // Restart khi vượt quá memory limit
      // error_file: "./logs/err.log",     // File log errors
      // out_file: "./logs/out.log",       // File log output
      // log_file: "./logs/combined.log",  // File log tổng hợp
    },
  ],
};

/* ------------------------------------------------------------------------- */

/**
 * Mục đích file:
 * - PM2 Configuration: Cấu hình cho PM2 process manager
 * - Development Setup: Thiết lập môi trường development
 * - Process Management: Quản lý lifecycle của Node.js app
 *
 * Cách sử dụng:
 * ```
 * # Start app với PM2
 * pm2 start ecosystem.config.js
 *
 * # Stop app
 * pm2 stop project-management
 *
 * # Restart app
 * pm2 restart project-management
 *
 * # View logs
 * pm2 logs project-management
 * ```
 *
 * Lợi ích của PM2:
 * - Auto-restart: Tự động khởi động lại khi app crash
 * - Load balancing: Chạy nhiều instance song song
 * - Monitoring: Theo dõi CPU, memory usage
 * - Log management: Quản lý logs tập trung
 */
